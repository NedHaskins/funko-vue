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
		category: chosenCategoryId,
		id: '',
		name: '',
		blurb: '',
		image: '',
	});

	function addSubcategory(id, category) {
		setDoc(doc(db, 'categories', category, 'subcategories', id), {
			name: userInput.name,
			blurb: userInput.blurb,
			image: userInput.image,
		});

		alert(`The subcategory ${userInput.name} has been added to ${category}.`);
		userInput.id = '';
		userInput.name = '';
		userInput.blurb = '';
		userInput.image = '';
	}
</script>

<template>
	<form @submit.prevent="addSubcategory(userInput.id, chosenCategoryId)">
		<h2>Create new subcategory</h2>
		<h3>Add a new subcategory collection to one of the existing category documents in the Firebase store.</h3>

		<input-wrapper>
			<label>Choose a category.</label>
			<select v-if="categories" v-model="chosenCategoryId">
				<option v-for="category in categories" :value="category.id">{{ category.name }}</option>
			</select>
		</input-wrapper>

		<input-wrapper>
			<label>Firestore Document ID</label>
			<input id="slug" type="text" v-model="userInput.id" value />
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
		<button type="submit">Create subcategory</button>
	</form>
</template>
