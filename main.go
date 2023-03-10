package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"time"

	esbuild "github.com/evanw/esbuild/pkg/api"
	v8 "github.com/livebud/bud/package/js/v8"
	"github.com/livebud/bud/package/svelte"
)

var wgDOM sync.WaitGroup
var wgSSR sync.WaitGroup
var wgHTML sync.WaitGroup

func main() {
	start := time.Now()

	// Setup Svelte Compiler
	vm, _ := v8.Load()
	svelteCompiler, _ := svelte.Load(vm)

	elapsed := time.Since(start)
	fmt.Println("Loading v8 took: " + elapsed.String())
	startWalk := time.Now()

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

			//wgDOM.Add(1)
			//go compileDOM(svelteCompiler, fileContents, path, destPath)

			SSRDest := "js/ssr" + strings.TrimSuffix(destPath, ".svelte") + ".js"
			wgSSR.Add(1)
			go compileSSR(svelteCompiler, fileContents, path, destPath, SSRDest)

			// Collect each template path in the "content" folder
			// to become a top-level page
			if strings.Contains(destPath, "content") {
				entrynodes = append(entrynodes, SSRDest)
			}
		}

		return nil
	})

	elapsed = time.Since(startWalk)
	fmt.Println("Walk files took: " + elapsed.String())
	finishSSR := time.Now()

	// Create placeholder props that Plenti expects
	props := map[string]string{
		"content":    "",
		"layout":     "",
		"allContent": "[]",
		"allLayouts": "[]",
		"env":        "",
		"user":       "",
		"adminMenu":  "",
	}
	propsJSON, _ := json.Marshal(props)
	propsJSONStr := string(propsJSON)

	wgSSR.Wait()
	elapsed = time.Since(finishSSR)
	fmt.Println("Finish SSR took: " + elapsed.String())
	startRender := time.Now()
	// Create bundles (with dependencies) for each top-level page
	bundledEntrynodes := bundle(entrynodes)
	// Loop through each bundled entrypoint
	for _, file := range bundledEntrynodes {
		wgHTML.Add(1)
		go renderHTML(vm, file, propsJSONStr)
	}

	wgHTML.Wait()
	elapsed = time.Since(startRender)
	fmt.Println("HTML render took: " + elapsed.String())
	startDOM := time.Now()

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

			wgDOM.Add(1)
			go compileDOM(svelteCompiler, fileContents, path, destPath)
		}

		return nil
	})
	wgDOM.Wait()
	elapsed = time.Since(startDOM)
	fmt.Println("DOM compile took: " + elapsed.String())

	elapsed = time.Since(start)
	fmt.Println("Full build took: " + elapsed.String())
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

func compileDOM(svelteCompiler *svelte.Compiler, fileContents []byte, path, destPath string) {
	defer wgDOM.Done()
	// Compile clientside JS and write to filesystem
	DOMDest := "js/dom" + strings.TrimSuffix(destPath, ".svelte") + ".js"
	os.MkdirAll(filepath.Dir(DOMDest), os.ModePerm)
	DOM, _ := svelteCompiler.DOM(path, fileContents)
	ioutil.WriteFile(DOMDest, []byte(DOM.JS), os.ModePerm)
}

func compileSSR(svelteCompiler *svelte.Compiler, fileContents []byte, path, destPath, SSRDest string) {
	defer wgSSR.Done()
	// Compile serverside JS and write to filesystem
	os.MkdirAll(filepath.Dir(SSRDest), os.ModePerm)
	SSR, _ := svelteCompiler.SSR(path, fileContents)
	SSR.JS = strings.ReplaceAll(SSR.JS, ".svelte", ".js")
	ioutil.WriteFile(SSRDest, []byte(SSR.JS), os.ModePerm)
}

func renderHTML(vm *v8.VM, file esbuild.OutputFile, propsJSONStr string) {
	defer wgHTML.Done()
	// Unwrap bundle to access variables (hacky, probably what esbuild plugins are for)
	contentStr := string(file.Contents)
	contentStr = strings.TrimPrefix(contentStr, "(() => {\n")
	contentStr = strings.TrimSuffix(contentStr, "})();\n")

	// Regex to find component name
	r, _ := regexp.Compile(`\s*var\s.*_default\s=\s(.*);\s*$`)
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
