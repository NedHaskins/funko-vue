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

	function addCategory(id) {
		// alert(`Add ${form.name}`);
		setDoc(doc(db, 'categories', id), {
			name: userInput.name,
			blurb: userInput.blurb,
			image: userInput.image,
		});

		alert(`The category ${userInput.name} has been added to Firestore.`);
		userInput.id = '';
		userInput.name = '';
		userInput.blurb = '';
		userInput.image = '';
	}
</script>

<template>
	<form @submit.prevent="addCategory(userInput.id)">
		<h2>Create new category</h2>
		<h3>Add a new a category of figures to the Firebase store.</h3>

		<input-wrapper>
			<label>Firestore Document ID</label>
			<input id="slug" type="text" v-model="userInput.id" />
		</input-wrapper>

		<input-wrapper>
			<label>Name</label>
			<input id="name" type="text" v-model="userInput.name" />
		</input-wrapper>
		<input-wrapper>
			<label>Blurb</label>
			<input id="blurb" type="text" v-model="userInput.blurb" />
		</input-wrapper>
		<input-wrapper>
			<label>Image</label>
			<input id="image" type="text" v-model="userInput.image" />
		</input-wrapper>
		<button type="submit">Create category</button>
	</form>
</template>
