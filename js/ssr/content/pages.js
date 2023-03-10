/* templates/content/pages.js generated by Svelte v3.47.0 */
import {
	add_attribute,
	create_ssr_component,
	each,
	escape
} from "svelte/internal";

const Pages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { title = "pages title" } = $$props;
	let description = ["some desc content", "more desc content"];
	let image = { src: "/whatever.jpg", alt: "something" };
	if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);

	return `<h1>${escape(title)}</h1>

<div>${each(description, paragraph => {
		return `<p><!-- HTML_TAG_START -->${paragraph}<!-- HTML_TAG_END --></p>`;
	})}</div>

${image
	? `<div><img${add_attribute("src", image.src, 0)}${add_attribute("alt", image.alt, 0)}></div>`
	: ``}

<p><a href="${"."}">Back home</a></p>`;
});

export default Pages;