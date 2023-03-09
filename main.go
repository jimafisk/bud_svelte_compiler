package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	esbuild "github.com/evanw/esbuild/pkg/api"
	v8 "github.com/livebud/bud/package/js/v8"
	"github.com/livebud/bud/package/svelte"
)

func main() {
	start := time.Now()

	// Setup Svelte Compiler
	vm, _ := v8.Load()
	svelteCompiler, _ := svelte.Load(vm)

	// Regex to find component name
	r, _ := regexp.Compile(`\s*var\s.*_default\s=\s(.*);\s*$`)
	// Initialize entrypoint pages
	entrynodes := []string{}

	filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err)
			return nil
		}

		if !info.IsDir() && filepath.Ext(path) == ".svelte" {
			// Get contents of the template
			fileContents, _ := os.ReadFile(path)
			// Remove the prefix the file was read from, so it can be written to new location
			destPath := strings.TrimPrefix(path, "templates")

			// Compile clientside JS and write to filesystem
			DOMDest := "js/dom" + strings.TrimSuffix(destPath, ".svelte") + ".js"
			os.MkdirAll(filepath.Dir(DOMDest), os.ModePerm)
			DOM, _ := svelteCompiler.DOM(path, fileContents)
			ioutil.WriteFile(DOMDest, []byte(DOM.JS), os.ModePerm)

			// Compile serverside JS and write to filesystem
			SSRDest := "js/ssr" + strings.TrimSuffix(destPath, ".svelte") + ".js"
			os.MkdirAll(filepath.Dir(SSRDest), os.ModePerm)
			SSR, _ := svelteCompiler.SSR(path, fileContents)
			SSR.JS = strings.ReplaceAll(SSR.JS, ".svelte", ".js")
			ioutil.WriteFile(SSRDest, []byte(SSR.JS), os.ModePerm)

			// Collect each template path in the "content" folder
			// to become a top-level page
			if strings.Contains(destPath, "content") {
				entrynodes = append(entrynodes, SSRDest)
			}
		}

		return nil
	})

	// Create placeholder props that Plenti expects
	props := map[string]string{
		"content":    "",
		"layout":     "",
		"allContent": "",
		"allLayouts": "",
		"env":        "",
		"user":       "",
		"adminMenu":  "",
	}
	propsJSON, _ := json.Marshal(props)
	propsJSONStr := string(propsJSON)

	// Create bundles (with dependencies) for each top-level page
	bundledEntrynodes := bundle(entrynodes)
	// Loop through each bundled entrypoint
	for _, file := range bundledEntrynodes {
		// Write the bundle to fs (for reference only, not used at all)
		bundledPath := strings.Replace(string(file.Path), "html/", "js/bundled/", 1)
		os.MkdirAll(filepath.Dir(bundledPath), os.ModePerm)
		ioutil.WriteFile(bundledPath, file.Contents, os.ModePerm)

		// Unwrap bundle to access variables (hacky, probably what esbuild plugins are for)
		contentStr := string(file.Contents)
		contentStr = strings.TrimPrefix(contentStr, "(() => {\n")
		contentStr = strings.TrimSuffix(contentStr, "})();\n")

		compName := ""
		compNames := r.FindStringSubmatch(contentStr)
		if len(compNames) > 1 {
			compName = compNames[1]
		}
		// Actually render the HTML from the unwrapped bundles
		htmlFile, err := vm.Eval("render.js", contentStr+`; `+compName+`.render(`+propsJSONStr+`).html;`)
		if err != nil {
			fmt.Println(err)
		}

		// Write the rendered HTML to the filesystem
		destPath := strings.TrimSuffix(file.Path, filepath.Ext(file.Path)) + ".html"
		ioutil.WriteFile(destPath, []byte(htmlFile), os.ModePerm)
	}

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}

func bundle(entrypoints []string) []esbuild.OutputFile {
	destPath := "html"
	os.MkdirAll(destPath, os.ModePerm)
	result := esbuild.Build(esbuild.BuildOptions{
		EntryPoints: entrypoints,
		Bundle:      true,
		Outdir:      destPath,
	})
	if len(result.Errors) > 0 {
		msgs := esbuild.FormatMessages(result.Errors, esbuild.FormatMessagesOptions{
			Color:         true,
			Kind:          esbuild.ErrorMessage,
			TerminalWidth: 80,
		})
		fmt.Printf(strings.Join(msgs, "\n"))
	}
	return result.OutputFiles
}
