package main

import (
	"fmt"
	"os"
	"path/filepath"
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
			DOM, _ := svelteCompiler.DOM(path, fileContents)
			fmt.Println(DOM.JS)
			SSR, _ := svelteCompiler.SSR(path, fileContents)
			fmt.Println(SSR.JS)
		}

		return nil
	})

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}
