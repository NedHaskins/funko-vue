<script setup>
	//Vue imports
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';
	import FigureList from '@/components/FigureList.vue';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const figuresRef = collection(db, 'figures');

	const figures = useCollection(figuresRef);

	function toggleFavorite(rname) {
		console.log('toggleFavorite', rname);
		user.toggleFavorite(rname);
	}

	function isFavorite(item) {
		if (user.favorites.includes(itemId)) {
			return true;
		} else {
			return false;
		}
	}

	const userDecoratedFigures = computed(function () {
		return figures.list.map(function (item) {
			return {
				...item,
				favorite: isFavorite(item),
			};
		});
	});
</script>

<template>
	<module-header>
		<h2>{{ user.userDoc.firstName }}'s Favorites</h2>
	</module-header>

	<FigureList v-bind:figures="favorites" />
</template>

<style></style>
