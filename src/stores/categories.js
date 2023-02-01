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
				},
				{
					name: 'Dwarves',
					slug: 'dwarves',
					image: '/images/categories/lotr/dwarves.jpg',
				},
				{
					name: 'Humans',
					slug: 'humans',
					image: '/images/categories/lotr/humans.jpg',
				},
				{
					name: 'Creatures',
					slug: 'creatures',
					image: '/images/categories/lotr/creatures.jpg',
				},
			],
		},
		{
			name: 'Movies',
			slug: 'movies',
			image: '/images/categories/movies.jpg',
			blurb: 'Some figures from some of the most well-known movies of our time!',
			subcategories: [
				{
					name: 'The Matrix',
					slug: 'the-matrix',
					blurb: 'Are you ready to take the red pill...or take the blue pill and go back to sleep?',
					image: '/images/categories/movies/the-matrix.jpg',
				},
			],
		},
		{
			name: 'Music',
			slug: 'music',
			image: '/images/categories/music.jpg',
			blurb: 'The musicians you love...now in Funko Pop figure form...',
			subcategories: [
				{
					name: '1980s',
					slug: '1980s',
					blurb: "The decade of glam rock, New Wave Punk, and the B52's.",
					image: '/images/categories/music/motley-crue.jpg',
				},
			],
		},
		{
			name: 'Famous Memes',
			slug: 'memes',
			image: '/images/categories/memes.jpg',
			blurb: 'Cultural icons from the 2000s - 2010s.',
			subcategories: [
				{
					name: '',
					slug: '1980s',
					blurb: "The decade of glam rock, New Wave Punk, and the B52's.",
					image: '/images/categories/movies/the-matrix.jpg',
				},
			],
		},
		{
			name: 'Anime',
			slug: 'anime',
			image: '/images/categories/anime.jpg',
			blurb: "Classic figures from Japan's most famous international export.",
			subcategories: [
				{
					name: 'Jujutsu Kaisen',
					slug: 'jujutsu-kaisen',
					blurb: "A modern mix of horror and fantasy - a boy's journey to rid himself of a terrible curse...",
					image: '/images/categories/movies/jujutsu-kaisen.jpg',
				},
			],
		},
		{
			name: 'Marvel Universe',
			slug: 'marvel',
			image: '/images/categories/marvel.jpg',
			blurb: 'Figures inspired by the work of Stan Lee and his team of artists.',
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
