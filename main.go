package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/livebud/js"
	v8 "github.com/livebud/js/v8"
	"rogchap.com/v8go"
)

type VM struct {
	isolate *v8go.Isolate
	context *v8go.Context
}

func main() {
	start := time.Now()
	vm, _ := v8.Load(&js.Console{
		Log:   os.Stdout,
		Error: os.Stderr,
	})
	defer vm.Close()
	ctx := context.Background()
	vm.Evaluate(ctx, "math.js", `const multiply = (a, b) => a * b`)
	value, _ := vm.Evaluate(ctx, "run.js", "multiply(3, 2)")
	fmt.Println(value)
	elapsed := time.Since(start)
	fmt.Println(elapsed)
}
