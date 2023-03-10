/* templates/scripts/stores.svelte generated by Svelte v3.47.0 */
import {
	SvelteComponentDev,
	dispatch_dev,
	init,
	noop,
	safe_not_equal,
	validate_slots
} from "svelte/internal";

import { writable } from 'svelte/store';
const file = "templates/scripts/stores.svelte";

function create_fragment(ctx) {
	const block = {
		c: noop,
		l: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
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

const count = writable(0);

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Stores', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Stores> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ writable, count });
	return [];
}

class Stores extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Stores",
			options,
			id: create_fragment.name
		});
	}
}

export default Stores;
export { count };