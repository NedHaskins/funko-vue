<script setup>
	// console.clear();
	import { ref, reactive, computed, watch } from 'vue';
	import { useRoute, RouterLink } from 'vue-router';

	//FIRESTORE AND VUEFIRE IMPORTS
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { query, where, collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//DATABASE VARIABLES
	const db = useFirestore();
	const route = useRoute();
	const categories = useCollection(collection(db, 'categories'));

	const figures = useCollection(collection(db, 'figures'));

	let chosenCategoryId = ref(null);
	let chosenSubcategoryId = ref(null);

	const userInput = reactive({
		//stores the user inputs from the form
		id: '',
		name: '',
		category: '',
		image: '',
		price: '',
		description: '',
	});

	function addFigure(id) {
		setDoc(doc(db, 'figures', id), {
			name: userInput.name,
			category: chosenCategoryId.value,
			image: userInput.image,
			price: userInput.price,
			description: userInput.description,
		});

		alert(`The figure ${userInput.name} has been added to Firestore.`);
		userInput.id = '';
		userInput.name = '';
		userInput.image = '';
		userInput.price = '';
		userInput.description = '';
	}

	function consoleTest() {
		console.log(
			'Console tests: ',
			userInput.id,
			userInput.name,
			userInput.category,
			userInput.image,
			userInput.price,
			userInput.description,
		);
		userInput.id = '';
		userInput.name = '';
		userInput.image = '';
		userInput.price = '';
		userInput.description = '';
	}
</script>

<template>
	<pre style="color: cyan" v-if="figures">{{ figures }}</pre>
	<div class="create-figure-form-wrapper">
		<form @submit.prevent="addFigure(userInput.id)">
			<h2>Create Figure</h2>
			<input-wrapper>
				<label>Firestore Document ID</label>
				<input type="text" v-model="userInput.id" />
			</input-wrapper>

			<input-wrapper>
				<label>Name</label>
				<input id="name" type="text" v-model="userInput.name" />
			</input-wrapper>

			<input-wrapper>
				<label>Category</label>
				<select v-if="categories" v-model="chosenCategoryId">
					<option v-if="categories" v-for="category in categories" :value="category.id">
						{{ category.name }}
					</option>
				</select>
			</input-wrapper>

			<!-- 	<input-wrapper>
				<label>Subcategory</label>
				<select v-model="tempFigure.subcategory">
					<option v-if="subcategories" v-for="subcat in subcategories" :value="subcat.id">
						{{ subcat.name }}
					</option>
				</select>
			</input-wrapper> -->

			<input-wrapper>
				<label>Image</label>
				<input v-model="userInput.image" />
			</input-wrapper>

			<input-wrapper>
				<label>Price</label>
				<input v-model="userInput.price" />
			</input-wrapper>

			<input-wrapper>
				<label>Description</label>
				<input v-model="userInput.description" />
			</input-wrapper>

			<button-wrapper>
				<button type="submit">Create figure</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style></style>

form fields populated by current figure... if user submits, pass updateDoc with tempFigure if cancel -- reset tempFigure
back to tem

<style></style>
