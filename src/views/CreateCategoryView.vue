<script setup>
	//Vue imports
	import { ref, reactive, computed } from 'vue';
	import { useRoute } from 'vue-router';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();

	const categories = useCollection(collection(db, 'categories'));

	let chosenCategoryId = ref(null);

	const userInput = reactive({
		slug: '',
		name: '',
	});

	function addCategory() {
		// alert(`Add ${form.name}`);
		addDoc(collection(db, 'categories'), {
			slug: userInput.slug,
			name: userInput.name,
		});
		alert(`The category ${userInput.name} has been added to Firestore.`);
		userInput.slug = '';
		userInput.name = '';
	}
</script>

<template>
	<form @submit.prevent="addCategory()">
		<h2>Create new category</h2>
		<h3>Add a new a category of figures to the Firebase store.</h3>

		<input-wrapper>
			<label>Slug</label>
			<input id="slug" type="text" v-model="userInput.slug" />
		</input-wrapper>

		<input-wrapper>
			<label>Name</label>
			<input id="name" type="text" v-model="userInput.name" />
		</input-wrapper>
		<button type="submit">Create category</button>
	</form>
</template>
