<!--This form adds records that have a product's name, description, photo,
and will also create a unique ID for every entry.

The entries will be stored in the figure data store, universally available
to every page.-->

<script setup>
	// console.clear();
	import { ref, reactive, computed, watch } from 'vue';

	//FIRESTORE AND VUEFIRE IMPORTS

	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//DATABASE VARIABLES

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data
	const categories = useCollection(collection(db, 'categories'));

	let chosenCategoryId = ref(null);

	const subcategoriesCollection = computed(function () {
		if (chosenCategoryId.value) {
			return collection(db, 'categories', chosenCategoryId.value, 'subcategories');
		} else {
			console.log("There's no subcats collection!");
		}
	});

	const subcategories = useCollection(subcategoriesCollection);
	let chosenSubcategoryId = ref(null);

	watch(chosenCategoryId, function (a, b) {
		console.log('category changed');
		chosenSubcategoryId.value = null;
	});

	watch(chosenSubcategoryId, function (a, b) {
		console.log('subcategory changed');
	});

	const userInput = reactive({
		slug: '',
		name: '',
		image: '',
		description: '',
	});

	function createItem() {
		addDoc(collection(db, 'figures'), {
			slug: userInput.slug,
			name: userInput.name,
			category: chosenCategoryId.value,
			subcategory: chosenSubcategoryId.value,
			image: userInput.image,
			description: userInput.description,
		});
		console.log(slug, name, category, subcategory, image, description);
		console.log(`${userInput.name} added to Firestore!`);
	}
</script>

<template>
	<pre v-if="chosenCategoryId">{{ typeof chosenCategoryId }}</pre>
	<pre>{{ chosenCategoryId }}</pre>
	<div class="create-figure-form-wrapper">
		<form @submit.prevent="createItem()">
			<h2>Create Figure in Firestore</h2>
			<input-wrapper>
				<label>Slug</label>
				<input id="slug" type="text" v-model="userInput.slug" />
			</input-wrapper>

			<input-wrapper>
				<label>Name</label>
				<input id="name" type="text" v-model="userInput.name" />
			</input-wrapper>

			<input-wrapper>
				<label>Category</label>
				<select v-if="categories" v-model="chosenCategoryId">
					<option v-for="category in categories" :value="category.id">{{ category.name }}</option>
				</select>
			</input-wrapper>

			<input-wrapper>
				<label>Subcategory</label>
				<select v-if="chosenCategoryId" v-model="chosenSubcategoryId">
					<option v-for="subcategory in subcategories" :value="subcategory.id">{{ subcategory.name }}</option>
				</select>
			</input-wrapper>

			<input-wrapper>
				<label>Image</label>
				<input id="image" type="text" v-model="userInput.image" />
			</input-wrapper>

			<input-wrapper>
				<label>Description</label>
				<input id="description" type="text" v-model="userInput.description" />
			</input-wrapper>

			<button type="submit">Create item</button>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.create-figure-form-wrapper {
		border: 2px solid var(--ink);
		box-shadow: 10px 10px var(--ink);
		background-color: var(--x11gray);
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin-top: 60px;
		padding: 30px 0px 30px 0px;
		margin: 60px auto 0px auto;
		width: 80%;
	}

	@media (prefers-color-scheme: dark) {
		.create-figure-form-wrapper {
			background-color: var(--ink);
			border: 2px solid var(--paper);
			box-shadow: 10px 10px var(--paper);
		}
	}

	form {
		// border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		font-family: 'Bangers';
		font-size: calc(20px + 1vw);
	}

	input {
		font-family: 'Courier', sans-serif;
		font-size: 18px;
	}

	input-wrapper,
	button-wrapper {
		display: flex;
		justify-content: center;
		width: 60%;
		gap: 35px;
		font-size: 24px;
		margin-top: 30px;
	}

	@media (max-width: 539px) {
		input-wrapper {
			margin-top: 0px;
			flex-direction: column;
			gap: 5px;

			label {
				margin-top: 30px;
			}

			input {
				margin-top: 10px;
				font-size: 3vh;
			}
		}
	}
</style>
