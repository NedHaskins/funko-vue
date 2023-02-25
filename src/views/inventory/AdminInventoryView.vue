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
	<inventory-ui-navbar>
		<RouterLink to="/inventory/figure-list">View figure list</RouterLink>
		<RouterLink to="/inventory/create-figure">Create new figure</RouterLink>
		<RouterLink to="/inventory/create-category">Create / view / edit category</RouterLink>
		<RouterLink to="/inventory/create-subcategory">Create / view / edit subcategory</RouterLink>
	</inventory-ui-navbar>

	<RouterView />
</template>

<style lang="scss" scoped>
	inner-column {
		display: block;
		margin: 0 auto;
		width: 70%;
	}

	h1 {
		font-family: 'Bangers';
	}

	inventory-ui-navbar {
		border: 3px solid black;
		background-color: var(--melon);
		display: flex;
		justify-content: space-evenly;
		text-align: center;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;

		a {
			display: inline-block;
			font-family: 'Bangers';
			font-size: 28px;
		}

		a:hover {
			color: green;
		}

		.router-link-active {
			font-weight: 700;
			color: green;
		}
	}

	@media (prefers-color-scheme: dark) {
		inventory-ui-navbar {
			border: none;
		}

		a {
			color: black;
		}
	}

	@media (min-width: 600px) {
		inventory-ui-navbar a {
			font-size: 21px;
		}
	}
</style>
