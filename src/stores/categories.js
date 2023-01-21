import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', function () {
	//Goals for this store:
	//list of items in cart
	//add, remove, add additional copies of, items

	const list = reactive([
		{ name: 'Movies', slug: 'movies' },
		{ name: 'Music', slug: 'music' },
		{ name: 'Marvel Universe', slug: 'marvel' },
		{ name: 'Lord of the Rings', slug: 'lotr' },
		{ name: 'Famous Memes', slug: 'memes' },
	]);

	//add an item to the cart
	function add(item) {
		list.push(item);
	}

	return {
		list: list,
		add: add,
	};
});
