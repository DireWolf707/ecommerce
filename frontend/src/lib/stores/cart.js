import { writable } from 'svelte/store';
import { browser } from "$app/env";
import axios from 'axios';

function createCart() {
    const initialData = browser && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	const { subscribe, set, update } = writable(initialData);

	return {
		subscribe,
		add: async (_id, _qty) => {
			let _item = await axios.get(`http://localhost:8080/api/products/${_id}`);
			_item.qty = _qty;

			update((items) => {
				const existItem = items.find( item => item.id == _id );
				let newItems;
				if (existItem) {
					// overwrite qty rather than adding
					newItems = [ ...items.map( item => (item.id == _id) ? { ...item, qty:_qty } : item ) ]
				}
				else {
					newItems = [ ...items, _item ]
				}
				localStorage.setItem('cart',JSON.stringify(newItems))
				return newItems;
			})
		},
		delete: () => {}
	};
}

export const cart = createCart();