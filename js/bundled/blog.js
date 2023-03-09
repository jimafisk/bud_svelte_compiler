  // node_modules/svelte/internal/index.mjs
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  var resolved_promise = Promise.resolve();
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
  var ATTR_REGEX = /[&"]/g;
  var CONTENT_REGEX = /[&<]/g;
  function escape(value, is_attr = false) {
    const str = String(value);
    const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
    pattern.lastIndex = 0;
    let escaped = "";
    let last = 0;
    while (pattern.test(str)) {
      const i = pattern.lastIndex - 1;
      const ch = str[i];
      escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
      last = i + 1;
    }
    return escaped + str.substring(last);
  }
  function each(items, fn) {
    let str = "";
    for (let i = 0; i < items.length; i += 1) {
      str += fn(items[i], i);
    }
    return str;
  }
  var missing_component = {
    $$render: () => ""
  };
  function validate_component(component, name) {
    if (!component || !component.$$render) {
      if (name === "svelte:component")
        name += " this={...}";
      throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
    }
    return component;
  }
  var on_destroy;
  function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
      const parent_component = current_component;
      const $$ = {
        on_destroy,
        context: new Map(context || (parent_component ? parent_component.$$.context : [])),
        // these will be immediately discarded
        on_mount: [],
        before_update: [],
        after_update: [],
        callbacks: blank_object()
      };
      set_current_component({ $$ });
      const html = fn(result, props, bindings, slots);
      set_current_component(parent_component);
      return html;
    }
    return {
      render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
        on_destroy = [];
        const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
        const html = $$render(result, props, {}, $$slots, context);
        run_all(on_destroy);
        return {
          html,
          css: {
            code: Array.from(result.css).map((css2) => css2.code).join("\n"),
            map: null
            // TODO
          },
          head: result.title + result.head
        };
      },
      $$render
    };
  }
  function add_attribute(name, value, boolean) {
    if (value == null || boolean && !value)
      return "";
    const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
    return ` ${name}${assignment}`;
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const { on_mount } = this.$$;
        this.$$.on_disconnect = on_mount.map(run).filter(is_function);
        for (const key in this.$$.slotted) {
          this.appendChild(this.$$.slotted[key]);
        }
      }
      attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
      }
      disconnectedCallback() {
        run_all(this.$$.on_disconnect);
      }
      $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      }
      $on(type, callback) {
        if (!is_function(callback)) {
          return noop;
        }
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1)
            callbacks.splice(index, 1);
        };
      }
      $set($$props) {
        if (this.$$set && !is_empty($$props)) {
          this.$$.skip_bound = true;
          this.$$set($$props);
          this.$$.skip_bound = false;
        }
      }
    };
  }

  // js/ssr/components/source.js
  var css = {
    code: "div.js-h385oz{display:flex;align-items:center}pre.js-h385oz{display:flex;padding-left:5px}code.js-h385oz{background-color:var(--base);padding:5px 10px}code.selected.js-h385oz{background-color:var(--accent)}button.js-h385oz{border:1px solid rgba(0,0,0,.1);background:white;padding:4px;border-top-right-radius:5px;border-bottom-right-radius:5px;cursor:pointer}",
    map: `{"version":3,"file":"source.js","sources":["source.js"],"sourcesContent":["<script>\\n  export let content, source;\\n\\n  let templateEl;\\n  let contentEl;\\n  let copied;\\n  const copy = async (el) => {\\n    if (!navigator.clipboard) {\\n      return\\n    } \\n    try {\\n      await navigator.clipboard.writeText(el.innerHTML);\\n      copied = el;\\n      setTimeout(() => copied = null, 500);\\n    } catch (err) {\\n      console.error('Failed to copy!', err)\\n    }\\n  }\\n<\/script>\\n\\n{#if source.layout}\\n  <div>\\n    <span>Layout:</span>\\n    <pre>\\n      <code bind:this={templateEl} class:selected=\\"{copied === templateEl}\\">layouts/content/{content.type}.js</code>\\n      <button on:click={() => copy(templateEl)}>{copied === templateEl ? 'copied' : 'copy'}</button>\\n    </pre>\\n  </div>  \\n{/if}\\n\\n{#if source.content}\\n  <div>\\n    <span>Content:</span>\\n    <pre>\\n      <code bind:this={contentEl} class:selected=\\"{copied === contentEl}\\">content/{content.type === 'index' ? '' : content.type + '/'}{content.filename}</code>\\n      <button on:click={() => copy(contentEl)}>{copied === contentEl ? 'copied' : 'copy'}</button>\\n    </pre>\\n  </div>\\n{/if}\\n\\n<style>\\n  div {\\n    display: flex;\\n    align-items: center;\\n  }\\n  pre {\\n    display: flex;\\n    padding-left: 5px;\\n  }\\n  code {\\n      background-color: var(--base);\\n      padding: 5px 10px;\\n  }\\n  code.selected {\\n      background-color: var(--accent);\\n  }\\n  button {\\n    border: 1px solid rgba(0,0,0,.1);\\n    background: white;\\n    padding: 4px;\\n    border-top-right-radius: 5px;\\n    border-bottom-right-radius: 5px;\\n    cursor: pointer;\\n  }\\n</style>"],"names":[],"mappings":"AAyCE,GAAG,cAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,GAAG,cAAC,CAAC,AACH,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,GAAG,AACnB,CAAC,AACD,IAAI,cAAC,CAAC,AACF,gBAAgB,CAAE,IAAI,MAAM,CAAC,CAC7B,OAAO,CAAE,GAAG,CAAC,IAAI,AACrB,CAAC,AACD,IAAI,SAAS,cAAC,CAAC,AACX,gBAAgB,CAAE,IAAI,QAAQ,CAAC,AACnC,CAAC,AACD,MAAM,cAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAChC,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,GAAG,CACZ,uBAAuB,CAAE,GAAG,CAC5B,0BAA0B,CAAE,GAAG,CAC/B,MAAM,CAAE,OAAO,AACjB,CAAC"}`
  };
  var Source = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { content, source } = $$props;
    let templateEl;
    let contentEl;
    let copied;
    const copy = async (el) => {
      if (!navigator.clipboard) {
        return;
      }
      try {
        await navigator.clipboard.writeText(el.innerHTML);
        copied = el;
        setTimeout(() => copied = null, 500);
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    };
    if ($$props.content === void 0 && $$bindings.content && content !== void 0)
      $$bindings.content(content);
    if ($$props.source === void 0 && $$bindings.source && source !== void 0)
      $$bindings.source(source);
    $$result.css.add(css);
    return `${source.layout ? `<div class="${"svelte-h385oz"}"><span>Layout:</span>
    <pre class="${"svelte-h385oz"}">
      <code class="${["svelte-h385oz", copied === templateEl ? "selected" : ""].join(" ").trim()}"${add_attribute("this", templateEl, 0)}>layouts/content/${escape(content.type)}.js</code>
      <button class="${"svelte-h385oz"}">${escape(copied === templateEl ? "copied" : "copy")}</button>
    </pre></div>` : ``}

${source.content ? `<div class="${"svelte-h385oz"}"><span>Content:</span>
    <pre class="${"svelte-h385oz"}">
      <code class="${["svelte-h385oz", copied === contentEl ? "selected" : ""].join(" ").trim()}"${add_attribute("this", contentEl, 0)}>content/${escape(content.type === "index" ? "" : content.type + "/")}${escape(content.filename)}</code>
      <button class="${"svelte-h385oz"}">${escape(copied === contentEl ? "copied" : "copy")}</button>
    </pre></div>` : ``}`;
  });
  var source_default = Source;

  // node_modules/svelte/store/index.mjs
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update, subscribe: subscribe2 };
  }

  // js/ssr/scripts/stores.js
  var count = writable(0);
  var Stores = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return ``;
  });

  // js/ssr/components/incrementer.js
  var Incrementer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    function increment() {
      count.update((n) => n + 1);
    }
    return `<button>+
</button>`;
  });
  var incrementer_default = Incrementer;

  // js/ssr/components/decrementer.js
  var Decrementer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    function decrement() {
      count.update((n) => n - 1);
    }
    return `<button>-
</button>`;
  });
  var decrementer_default = Decrementer;

  // js/ssr/content/blog.js
  var Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { title, body, author, date, store, source, content } = $$props;
    let count_value;
    const unsubscribe = count.subscribe((value) => {
      count_value = value;
    });
    let { components, allLayouts } = $$props;
    if ($$props.title === void 0 && $$bindings.title && title !== void 0)
      $$bindings.title(title);
    if ($$props.body === void 0 && $$bindings.body && body !== void 0)
      $$bindings.body(body);
    if ($$props.author === void 0 && $$bindings.author && author !== void 0)
      $$bindings.author(author);
    if ($$props.date === void 0 && $$bindings.date && date !== void 0)
      $$bindings.date(date);
    if ($$props.store === void 0 && $$bindings.store && store !== void 0)
      $$bindings.store(store);
    if ($$props.source === void 0 && $$bindings.source && source !== void 0)
      $$bindings.source(source);
    if ($$props.content === void 0 && $$bindings.content && content !== void 0)
      $$bindings.content(content);
    if ($$props.components === void 0 && $$bindings.components && components !== void 0)
      $$bindings.components(components);
    if ($$props.allLayouts === void 0 && $$bindings.allLayouts && allLayouts !== void 0)
      $$bindings.allLayouts(allLayouts);
    return `<h1>${escape(title)}</h1>

<p><em>${author ? `Written by ${escape(author)}` : ``}${date ? `\xA0on ${escape(date)}` : ``}</em></p>

<p><!-- HTML_TAG_START -->${body}<!-- HTML_TAG_END --></p>

${store ? `<h3>The count is ${escape(count_value)}</h3>
  ${validate_component(incrementer_default, "Incrementer").$$render($$result, {}, {}, {})}
  ${validate_component(decrementer_default, "Decrementer").$$render($$result, {}, {}, {})}` : ``}

${components ? `${each(components, ({ name }) => {
      return `${validate_component(allLayouts["layouts_components_" + name + "_svelte"] || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
    })}` : ``}

${source ? `${validate_component(source_default, "Uses").$$render($$result, { content, source }, {}, {})}` : ``}

<p><a href="${"."}">Back home</a></p>`;
  });
  var blog_default = Blog;
