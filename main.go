package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"

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

		if !info.IsDir() && filepath.Ext(path) == ".svelte" {
			fileContents, _ := os.ReadFile(path)
			destPath := "output" + strings.TrimPrefix(path, "templates")
			os.MkdirAll(filepath.Dir(destPath), os.ModePerm)

			DOM, _ := svelteCompiler.DOM(path, fileContents)
			ioutil.WriteFile(strings.TrimSuffix(destPath, ".svelte")+"_DOM.js", []byte(DOM.JS), os.ModePerm)

			SSR, _ := svelteCompiler.SSR(path, fileContents)
			ioutil.WriteFile(strings.TrimSuffix(destPath, ".svelte")+"_SSR.js", []byte(SSR.JS), os.ModePerm)
		}

		return nil
	})

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}
