<script setup>
	//Vue imports
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();


	const categories = useCollection(db, 'categories');




	
</script>

<template>Create a new subcategory</template>
