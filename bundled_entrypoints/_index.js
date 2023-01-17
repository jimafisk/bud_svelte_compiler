(() => {
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
            code: Array.from(result.css).map((css4) => css4.code).join("\n"),
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

  // js/ssr/scripts/sort_by_date.js
  var sortByDate = (items, order) => {
    items.sort((a, b) => {
      let dateA = new Date(a?.fields?.date);
      let dateB = new Date(b?.fields?.date);
      return order == "oldest" ? dateA - dateB : dateB - dateA;
    });
    return items;
  };
  var Sort_by_date = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return ``;
  });

  // js/ssr/components/grid.js
  var css = {
    code: ".grid.js-mjwerd.js-mjwerd{display:grid;grid-template-columns:repeat(3, 1fr);grid-column-gap:10px;grid-row-gap:10px}.grid.js-mjwerd .grid-item.js-mjwerd{display:flex;flex-grow:1;height:180px;padding:10px;align-items:center;justify-content:center;background:var(--primary);font-weight:bold;border-radius:5px;color:white;text-align:center}a.js-mjwerd.js-mjwerd::before{content:none}",
    map: `{"version":3,"file":"grid.js","sources":["grid.js"],"sourcesContent":["<script>\\n  import { sortByDate } from '../scripts/sort_by_date.js';\\n  export let items, postRangeLow, postRangeHigh;\\n<\/script>\\n\\n<div class=\\"grid\\">\\n  {#each sortByDate(items) as item, i}\\n    {#if i >= postRangeLow && i < postRangeHigh}\\n      <a class=\\"grid-item\\" href=\\"{item.path}\\">{item.fields.title}</a>\\n    {/if}\\n  {/each}\\n</div>\\n\\n<style>\\n  .grid {\\n    display: grid;\\n    grid-template-columns: repeat(3, 1fr);\\n    grid-column-gap: 10px;\\n    grid-row-gap: 10px;\\n  }\\n  .grid .grid-item {\\n    display: flex;\\n    flex-grow: 1;\\n    height: 180px;\\n    padding: 10px;\\n    align-items: center;\\n    justify-content: center;\\n    background: var(--primary);\\n    font-weight: bold;\\n    border-radius: 5px;\\n    color: white;\\n    text-align: center;\\n  }\\n  a::before {\\n    content: none;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAcE,KAAK,4BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CACrC,eAAe,CAAE,IAAI,CACrB,YAAY,CAAE,IAAI,AACpB,CAAC,AACD,mBAAK,CAAC,UAAU,cAAC,CAAC,AAChB,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,CAAC,CACZ,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,IAAI,SAAS,CAAC,CAC1B,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,6BAAC,QAAQ,AAAC,CAAC,AACT,OAAO,CAAE,IAAI,AACf,CAAC"}`
  };
  var Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { items, postRangeLow, postRangeHigh } = $$props;
    if ($$props.items === void 0 && $$bindings.items && items !== void 0)
      $$bindings.items(items);
    if ($$props.postRangeLow === void 0 && $$bindings.postRangeLow && postRangeLow !== void 0)
      $$bindings.postRangeLow(postRangeLow);
    if ($$props.postRangeHigh === void 0 && $$bindings.postRangeHigh && postRangeHigh !== void 0)
      $$bindings.postRangeHigh(postRangeHigh);
    $$result.css.add(css);
    return `<div class="${"grid svelte-mjwerd"}">${each(sortByDate(items), (item, i) => {
      return `${i >= postRangeLow && i < postRangeHigh ? `<a class="${"grid-item svelte-mjwerd"}"${add_attribute("href", item.path, 0)}>${escape(item.fields.title)}</a>` : ``}`;
    })}
</div>`;
  });
  var grid_default = Grid;

  // js/ssr/components/source.js
  var css2 = {
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
    $$result.css.add(css2);
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

  // js/ssr/components/pager.js
  var css3 = {
    code: "ul.js-1tphcia{display:flex;max-width:600px;margin:20px auto}li.js-1tphcia{flex-grow:1;list-style:none}a.js-1tphcia{text-align:center;padding:5px 20px;border-radius:5px;background:#f0efef}span.js-1tphcia{text-align:center;padding:5px 20px;color:gray}",
    map: '{"version":3,"file":"pager.js","sources":["pager.js"],"sourcesContent":["<script>\\n  export let currentPage, totalPages;\\n<\/script>\\n\\n<ul>\\n  {#if currentPage > 1}\\n    <li><a href=\\".\\">first</a></li>\\n    <li><a href=\\"{currentPage - 1}\\">prev</a></li>\\n  {:else}\\n    <li><span>first</span></li>\\n    <li><span>prev</span></li>\\n  {/if}\\n  {#each [3,2,1] as i}\\n    {#if currentPage - i > 0}\\n      <li><a href=\\"{currentPage - i}\\">{currentPage - i}</a></li>\\n    {/if}\\n  {/each}\\n  <li><span>{currentPage}</span></li>\\n  {#each Array(3) as _, i}\\n    {#if currentPage + (i+1) <= totalPages}\\n      <li><a href=\\"{currentPage + (i+1)}\\">{currentPage + (i+1)}</a></li>\\n    {/if}\\n  {/each}\\n  {#if currentPage < totalPages}\\n    <li><a href=\\"{currentPage + 1}\\">next</a></li>\\n    <li><a href=\\"{totalPages}\\">last</a></li>\\n  {:else}\\n    <li><span>next</span></li>\\n    <li><span>last</span></li>\\n  {/if}\\n</ul>\\n\\n<style>\\n  ul {\\n    display: flex;\\n    max-width: 600px;\\n    margin: 20px auto;\\n  }\\n  li {\\n    flex-grow: 1;\\n    list-style: none;\\n  }\\n  a {\\n    text-align: center;\\n    padding: 5px 20px;\\n    border-radius: 5px;\\n    background: #f0efef;\\n  }\\n  span {\\n    text-align: center;\\n    padding: 5px 20px;\\n    color: gray;\\n  }\\n</style>"],"names":[],"mappings":"AAiCE,EAAE,eAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AACD,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,CAAC,CACZ,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,CAAC,eAAC,CAAC,AACD,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,OAAO,AACrB,CAAC,AACD,IAAI,eAAC,CAAC,AACJ,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,KAAK,CAAE,IAAI,AACb,CAAC"}'
  };
  var Pager = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { currentPage, totalPages } = $$props;
    if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
      $$bindings.currentPage(currentPage);
    if ($$props.totalPages === void 0 && $$bindings.totalPages && totalPages !== void 0)
      $$bindings.totalPages(totalPages);
    $$result.css.add(css3);
    return `<ul class="${"svelte-1tphcia"}">${currentPage > 1 ? `<li class="${"svelte-1tphcia"}"><a href="${"."}" class="${"svelte-1tphcia"}">first</a></li>
    <li class="${"svelte-1tphcia"}"><a${add_attribute("href", currentPage - 1, 0)} class="${"svelte-1tphcia"}">prev</a></li>` : `<li class="${"svelte-1tphcia"}"><span class="${"svelte-1tphcia"}">first</span></li>
    <li class="${"svelte-1tphcia"}"><span class="${"svelte-1tphcia"}">prev</span></li>`}
  ${each([3, 2, 1], (i) => {
      return `${currentPage - i > 0 ? `<li class="${"svelte-1tphcia"}"><a${add_attribute("href", currentPage - i, 0)} class="${"svelte-1tphcia"}">${escape(currentPage - i)}</a></li>` : ``}`;
    })}
  <li class="${"svelte-1tphcia"}"><span class="${"svelte-1tphcia"}">${escape(currentPage)}</span></li>
  ${each(Array(3), (_, i) => {
      return `${currentPage + (i + 1) <= totalPages ? `<li class="${"svelte-1tphcia"}"><a${add_attribute("href", currentPage + (i + 1), 0)} class="${"svelte-1tphcia"}">${escape(currentPage + (i + 1))}</a></li>` : ``}`;
    })}
  ${currentPage < totalPages ? `<li class="${"svelte-1tphcia"}"><a${add_attribute("href", currentPage + 1, 0)} class="${"svelte-1tphcia"}">next</a></li>
    <li class="${"svelte-1tphcia"}"><a${add_attribute("href", totalPages, 0)} class="${"svelte-1tphcia"}">last</a></li>` : `<li class="${"svelte-1tphcia"}"><span class="${"svelte-1tphcia"}">next</span></li>
    <li class="${"svelte-1tphcia"}"><span class="${"svelte-1tphcia"}">last</span></li>`}
</ul>`;
  });
  var pager_default = Pager;

  // js/ssr/content/_index.js
  var Index = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let currentPage;
    let postRangeHigh;
    let postRangeLow;
    let { title, intro, blog, source, content, allContent } = $$props;
    let postsPerPage = 3;
    let allPosts = allContent.filter((content2) => content2.type == "blog");
    let totalPosts = allPosts.length;
    let totalPages = Math.ceil(totalPosts / postsPerPage);
    if ($$props.title === void 0 && $$bindings.title && title !== void 0)
      $$bindings.title(title);
    if ($$props.intro === void 0 && $$bindings.intro && intro !== void 0)
      $$bindings.intro(intro);
    if ($$props.blog === void 0 && $$bindings.blog && blog !== void 0)
      $$bindings.blog(blog);
    if ($$props.source === void 0 && $$bindings.source && source !== void 0)
      $$bindings.source(source);
    if ($$props.content === void 0 && $$bindings.content && content !== void 0)
      $$bindings.content(content);
    if ($$props.allContent === void 0 && $$bindings.allContent && allContent !== void 0)
      $$bindings.allContent(allContent);
    currentPage = content.pager ? content.pager : 1;
    postRangeHigh = currentPage * postsPerPage;
    postRangeLow = postRangeHigh - postsPerPage;
    return `<h1>${escape(title)}</h1>

<section id="${"intro"}">${each(intro, (paragraph) => {
      return `<p><!-- HTML_TAG_START -->${paragraph}<!-- HTML_TAG_END --></p>`;
    })}</section>

${blog ? `<div><h3>Recent blog posts:</h3>
		${validate_component(grid_default, "Grid").$$render(
      $$result,
      {
        items: allPosts,
        postRangeLow,
        postRangeHigh
      },
      {},
      {}
    )}
		<br></div>
	${validate_component(pager_default, "Pager").$$render($$result, { currentPage, totalPages }, {}, {})}` : ``}

${source ? `${validate_component(source_default, "Uses").$$render($$result, { content, source }, {}, {})}` : ``}`;
  });
  var index_default = Index;
})();
