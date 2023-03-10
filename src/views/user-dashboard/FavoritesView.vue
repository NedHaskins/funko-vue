<script setup>
	//Vue imports
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';

	import { useFavoritesService } from '@/services/FavoritesService';

	import FigureCard from '@/components/FigureCard.vue';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const figuresRef = collection(db, 'figures');

	const figures = useCollection(figuresRef);
	const favorites = useFavoritesService();

	function toggleFavorite(rname) {
		console.log('toggleFavorite', rname);
		user.toggleFavorite(rname);
	}

	//For each item in the favorites list,
	//return the figure from the figures collection that matches the name of that favorites item.
	const favoritedFigures = computed(function () {
		let array = [];
		for (let i = 0; i < favorites.list.length; i++) {
			const found = figures.value.find((item) => item.slug === favorites.list[i].name);
			array.push(found);
		}
		return array; //Return stups the function!
	});

	// function isFavorite(item) {
	// 	if (user.favorites.includes(itemId)) {
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }

	//for all figures in the figures collection
	//if the figure slug is somewhere in the favorites list

	// const userDecoratedFigures = computed(function () {
	// 	return figures.list.map(function (item) {
	// 		return {
	// 			...item,
	// 			favorite: isFavorite(item),
	// 		};
	// 	});
	// });

	//Loop through each
</script>

<template>
	<!-- 	<div style="color: lime">{{ figures }}</div>
	<div style="color: green">{{ favorites.list }}</div>
	<div style="color: magenta">{{ favoritedFigures }}</div> -->

	<module-header>
		<h2>{{ user.userDoc?.firstName }}'s Favorites</h2>
	</module-header>

	<ul class="figure-list" v-if="favoritedFigures">
		<li v-for="card in favoritedFigures">
			<FigureCard :figure="card" />
		</li>
	</ul>
</template>

<style></style>
