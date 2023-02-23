<script setup>
	// console.clear();
	import { ref, reactive, computed, watch } from 'vue';
	import { RouterLink } from 'vue-router';

	//FIRESTORE AND VUEFIRE IMPORTS

	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//DATABASE VARIABLES

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data
	const categories = useCollection(collection(db, 'categories'));
</script>

<template>
	<h1>Admin Inventory</h1>

	<RouterLink to="/inventory/create-category">Create / view / edit category</RouterLink>
	<RouterLink to="/inventory/create-subcategory">Create / view / edit subcategory</RouterLink>

	<RouterLink to="/inventory/create">Create figure</RouterLink>

	<ul v-if="figures" v-for="figure in figures">
		<li><RouterLink :to="`/inventory/edit/${figure.slug}`">Edit</RouterLink>{{ figure.name }}</li>
	</ul>
</template>

<style></style>
