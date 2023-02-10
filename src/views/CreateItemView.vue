<!--This form adds records that have a product's name, description, photo,
and will also create a unique ID for every entry.

The entries will be stored in the figure data store, universally available
to every page.-->

<script setup>
	import { reactive } from 'vue';

	//FIRESTORE AND VUEFIRE IMPORTS

	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data
	const categories = useCollection(collection(db, 'categories'));

	const userInput = reactive({
		slug: '',
		name: '',
		category: '',
		subcategory: '',
		image: '',
		description: '',
	});
</script>

<template>
	<div class="create-figure-form-wrapper">
		<form>
			<h2>Create Figure in Firestore</h2>
			<input-wrapper>
				<label for="slug">Slug</label>
				<input id="slug" type="text" v-model="userInput.slug" />
			</input-wrapper>
			<input-wrapper>
				<label for="name">Name</label>
				<input id="name" type="text" v-model="userInput.name" />
			</input-wrapper>
			<input-wrapper>
				<label for="category">Category</label>
				<select id="category">
					<option v-for="category in categories">{{ category.name }}</option>
				</select>
			</input-wrapper>
			<input-wrapper>
				<label for="subcategory">Subcategory</label>
				<select id="subcategory">
					<option v-for="subcategory in category.subcategories">{{ subcategory.name }}</option>
				</select>
			</input-wrapper>
			<input-wrapper>
				<label for="image">Image</label>
				<input id="image" type="text" v-model="userInput.image" />
			</input-wrapper>
			<input-wrapper>
				<label for="description">Description</label>
				<input id="description" type="text" v-model="userInput.description" />
			</input-wrapper>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.user-signup,
	.user-login {
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
		.user-signup,
		.user-login {
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

	label,
	input {
		font-family: 'Bangers';
		font-size: calc(20px + 1vw);
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
