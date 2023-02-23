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

	const figureRef = doc(db, 'figures', route.params.slug);

	const figure = useDocument(figureRef);

	const tempFigure = ref(figure); //allows for walking back edits

	// const subcategories = useCollection(collection(db, 'categories', tempFigure.value.category, 'subcategories'));

	// const subcategoriesReference = computed(function () {
	// 	if (tempFigure.value.category) {
	// 		//check for the dynamic value that the main variable value depends on
	// 		return collection(db, 'categories', tempFigure.value.category, 'subcategories');
	// 		console.log('Collection returned.');
	// 	} else {
	// 		return false;
	// 	}
	// });

	// const subcategories = useCollection(subcategoriesReference);

	// let updateForm = reactive({
	// 	slug: tempFigure?.slug,
	// 	name: tempFigure?.name,
	// 	category: tempFigure?.category,
	// 	subcategory: tempFigure?.subcategory,
	// 	image: tempFigure?.image,
	// 	price: tempFigure?.price,
	// 	description: tempFigure?.description,
	// });

	function updateFigure(id, newName, newRole) {
		setDoc(doc(db, 'figures', tempFigure.value), {
			slug: newSlug,
			name: newName,
			category: newCategory,
			subcategory: newSubcategory,
			image: newImage,
			price: newPrice,
			description: newDescription,
		});
		console.log('Figure updated');
	}

	function revertFigure() {}
</script>

<template>
	<div style="color: cyan" v-if="figure">{{ tempFigure }}</div>
	<div style="color: lime" v-if="figure">{{ tempFigure }}</div>
	<div style="color: red" v-if="figure">{{}}</div>
	<div v-if="tempFigure?.category" class="view-edit-figure-form-wrapper">
		<h2>View / Edit Figure Info</h2>
		<form>
			<input-wrapper>
				<label>Slug</label>
				<input id="slug" type="text" :value="tempFigure.slug" />
			</input-wrapper>

			<input-wrapper>
				<label>Name</label>
				<input id="name" type="text" :value="tempFigure.name" />
			</input-wrapper>

			<input-wrapper>
				<label>Category</label>
				<select v-model="tempFigure.category">
					<option v-if="categories" v-for="category in categories" :value="category.id">
						{{ category.name }}
					</option>
				</select>
			</input-wrapper>

			<input-wrapper>
				<label>Subcategory</label>
				<select v-model="tempFigure.subcategory">
					<option v-if="subcategories" v-for="subcat in subcategories" :value="subcat.id">
						{{ subcat.name }}
					</option>
				</select>
			</input-wrapper>

			<input-wrapper>
				<label>Image</label>
				<input :value="tempFigure.image" />
			</input-wrapper>

			<input-wrapper>
				<label>Price</label>
				<input :value="tempFigure.price" />
			</input-wrapper>

			<input-wrapper>
				<label>Description</label>
				<input :value="tempFigure.description" />
			</input-wrapper>

			<button-wrapper>
				<button type="submit">Update figure</button>
			</button-wrapper>
			<button-wrapper>
				<button type="button">Revert figure info</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style></style>

form fields populated by current figure... if user submits, pass updateDoc with tempFigure if cancel -- reset tempFigure
back to tem
