package main

import (
	"fmt"
	"os"
	"time"

	"github.com/test/test/svelte"
)

func main() {
	start := time.Now()

	hello, _ := os.ReadFile("hello.svelte")
	vm, _ := Load()
	svelteCompiler, _ := svelte.Load(vm)
	output, _ := svelteCompiler.DOM("hello.svelte", hello)
	fmt.Println(output.JS)

	elapsed := time.Since(start)
	fmt.Println(elapsed)
}
