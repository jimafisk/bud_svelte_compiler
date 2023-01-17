/* templates/global/head.js generated by Svelte v3.47.0 */
import { add_attribute, create_ssr_component, escape } from "svelte/internal";

const Head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { title, env } = $$props;
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
	if ($$props.env === void 0 && $$bindings.env && env !== void 0) $$bindings.env(env);

	return `<head><meta charset="${"utf-8"}">
  <meta name="${"viewport"}" content="${"width=device-width,initial-scale=1"}">

  <title>${escape(title)}</title>

  <base${add_attribute("href", env.baseurl, 0)}>
  <script type="${"module"}" src="${"spa/core/main.js"}"></script>

  <link href="${"https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,700;1,300&display=swap"}" rel="${"stylesheet"}">
  <link rel="${"icon"}" type="${"image/svg+xml"}" href="${"logo.svg"}">
  <link rel="${"stylesheet"}" href="${"global.css"}">
  <link rel="${"stylesheet"}" href="${"spa/bundle.css"}"></head>`;
});

export default Head;