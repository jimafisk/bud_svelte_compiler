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
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== "function") {
      throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
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

  // js/ssr/content/pages.js
  var Pages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $user, $$unsubscribe_user;
    let { title, description, image, source, content, cms, user } = $$props;
    validate_store(user, "user");
    $$unsubscribe_user = subscribe(user, (value) => $user = value);
    if ($$props.title === void 0 && $$bindings.title && title !== void 0)
      $$bindings.title(title);
    if ($$props.description === void 0 && $$bindings.description && description !== void 0)
      $$bindings.description(description);
    if ($$props.image === void 0 && $$bindings.image && image !== void 0)
      $$bindings.image(image);
    if ($$props.source === void 0 && $$bindings.source && source !== void 0)
      $$bindings.source(source);
    if ($$props.content === void 0 && $$bindings.content && content !== void 0)
      $$bindings.content(content);
    if ($$props.cms === void 0 && $$bindings.cms && cms !== void 0)
      $$bindings.cms(cms);
    if ($$props.user === void 0 && $$bindings.user && user !== void 0)
      $$bindings.user(user);
    $$unsubscribe_user();
    return `<h1>${escape(title)}</h1>

<div>${each(description, (paragraph) => {
      return `<p><!-- HTML_TAG_START -->${paragraph}<!-- HTML_TAG_END --></p>`;
    })}</div>

${image ? `<div><img${add_attribute("src", image.src, 0)}${add_attribute("alt", image.alt, 0)}></div>` : ``}

${cms ? `<p>Try it out: <button>Login</button></p>` : ``}

${source ? `${validate_component(source_default, "Uses").$$render($$result, { content, source }, {}, {})}` : ``}

<p><a href="${"."}">Back home</a></p>`;
  });
  var pages_default = Pages;
