/* templates/components/source.svelte generated by Svelte v3.47.0 */
import {
	SvelteComponentDev,
	add_location,
	append_hydration_dev,
	append_styles,
	attr_dev,
	binding_callbacks,
	children,
	claim_element,
	claim_space,
	claim_text,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	globals,
	init,
	insert_hydration_dev,
	listen_dev,
	noop,
	safe_not_equal,
	set_data_dev,
	space,
	text,
	toggle_class,
	validate_slots
} from "svelte/internal";

const { console: console_1 } = globals;
const file = "templates/components/source.svelte";

function add_css(target) {
	append_styles(target, "svelte-h385oz", "div.svelte-h385oz{display:flex;align-items:center}pre.svelte-h385oz{display:flex;padding-left:5px}code.svelte-h385oz{background-color:var(--base);padding:5px 10px}code.selected.svelte-h385oz{background-color:var(--accent)}button.svelte-h385oz{border:1px solid rgba(0,0,0,.1);background:white;padding:4px;border-top-right-radius:5px;border-bottom-right-radius:5px;cursor:pointer}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64, */");
}

// (21:0) {#if source.layout}
function create_if_block_1(ctx) {
	let div;
	let span;
	let t0;
	let t1;
	let pre;
	let t2;
	let code;
	let t3;
	let t4_value = /*content*/ ctx[0].type + "";
	let t4;
	let t5;
	let t6;
	let button;

	let t7_value = (/*copied*/ ctx[4] === /*templateEl*/ ctx[2]
	? 'copied'
	: 'copy') + "";

	let t7;
	let t8;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t0 = text("Layout:");
			t1 = space();
			pre = element("pre");
			t2 = text("\n      ");
			code = element("code");
			t3 = text("layouts/content/");
			t4 = text(t4_value);
			t5 = text(".svelte");
			t6 = text("\n      ");
			button = element("button");
			t7 = text(t7_value);
			t8 = text("\n    ");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, "Layout:");
			span_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			pre = claim_element(div_nodes, "PRE", { class: true });
			var pre_nodes = children(pre);
			t2 = claim_text(pre_nodes, "\n      ");
			code = claim_element(pre_nodes, "CODE", { class: true });
			var code_nodes = children(code);
			t3 = claim_text(code_nodes, "layouts/content/");
			t4 = claim_text(code_nodes, t4_value);
			t5 = claim_text(code_nodes, ".svelte");
			code_nodes.forEach(detach_dev);
			t6 = claim_text(pre_nodes, "\n      ");
			button = claim_element(pre_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			t7 = claim_text(button_nodes, t7_value);
			button_nodes.forEach(detach_dev);
			t8 = claim_text(pre_nodes, "\n    ");
			pre_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file, 22, 4, 419);
			attr_dev(code, "class", "svelte-h385oz");
			toggle_class(code, "selected", /*copied*/ ctx[4] === /*templateEl*/ ctx[2]);
			add_location(code, file, 24, 6, 456);
			attr_dev(button, "class", "svelte-h385oz");
			add_location(button, file, 25, 6, 577);
			attr_dev(pre, "class", "svelte-h385oz");
			add_location(pre, file, 23, 4, 444);
			attr_dev(div, "class", "svelte-h385oz");
			add_location(div, file, 21, 2, 409);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span);
			append_hydration_dev(span, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, pre);
			append_hydration_dev(pre, t2);
			append_hydration_dev(pre, code);
			append_hydration_dev(code, t3);
			append_hydration_dev(code, t4);
			append_hydration_dev(code, t5);
			/*code_binding*/ ctx[6](code);
			append_hydration_dev(pre, t6);
			append_hydration_dev(pre, button);
			append_hydration_dev(button, t7);
			append_hydration_dev(pre, t8);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[7], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*content*/ 1 && t4_value !== (t4_value = /*content*/ ctx[0].type + "")) set_data_dev(t4, t4_value);

			if (dirty & /*copied, templateEl*/ 20) {
				toggle_class(code, "selected", /*copied*/ ctx[4] === /*templateEl*/ ctx[2]);
			}

			if (dirty & /*copied, templateEl*/ 20 && t7_value !== (t7_value = (/*copied*/ ctx[4] === /*templateEl*/ ctx[2]
			? 'copied'
			: 'copy') + "")) set_data_dev(t7, t7_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*code_binding*/ ctx[6](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(21:0) {#if source.layout}",
		ctx
	});

	return block;
}

