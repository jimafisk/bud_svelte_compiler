/* templates/global/html.svelte generated by Svelte v3.47.0 */
import {
	SvelteComponentDev,
	add_location,
	append_hydration_dev,
	append_styles,
	assign,
	attr_dev,
	check_outros,
	children,
	claim_component,
	claim_element,
	claim_space,
	create_component,
	destroy_component,
	detach_dev,
	dispatch_dev,
	element,
	get_spread_object,
	get_spread_update,
	group_outros,
	init,
	insert_hydration_dev,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out,
	validate_slots
} from "svelte/internal";

import Head from './head.svelte';
import Nav from './nav.svelte';
import Footer from './footer.svelte';
import { makeTitle } from '../scripts/make_title.svelte';
const file = "templates/global/html.svelte";

function add_css(target) {
	append_styles(target, "svelte-1jzy6jg", "main.svelte-1jzy6jg{flex:1 0 auto}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64, */");
}

function create_fragment(ctx) {
	let html;
	let head;
	let t0;
	let body;
	let main;
	let nav;
	let t1;
	let div;
	let switch_instance;
	let t2;
	let br;
	let t3;
	let footer;
	let current;

	head = new Head({
			props: {
				title: makeTitle(/*content*/ ctx[0].filename),
				env: /*env*/ ctx[4]
			},
			$$inline: true
		});

	nav = new Nav({ $$inline: true });

	const switch_instance_spread_levels = [
		/*content*/ ctx[0].fields,
		{ content: /*content*/ ctx[0] },
		{ allContent: /*allContent*/ ctx[2] },
		{ allLayouts: /*allLayouts*/ ctx[3] },
		{ user: /*user*/ ctx[5] }
	];

	var switch_value = /*layout*/ ctx[1];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	footer = new Footer({
			props: { allContent: /*allContent*/ ctx[2] },
			$$inline: true
		});

	const block = {
		c: function create() {
			html = element("html");
			create_component(head.$$.fragment);
			t0 = space();
			body = element("body");
			main = element("main");
			create_component(nav.$$.fragment);
			t1 = space();
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t2 = space();
			br = element("br");
			t3 = space();
			create_component(footer.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			html = claim_element(nodes, "HTML", { lang: true });
			var html_nodes = children(html);
			claim_component(head.$$.fragment, html_nodes);
			t0 = claim_space(html_nodes);
			body = claim_element(html_nodes, "BODY", {});
			var body_nodes = children(body);
			main = claim_element(body_nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			claim_component(nav.$$.fragment, main_nodes);
			t1 = claim_space(main_nodes);
			div = claim_element(main_nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			t2 = claim_space(div_nodes);
			br = claim_element(div_nodes, "BR", {});
			div_nodes.forEach(detach_dev);
			t3 = claim_space(main_nodes);
			claim_component(footer.$$.fragment, main_nodes);
			main_nodes.forEach(detach_dev);
			body_nodes.forEach(detach_dev);
			html_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(br, file, 16, 6, 501);
			attr_dev(div, "class", "container");
			add_location(div, file, 14, 4, 367);
			attr_dev(main, "class", "svelte-1jzy6jg");
			add_location(main, file, 12, 2, 344);
			add_location(body, file, 11, 0, 335);
			attr_dev(html, "lang", "en");
			add_location(html, file, 9, 0, 267);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, html, anchor);
			mount_component(head, html, null);
			append_hydration_dev(html, t0);
			append_hydration_dev(html, body);
			append_hydration_dev(body, main);
			mount_component(nav, main, null);
			append_hydration_dev(main, t1);
			append_hydration_dev(main, div);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			append_hydration_dev(div, t2);
			append_hydration_dev(div, br);
			append_hydration_dev(main, t3);
			mount_component(footer, main, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const head_changes = {};
			if (dirty & /*content*/ 1) head_changes.title = makeTitle(/*content*/ ctx[0].filename);
			if (dirty & /*env*/ 16) head_changes.env = /*env*/ ctx[4];
			head.$set(head_changes);

			const switch_instance_changes = (dirty & /*content, allContent, allLayouts, user*/ 45)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*content*/ 1 && get_spread_object(/*content*/ ctx[0].fields),
					dirty & /*content*/ 1 && { content: /*content*/ ctx[0] },
					dirty & /*allContent*/ 4 && { allContent: /*allContent*/ ctx[2] },
					dirty & /*allLayouts*/ 8 && { allLayouts: /*allLayouts*/ ctx[3] },
					dirty & /*user*/ 32 && { user: /*user*/ ctx[5] }
				])
			: {};

			if (switch_value !== (switch_value = /*layout*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, t2);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			const footer_changes = {};
			if (dirty & /*allContent*/ 4) footer_changes.allContent = /*allContent*/ ctx[2];
			footer.$set(footer_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(head.$$.fragment, local);
			transition_in(nav.$$.fragment, local);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			transition_in(footer.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(head.$$.fragment, local);
			transition_out(nav.$$.fragment, local);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			transition_out(footer.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(html);
			destroy_component(head);
			destroy_component(nav);
			if (switch_instance) destroy_component(switch_instance);
			destroy_component(footer);
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
	validate_slots('Html', slots, []);
	let { content, layout, allContent, allLayouts, env, user, adminMenu } = $$props;
	const writable_props = ['content', 'layout', 'allContent', 'allLayouts', 'env', 'user', 'adminMenu'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Html> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('content' in $$props) $$invalidate(0, content = $$props.content);
		if ('layout' in $$props) $$invalidate(1, layout = $$props.layout);
		if ('allContent' in $$props) $$invalidate(2, allContent = $$props.allContent);
		if ('allLayouts' in $$props) $$invalidate(3, allLayouts = $$props.allLayouts);
		if ('env' in $$props) $$invalidate(4, env = $$props.env);
		if ('user' in $$props) $$invalidate(5, user = $$props.user);
		if ('adminMenu' in $$props) $$invalidate(6, adminMenu = $$props.adminMenu);
	};

	$$self.$capture_state = () => ({
		Head,
		Nav,
		Footer,
		makeTitle,
		content,
		layout,
		allContent,
		allLayouts,
		env,
		user,
		adminMenu
	});

	$$self.$inject_state = $$props => {
		if ('content' in $$props) $$invalidate(0, content = $$props.content);
		if ('layout' in $$props) $$invalidate(1, layout = $$props.layout);
		if ('allContent' in $$props) $$invalidate(2, allContent = $$props.allContent);
		if ('allLayouts' in $$props) $$invalidate(3, allLayouts = $$props.allLayouts);
		if ('env' in $$props) $$invalidate(4, env = $$props.env);
		if ('user' in $$props) $$invalidate(5, user = $$props.user);
		if ('adminMenu' in $$props) $$invalidate(6, adminMenu = $$props.adminMenu);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [content, layout, allContent, allLayouts, env, user, adminMenu];
}

class Html extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				content: 0,
				layout: 1,
				allContent: 2,
				allLayouts: 3,
				env: 4,
				user: 5,
				adminMenu: 6
			},
			add_css
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Html",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*content*/ ctx[0] === undefined && !('content' in props)) {
			console.warn("<Html> was created without expected prop 'content'");
		}

		if (/*layout*/ ctx[1] === undefined && !('layout' in props)) {
			console.warn("<Html> was created without expected prop 'layout'");
		}

		if (/*allContent*/ ctx[2] === undefined && !('allContent' in props)) {
			console.warn("<Html> was created without expected prop 'allContent'");
		}

		if (/*allLayouts*/ ctx[3] === undefined && !('allLayouts' in props)) {
			console.warn("<Html> was created without expected prop 'allLayouts'");
		}

		if (/*env*/ ctx[4] === undefined && !('env' in props)) {
			console.warn("<Html> was created without expected prop 'env'");
		}

		if (/*user*/ ctx[5] === undefined && !('user' in props)) {
			console.warn("<Html> was created without expected prop 'user'");
		}

		if (/*adminMenu*/ ctx[6] === undefined && !('adminMenu' in props)) {
			console.warn("<Html> was created without expected prop 'adminMenu'");
		}
	}

	get content() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set content(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get layout() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set layout(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allContent() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allContent(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allLayouts() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allLayouts(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get env() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set env(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get user() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get adminMenu() {
		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set adminMenu(value) {
		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default Html;