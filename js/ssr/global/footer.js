/* templates/global/footer.js generated by Svelte v3.47.0 */
import {
	add_attribute,
	create_ssr_component,
	each,
	escape
} from "svelte/internal";

import { makeTitle } from '../scripts/make_title.js';

const css = {
	code: "footer.js-c5bvyv{min-height:200px;display:flex;align-items:center;background-color:var(--base-dark);margin-top:100px;flex-shrink:0}span.js-c5bvyv{color:var(--primary);font-weight:bold}a.js-c5bvyv{color:white;text-decoration:none;margin-left:10px}",
	map: "{\"version\":3,\"file\":\"footer.js\",\"sources\":[\"footer.js\"],\"sourcesContent\":[\"<script>\\n  export let allContent;\\n  import { makeTitle } from '../scripts/make_title.js';\\n</script>\\n\\n<footer>\\n  <div class=\\\"container\\\">\\n    <span>All content:</span>\\n    {#each allContent as content}\\n      <a href=\\\"{content.path}\\\">{makeTitle(content.filename)}</a>\\n    {/each}\\n  </div>\\n</footer>\\n\\n<style>\\n  footer {\\n    min-height: 200px;\\n    display: flex;\\n    align-items: center;\\n    background-color: var(--base-dark);\\n    margin-top: 100px;\\n    flex-shrink: 0;\\n  }\\n  span {\\n    color: var(--primary);\\n    font-weight: bold;\\n  }\\n  a {\\n    color: white;\\n    text-decoration: none;\\n    margin-left: 10px;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAeE,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,KAAK,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,CAAC,AAChB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,IAAI,SAAS,CAAC,CACrB,WAAW,CAAE,IAAI,AACnB,CAAC,AACD,CAAC,cAAC,CAAC,AACD,KAAK,CAAE,KAAK,CACZ,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,IAAI,AACnB,CAAC\"}"
};

const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { allContent } = $$props;
	if ($$props.allContent === void 0 && $$bindings.allContent && allContent !== void 0) $$bindings.allContent(allContent);
	$$result.css.add(css);

	return `<footer class="${"svelte-c5bvyv"}"><div class="${"container"}"><span class="${"svelte-c5bvyv"}">All content:</span>
    ${each(allContent, content => {
		return `<a${add_attribute("href", content.path, 0)} class="${"svelte-c5bvyv"}">${escape(makeTitle(content.filename))}</a>`;
	})}</div>
</footer>`;
});

export default Footer;