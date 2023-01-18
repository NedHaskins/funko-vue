import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useShoppingCartStore = defineStore('shoppingCart', function () {
	//Goals for this store:
	//list of items in cart
	//add, remove, add additional copies of, items

	const list = reactive([]);

	//add an item to the cart
	function add(item) {
		list.push(item);
	}

	return {
		list: list,
		add: add,
	};
});