// (31:0) {#if source.content}
function create_if_block(ctx) {
	let div;
	let span;
	let t0;
	let t1;
	let pre;
	let t2;
	let code;
	let t3;

	let t4_value = (/*content*/ ctx[0].type === 'index'
	? ''
	: /*content*/ ctx[0].type + '/') + "";

	let t4;
	let t5_value = /*content*/ ctx[0].filename + "";
	let t5;
	let t6;
	let button;

	let t7_value = (/*copied*/ ctx[4] === /*contentEl*/ ctx[3]
	? 'copied'
	: 'copy') + "";

	let t7;
	let t8;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t0 = text("Content:");
			t1 = space();
			pre = element("pre");
			t2 = text("\n      ");
			code = element("code");
			t3 = text("content/");
			t4 = text(t4_value);
			t5 = text(t5_value);
			t6 = text("\n      ");
			button = element("button");
			t7 = text(t7_value);
			t8 = text("\n    ");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", {});
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, "Content:");
			span_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			pre = claim_element(div_nodes, "PRE", { class: true });
			var pre_nodes = children(pre);
			t2 = claim_text(pre_nodes, "\n      ");
			code = claim_element(pre_nodes, "CODE", { class: true });
			var code_nodes = children(code);
			t3 = claim_text(code_nodes, "content/");
			t4 = claim_text(code_nodes, t4_value);
			t5 = claim_text(code_nodes, t5_value);
			code_nodes.forEach(detach_dev);
			t6 = claim_text(pre_nodes, "\n      ");
			button = claim_element(pre_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			t7 = claim_text(button_nodes, t7_value);
			button_nodes.forEach(detach_dev);
			t8 = claim_text(pre_nodes, "\n    ");
			pre_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file, 32, 4, 734);
			attr_dev(code, "class", "svelte-h385oz");
			toggle_class(code, "selected", /*copied*/ ctx[4] === /*contentEl*/ ctx[3]);
			add_location(code, file, 34, 6, 772);
			attr_dev(button, "class", "svelte-h385oz");
			add_location(button, file, 35, 6, 932);
			attr_dev(pre, "class", "svelte-h385oz");
			add_location(pre, file, 33, 4, 760);
			attr_dev(div, "class", "svelte-h385oz");
			add_location(div, file, 31, 2, 724);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span);
			append_hydration_dev(span, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, pre);
			append_hydration_dev(pre, t2);
			append_hydration_dev(pre, code);
			append_hydration_dev(code, t3);
			append_hydration_dev(code, t4);
			append_hydration_dev(code, t5);
			/*code_binding_1*/ ctx[8](code);
			append_hydration_dev(pre, t6);
			append_hydration_dev(pre, button);
			append_hydration_dev(button, t7);
			append_hydration_dev(pre, t8);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[9], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*content*/ 1 && t4_value !== (t4_value = (/*content*/ ctx[0].type === 'index'
			? ''
			: /*content*/ ctx[0].type + '/') + "")) set_data_dev(t4, t4_value);

			if (dirty & /*content*/ 1 && t5_value !== (t5_value = /*content*/ ctx[0].filename + "")) set_data_dev(t5, t5_value);

			if (dirty & /*copied, contentEl*/ 24) {
				toggle_class(code, "selected", /*copied*/ ctx[4] === /*contentEl*/ ctx[3]);
			}

			if (dirty & /*copied, contentEl*/ 24 && t7_value !== (t7_value = (/*copied*/ ctx[4] === /*contentEl*/ ctx[3]
			? 'copied'
			: 'copy') + "")) set_data_dev(t7, t7_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*code_binding_1*/ ctx[8](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(31:0) {#if source.content}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t;
	let if_block1_anchor;
	let if_block0 = /*source*/ ctx[1].layout && create_if_block_1(ctx);
	let if_block1 = /*source*/ ctx[1].content && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_hydration_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_hydration_dev(target, if_block1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (/*source*/ ctx[1].layout) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*source*/ ctx[1].content) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Source', slots, []);
	let { content, source } = $$props;
	let templateEl;
	let contentEl;
	let copied;

	const copy = async el => {
		if (!navigator.clipboard) {
			return;
		}

		try {
			await navigator.clipboard.writeText(el.innerHTML);
			$$invalidate(4, copied = el);
			setTimeout(() => $$invalidate(4, copied = null), 500);
		} catch(err) {
			console.error('Failed to copy!', err);
		}
	};

	const writable_props = ['content', 'source'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Source> was created with unknown prop '${key}'`);
	});

	function code_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			templateEl = $$value;
			$$invalidate(2, templateEl);
		});
	}

	const click_handler = () => copy(templateEl);

	function code_binding_1($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			contentEl = $$value;
			$$invalidate(3, contentEl);
		});
	}

	const click_handler_1 = () => copy(contentEl);

	$$self.$$set = $$props => {
		if ('content' in $$props) $$invalidate(0, content = $$props.content);
		if ('source' in $$props) $$invalidate(1, source = $$props.source);
	};

	$$self.$capture_state = () => ({
		content,
		source,
		templateEl,
		contentEl,
		copied,
		copy
	});

	$$self.$inject_state = $$props => {
		if ('content' in $$props) $$invalidate(0, content = $$props.content);
		if ('source' in $$props) $$invalidate(1, source = $$props.source);
		if ('templateEl' in $$props) $$invalidate(2, templateEl = $$props.templateEl);
		if ('contentEl' in $$props) $$invalidate(3, contentEl = $$props.contentEl);
		if ('copied' in $$props) $$invalidate(4, copied = $$props.copied);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		content,
		source,
		templateEl,
		contentEl,
		copied,
		copy,
		code_binding,
		click_handler,
		code_binding_1,
		click_handler_1
	];
}

class Source extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { content: 0, source: 1 }, add_css);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Source",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*content*/ ctx[0] === undefined && !('content' in props)) {
			console_1.warn("<Source> was created without expected prop 'content'");
		}

		if (/*source*/ ctx[1] === undefined && !('source' in props)) {
			console_1.warn("<Source> was created without expected prop 'source'");
		}
	}

	get content() {
		throw new Error("<Source>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set content(value) {
		throw new Error("<Source>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get source() {
		throw new Error("<Source>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set source(value) {
		throw new Error("<Source>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Source;