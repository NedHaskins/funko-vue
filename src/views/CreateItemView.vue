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

	//Create item form variables.
	let chosenSubcategoryId = ref(null);
	watch(chosenCategoryId, function (a, b) {
		console.log('category changed');
		chosenSubcategoryId.value = null;
	});

	watch(chosenSubcategoryId, function (a, b) {
		console.log('subcategory changed');
	});

	let chosenFigure = ref(null);

	watch(chosenFigure, function (a, b) {
		console.log(chosenFigure.value.category);
	});

	const userInput = reactive({
		slug: '',
		name: '',
		image: '',
		price: '',
		description: '',
	});

	//go inside categories collection and return all categories
	//

	//go inside chosenFigure object
	//check what the current category value is (use category collection values)

	//return this as an <option> and assign selected to the tag
	//also, return the other ones

	function createFigure() {
		addDoc(collection(db, 'figures'), {
			slug: userInput.slug,
			name: userInput.name,
			category: chosenCategoryId.value,
			subcategory: chosenSubcategoryId.value,
			image: userInput.image,
			price: userInput.price,
			description: userInput.description,
		});
		console.log(slug, name, category, subcategory, image, description);
		console.log(`${userInput.name} added to Firestore!`);
	}

	const editedSubcategoriesCollection = computed(function () {
		if (chosenFigure.value.category) {
			return collection(db, 'categories', chosenFigure.value.category, 'subcategories');
		} else {
			console.log('nothing found.');
		}
	});

	const editedSubcategories = useCollection(editedSubcategoriesCollection);
	console.log('The new subcats list', editedSubcategories.value);

	function updateFigure(currentId, slug, name, category, subcategory, image, price, description) {
		setDoc(doc(db, 'figures', currentId), {
			slug: updateInput.slug,
			name: updateInput.name,
			category: updateCategoryId.value,
			subcategory: updateSubcategoryId.value,
			image: updateInput.image,
			price: updateInput.price,
			description: userInput.description,
		});
		clearEdit();
	}
</script>

<template>
	<pre v-if="chosenCategoryId">{{ typeof chosenCategoryId }}</pre>
	<pre>{{ chosenCategoryId }}</pre>
	<div class="create-figure-form-wrapper">
		<!--make this into a CreateFigureForm component-->
		<form @submit.prevent="createFigure()">
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
				<!--dependent on if chosen category has subcategories collection-->
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
				<label>Price</label>
				<input id="price" type="number" v-model="userInput.price" />
			</input-wrapper>

			<input-wrapper>
				<label>Description</label>
				<input id="description" type="text" v-model="userInput.description" />
			</input-wrapper>

			<button type="submit">Create item</button>
		</form>
	</div>

	<div class="view-edit-figure-form-wrapper">
		<h2>View / Edit Figure Info</h2>
		<form>
			<form-left>
				<input-wrapper>
					<label>Choose a figure.</label>
					<select v-if="figures" v-model="chosenFigure">
						<option v-for="figure in figures" :value="figure">{{ figure.name }}</option>
					</select>
				</input-wrapper>
			</form-left>

			<!--Watch the select menu.  The inputs in the following section should change reactively depending on which item is selected in the above dropdown.-->

			<form-right v-if="chosenFigure">
				<input-wrapper>
					<label>Slug</label>
					<input id="slug" type="text" :value="chosenFigure.slug" />
				</input-wrapper>

				<input-wrapper>
					<label>Name</label>
					<input id="name" type="text" :value="chosenFigure.name" />
				</input-wrapper>

				<input-wrapper>
					<label>Category</label>
					<select v-model="chosenFigure.category">
						<option v-if="categories" v-for="category in categories" :value="category.id">
							{{ category.name }}
						</option>
					</select>
				</input-wrapper>

				<input-wrapper>
					<label>Subcategory</label>
					<select v-model="chosenFigure.subcategory">
						<option v-if="editedSubcategories" v-for="subcat in editedSubcategories" :value="subcat.id">
							happy days
						</option>
					</select>
				</input-wrapper>

				<input-wrapper>
					<label>Image</label>
					<input :value="chosenFigure.image" />
				</input-wrapper>

				<input-wrapper>
					<label>Price</label>
					<input :value="chosenFigure.price" />
				</input-wrapper>

				<input-wrapper>
					<label>Description</label>
					<input :value="chosenFigure.description" />
				</input-wrapper>
			</form-right>
			<button-wrapper>
				<button type="submit">Update figure</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.create-figure-form-wrapper,
	.view-edit-figure-form-wrapper {
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
		.create-figure-form-wrapper,
		.view-edit-figure-form-wrapper {
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

	.view-edit-figure-form-wrapper {
		form {
			// border: 1px solid black;
			flex-direction: row;

			input-wrapper {
				width: auto;
			}
		}
	}

	@media (max-width: 949px) {
		.view-edit-figure-form-wrapper {
			form {
				flex-direction: column;
			}
		}
	}

	form-left,
	form-right {
		align-self: start;
		display: block;
		border: 3px dashed yellow;
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
