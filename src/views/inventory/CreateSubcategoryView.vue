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
			//the category field isn't needed here because it won't appear in the inside document
		});
		alert(`The subcategory ${userInput.name} has been added to ${category}.`);
		userInput.id = '';
		userInput.name = '';
		userInput.blurb = '';
		userInput.image = '';
	}
</script>

<template>
	<div class="create-subcategory-form-wrapper">
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
				<input type="text" v-model="userInput.id" />
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
			<button-wrapper>
				<button type="submit">Create subcategory</button>
			</button-wrapper>
		</form>
	</div>
</template>
<style lang="scss" scoped>
	.create-subcategory-form-wrapper {
		margin-top: 31px;
		display: block;
		background-color: gray;
		padding: 26px;
		box-shadow: 10px 10px var(--ink);
		form {
			input-wrapper {
				display: flex;
				flex-direction: column;
				margin-top: 16px;
				input {
					margin-top: 6px;
				}
			}

			button-wrapper {
				display: block;
				margin-top: 16px;
			}

			label,
			input,
			select {
				font-size: 32px;
			}
		}

		ul {
			margin-top: 20px;
			li {
				display: flex;
				flex-direction: row;
				gap: 20px;
				// border: 3px solid black;

				link-wrapper,
				figure-name {
					display: block;
				}

				link-wrapper,
				button {
					border: 3px solid black;
					padding: 10px;
					font-family: 'Bangers';
					background-color: white;
				}

				button,
				a {
					font-size: 20px;
				}

				figure-name {
					display: flex;
					// border: 3px solid red;
					align-items: center;
					font-family: 'Bangers';
					font-size: 22px;
				}
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		a {
			color: black;
		}
	}

	@media (min-width: 600px) {
		figure-list {
			max-width: 520px;
		}

		.create-subcategory-form-wrapper {
			width: 60%;
			form {
				input-wrapper {
					width: 80%;
					label,
					input,
					select {
						font-size: 24px;
					}
				}
			}
		}
	}
</style>
