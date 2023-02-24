<script setup>
	// console.clear();
	import { ref, reactive, computed, watch, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	import RainbowLetters from '@/scripts/rainbowLetters';
	const container = ref(null);
	onMounted(function () {
		RainbowLetters('Inventory UI');
	});

	//DATABASE VARIABLES

	const db = useFirestore();

	const categories = useCollection(collection(db, 'categories'));
</script>

<template>
	<module-header>
		<div id="letters-container" ref="container"></div>
	</module-header>
	<RouterLink to="/inventory/figure-list">View figure list</RouterLink>
	<RouterLink to="/inventory/create-figure">Create new figure</RouterLink>
	<RouterLink to="/inventory/create-category">Create / view / edit category</RouterLink>
	<RouterLink to="/inventory/create-subcategory">Create / view / edit subcategory</RouterLink>

	<RouterView />
</template>

<style lang="scss" scoped>
	h1 {
		font-family: 'Bangers';
	}
</style>
