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
			image: '/images/categories/lotr.jpg',
			blurb: "The characters from Tolkien's world-famous series await you in this inspired collection.",
			subcategories: [
				{
					name: 'Elves',
					slug: 'elves',
					blurb: "The Firstborn of Middle-Earth, these characters play pivotal roles across all of Tolkien's story-arcs.",
					image: '/images/categories/lotr/elves.jpg',
					singular: 'elf',
				},
				{
					name: 'Dwarves',
					slug: 'dwarves',
					image: '/images/categories/lotr/dwarves.jpg',
					singular: 'dwarf',
				},
				{
					name: 'Humans',
					slug: 'humans',
					image: '/images/categories/lotr/humans.jpg',
					singular: 'human',
				},
				{
					name: 'Creatures',
					slug: 'creatures',
					image: '/images/categories/lotr/creatures.jpg',
					singular: 'creature',
				},
			],
		},
		{
			name: 'Movies',
			slug: 'movies',
			image: '/images/categories/movies.jpg',
		},
		{
			name: 'Music',
			slug: 'music',
			image: '/images/categories/music.jpg',
		},
		{
			name: 'Famous Memes',
			slug: 'memes',
			image: '/images/categories/memes.jpg',
		},
		{
			name: 'Anime',
			slug: 'anime',
			image: '/images/categories/anime.jpg',
		},
		{
			name: 'Marvel Universe',
			slug: 'marvel',
			image: '/images/categories/marvel.jpg',
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
