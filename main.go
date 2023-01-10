package main

import (
	"fmt"
	"os"
	"time"

	v8 "github.com/livebud/bud/package/js/v8"
	"github.com/livebud/bud/package/svelte"
)

func main() {
	start := time.Now()

	hello, _ := os.ReadFile("hello.svelte")
	vm, _ := v8.Load()
	svelteCompiler, _ := svelte.Load(vm)
	output, _ := svelteCompiler.DOM("hello.svelte", hello)
	fmt.Println(output.JS)

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}
