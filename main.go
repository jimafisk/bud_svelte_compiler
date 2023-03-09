package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

	esbuild "github.com/evanw/esbuild/pkg/api"
	v8 "github.com/livebud/bud/package/js/v8"
	"github.com/livebud/bud/package/svelte"
)

func main() {
	start := time.Now()

	vm, _ := v8.Load()
	svelteCompiler, _ := svelte.Load(vm)
	entrynodes := []string{}

	filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err)
			return nil
		}

		if !info.IsDir() && filepath.Ext(path) == ".svelte" {
			fileContents, _ := os.ReadFile(path)
			destPath := strings.TrimPrefix(path, "templates")

			DOMDest := "js/dom" + strings.TrimSuffix(destPath, ".svelte") + ".js"
			os.MkdirAll(filepath.Dir(DOMDest), os.ModePerm)
			DOM, _ := svelteCompiler.DOM(path, fileContents)
			ioutil.WriteFile(DOMDest, []byte(DOM.JS), os.ModePerm)

			SSRDest := "js/ssr" + strings.TrimSuffix(destPath, ".svelte") + ".js"
			os.MkdirAll(filepath.Dir(SSRDest), os.ModePerm)
			SSR, _ := svelteCompiler.SSR(path, fileContents)
			SSR.JS = strings.ReplaceAll(SSR.JS, ".svelte", ".js")
			ioutil.WriteFile(SSRDest, []byte(SSR.JS), os.ModePerm)

			if strings.Contains(destPath, "content") {
				entrynodes = append(entrynodes, SSRDest)
			}
		}

		return nil
	})

	//reStart, _ := regexp.Compile(`^\(\(\)\s=>\s{$`)
	//reEnd, _ := regexp.Compile(`^}\)\(\);$`)
	bundledEntrynodes := bundle(entrynodes)
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
	//r, _ := regexp.Compile(`^\s*export\sdefault\s([A-Z_][a-z0-9_]*);\s*$`)
	//r, _ := regexp.Compile(`export\sdefault\s([A-Z_][a-z0-9_]*);`)
	//input, _ := json.Marshal(props)
	for _, file := range bundledEntrynodes {
		bundledPath := strings.Replace(string(file.Path), "html/", "js/bundled/", 1)
		os.MkdirAll(filepath.Dir(bundledPath), os.ModePerm)
		contentStr := string(file.Contents)
		contentStr = strings.TrimPrefix(contentStr, "(() => {\n")
		contentStr = strings.TrimSuffix(contentStr, "})();\n")
		//ioutil.WriteFile(bundledPath, file.Contents, os.ModePerm)
		ioutil.WriteFile(bundledPath, []byte(contentStr), os.ModePerm)
		//fmt.Println(file.Path)
		//fmt.Println(string(file.Contents))
		/*
			compName := ""
			compNames := r.FindStringSubmatch(string(file.Contents))
			fmt.Println(compNames)
			if len(compNames) > 0 {
				compName = compNames[0]
			}
			fmt.Println(compName)
			//fmt.Println(string(file.Contents))
		*/
		//svelteCompiler.VM.Script("render.js", string(file.Contents))
		destPath := strings.TrimSuffix(file.Path, filepath.Ext(file.Path)) + ".html"
		//htmlFile, _ := svelteCompiler.VM.Eval("render.js", string(file.Contents)+`; pages_default.render("`+file.Path+`", `+string(input)+`)`)
		//svelteCompiler.VM.Script("render.js", string(file.Contents))
		//htmlFile, err := svelteCompiler.VM.Eval("render.js", `pages_default.render(`+propsJSONStr+`)`)
		//htmlFile, err := svelteCompiler.VM.Eval("render.js", `bud.render(`+propsJSONStr+`)`)
		//htmlFile, err := vm.Eval("render.js", string(file.Contents)+`.run(); render(`+propsJSONStr+`)`)
		htmlFile, err := vm.Eval("render.js", contentStr+`; _404.render(`+propsJSONStr+`).html;`)
		fmt.Println(htmlFile)
		if err != nil {
			fmt.Println(err)
		}
		//htmlFile, _ := svelteCompiler.VM.Eval("render.js", compName+".render("+propsJSONStr+")")
		//htmlFile, _ := svelteCompiler.VM.Eval("render.js", "pages_default.render("+propsJSONStr+")")
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
		//Write: true,
		//ResolveExtensions: []string{".js", ".svelte"},
		//OutExtension: map[string]string{".js": ".svelte"},
		//Plugins: []esbuild.Plugin{sveltePlugin()},
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

func sveltePlugin() esbuild.Plugin {
	return esbuild.Plugin{
		Name: "svelte",
		Setup: func(build esbuild.PluginBuild) {
			build.OnResolve(esbuild.OnResolveOptions{Filter: `^.*\.svelte$`}, func(args esbuild.OnResolveArgs) (result esbuild.OnResolveResult, err error) {
				result.Path = strings.TrimSuffix(args.Path, ".svelte") + ".js"
				result.Namespace = "svelte"
				return result, nil
			})
			build.OnLoad(esbuild.OnLoadOptions{Filter: `.*`, Namespace: "svelte"}, func(args esbuild.OnLoadArgs) (result esbuild.OnLoadResult, err error) {
				result.Loader = esbuild.LoaderJS
				return result, nil
			})
		},
	}
}
