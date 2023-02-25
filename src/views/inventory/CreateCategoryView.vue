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
		id: '',
		name: '',
		blurb: '',
		image: '',
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
	<div class="create-category-form-wrapper">
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
			<button-wrapper>
				<button type="submit">Create category</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.create-category-form-wrapper {
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

		.create-category-form-wrapper {
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
