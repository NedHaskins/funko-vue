import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const useCategoriesStore = defineStore('categories', function () {
	//Goals for this store:
	//list of items in cart
	//add, remove, add additional copies of, items

	const list = reactive([
		{
			name: 'Lord of the Rings',
			slug: 'lotr',
			subcategories: [
				{
					name: 'Elves',
					slug: 'elves',
					singular: 'elf',
				},
				{
					name: 'Dwarves',
					slug: 'dwarves',
					singular: 'dwarf',
				},
				{
					name: 'Men',
					slug: 'men',
					singular: 'man',
				},
				{
					name: 'Creatures',
					slug: 'creatures',
					singular: 'creature',
				},
			],
		},
		{
			name: 'Movies',
			slug: 'movies',
		},
		{
			name: 'Music',
			slug: 'music',
		},
		{
			name: 'Famous Memes',
			slug: 'memes',
		},
		{
			name: 'Anime',
			slug: 'anime',
		},
		{
			name: 'Marvel Universe',
			slug: 'marvel',
		},
	]);

	//add an item to the list
	function add(item) {
		list.push(item);
	}

	return {
		list: list,
		add: add,
	};
});
