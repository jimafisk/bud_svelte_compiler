/* templates/content/blog.svelte generated by Svelte v3.47.0 */
import {
	SvelteComponentDev,
	add_location,
	append_hydration_dev,
	attr_dev,
	children,
	claim_element,
	claim_space,
	claim_text,
	detach_dev,
	dispatch_dev,
	element,
	empty,
	init,
	insert_hydration_dev,
	noop,
	safe_not_equal,
	set_data_dev,
	space,
	text,
	validate_slots
} from "svelte/internal";

const file = "templates/content/blog.svelte";

// (10:7) {#if author}
function create_if_block_1(ctx) {
	let t0;
	let t1;

	const block = {
		c: function create() {
			t0 = text("Written by ");
			t1 = text(/*author*/ ctx[1]);
		},
		l: function claim(nodes) {
			t0 = claim_text(nodes, "Written by ");
			t1 = claim_text(nodes, /*author*/ ctx[1]);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, t1, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(10:7) {#if author}",
		ctx
	});

	return block;
}

// (10:43) {#if date}
function create_if_block(ctx) {
	let t0;
	let t1;

	const block = {
		c: function create() {
			t0 = text(" on ");
			t1 = text(/*date*/ ctx[2]);
		},
		l: function claim(nodes) {
			t0 = claim_text(nodes, " on ");
			t1 = claim_text(nodes, /*date*/ ctx[2]);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, t0, anchor);
			insert_hydration_dev(target, t1, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(10:43) {#if date}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let p0;
	let em;
	let if_block0_anchor;
	let t2;
	let p1;
	let t3;
	let p2;
	let a;
	let t4;
	let if_block0 = /*author*/ ctx[1] && create_if_block_1(ctx);
	let if_block1 = /*date*/ ctx[2] && create_if_block(ctx);

	const block = {
		c: function create() {
			h1 = element("h1");
			t0 = text(/*title*/ ctx[0]);
			t1 = space();
			p0 = element("p");
			em = element("em");
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			t2 = space();
			p1 = element("p");
			t3 = space();
			p2 = element("p");
			a = element("a");
			t4 = text("Back home");
			this.h();
		},
		l: function claim(nodes) {
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, /*title*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t1 = claim_space(nodes);
			p0 = claim_element(nodes, "P", {});
			var p0_nodes = children(p0);
			em = claim_element(p0_nodes, "EM", {});
			var em_nodes = children(em);
			if (if_block0) if_block0.l(em_nodes);
			if_block0_anchor = empty();
			if (if_block1) if_block1.l(em_nodes);
			em_nodes.forEach(detach_dev);
			p0_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p1 = claim_element(nodes, "P", {});
			var p1_nodes = children(p1);
			p1_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			p2 = claim_element(nodes, "P", {});
			var p2_nodes = children(p2);
			a = claim_element(p2_nodes, "A", { href: true });
			var a_nodes = children(a);
			t4 = claim_text(a_nodes, "Back home");
			a_nodes.forEach(detach_dev);
			p2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h1, file, 7, 0, 148);
			add_location(em, file, 9, 3, 169);
			add_location(p0, file, 9, 0, 166);
			add_location(p1, file, 11, 0, 250);
			attr_dev(a, "href", ".");
			add_location(a, file, 13, 3, 274);
			add_location(p2, file, 13, 0, 271);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, h1, anchor);
			append_hydration_dev(h1, t0);
			insert_hydration_dev(target, t1, anchor);
			insert_hydration_dev(target, p0, anchor);
			append_hydration_dev(p0, em);
			if (if_block0) if_block0.m(em, null);
			append_hydration_dev(em, if_block0_anchor);
			if (if_block1) if_block1.m(em, null);
			insert_hydration_dev(target, t2, anchor);
			insert_hydration_dev(target, p1, anchor);
			p1.innerHTML = /*body*/ ctx[3];
			insert_hydration_dev(target, t3, anchor);
			insert_hydration_dev(target, p2, anchor);
			append_hydration_dev(p2, a);
			append_hydration_dev(a, t4);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
			if (/*author*/ ctx[1]) if_block0.p(ctx, dirty);
			if (/*date*/ ctx[2]) if_block1.p(ctx, dirty);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p0);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p1);
			if (detaching) detach_dev(t3);
			if (detaching) detach_dev(p2);
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
	validate_slots('Blog', slots, []);
	let { title = "Blog title" } = $$props;
	let author = "jim";
	let date = "today";
	let body = "<ul><li>one</li><li>two</li></ul>";
	const writable_props = ['title'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Blog> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
	};

	$$self.$capture_state = () => ({ title, author, date, body });

	$$self.$inject_state = $$props => {
		if ('title' in $$props) $$invalidate(0, title = $$props.title);
		if ('author' in $$props) $$invalidate(1, author = $$props.author);
		if ('date' in $$props) $$invalidate(2, date = $$props.date);
		if ('body' in $$props) $$invalidate(3, body = $$props.body);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [title, author, date, body];
}

class Blog extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { title: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Blog",
			options,
			id: create_fragment.name
		});
	}

	get title() {
		throw new Error("<Blog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set title(value) {
		throw new Error("<Blog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Blog;