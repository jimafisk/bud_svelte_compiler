package main

import (
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

	filepath.Walk("templates", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println(err)
			return nil
		}

		nodes := []string{}

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
				nodes = append(nodes, SSRDest)
			}
		}
		bundle(nodes)

		return nil
	})

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}

func bundle(entrypoints []string) {
	destPath := "bundled_entrypoints"
	os.MkdirAll(filepath.Dir(destPath), os.ModePerm)
	result := esbuild.Build(esbuild.BuildOptions{
		EntryPoints: entrypoints,
		Bundle:      true,
		Outdir:      destPath,
		//ResolveExtensions: []string{".js", ".svelte"},
		Write: true,
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
	if len(result.OutputFiles) > 0 {
		fmt.Println(string(result.OutputFiles[0].Contents))
	}
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
