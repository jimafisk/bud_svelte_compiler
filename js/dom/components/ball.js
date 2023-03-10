/* templates/components/ball.svelte generated by Svelte v3.47.0 */
import {
	SvelteComponentDev,
	add_location,
	append_hydration_dev,
	append_styles,
	attr_dev,
	children,
	claim_element,
	detach_dev,
	dispatch_dev,
	element,
	init,
	insert_hydration_dev,
	noop,
	safe_not_equal,
	validate_slots
} from "svelte/internal";

const file = "templates/components/ball.svelte";

function add_css(target) {
	append_styles(target, "svelte-1yqcart", ".ball-wrapper.svelte-1yqcart{position:relative;height:80px}.bouncingball.svelte-1yqcart{width:40px;height:40px;border-radius:100%;background:var(--primary);animation:svelte-1yqcart-bounce 1s;transform:translateY(0px);animation-iteration-count:infinite;position:absolute}@keyframes svelte-1yqcart-bounce{0%{top:0;-webkit-animation-timing-function:ease-in}40%{}50%{top:40px;height:40px;-webkit-animation-timing-function:ease-out}55%{top:60px;height:20px;-webkit-animation-timing-function:ease-in}65%{top:20px;height:40px;-webkit-animation-timing-function:ease-out}95%{top:0;-webkit-animation-timing-function:ease-in}100%{top:0;-webkit-animation-timing-function:ease-in}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64, */");
}

function create_fragment(ctx) {
	let div1;
	let div0;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "bouncingball svelte-1yqcart");
			add_location(div0, file, 2, 2, 84);
			attr_dev(div1, "class", "ball-wrapper svelte-1yqcart");
			add_location(div1, file, 1, 0, 55);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, div0);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
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

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Ball', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Ball> was created with unknown prop '${key}'`);
	});

	return [];
}

class Ball extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Ball",
			options,
			id: create_fragment.name
		});
	}
}

export default Ball;