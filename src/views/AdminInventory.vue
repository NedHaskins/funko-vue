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

	<ul v-if="figures" v-for="figure in figures">
		<li><RouterLink :to="`/inventory/edit/${figure.slug}`">Edit</RouterLink>{{ figure.name }}</li>
	</ul>
</template>

<style></style>
