import { writable } from 'svelte/store';
import axios from 'axios';

function createCart() {

	const { subscribe, set, update } = writable(undefined);

	return {
		subscribe,set,
		add: async (_id, _qty) => {
			const res = await axios.get(`http://localhost:8080/api/products/${_id}`);
			let _item = res.data.data;
			_item.qty = _qty;

			update((items) => {
				const existItem = items.find( item => item._id == _id );
				let newItems;
				if (existItem) {
					// overwrite qty rather than adding
					newItems = [ ...items.map( item => (item._id == _id) ? { ...item, qty:_qty } : item ) ]
				}
				else {
					newItems = [ ...items, _item ]
				}
				localStorage.setItem('cart',JSON.stringify(newItems))
				return newItems;
			})
		},
		delete: (_id) => {
			update((items) => {
				const newItems = items.filter(item => item._id != _id);
				localStorage.setItem('cart',JSON.stringify(newItems))
				return newItems;
			})
		}
	};
}

export const cart = createCart();