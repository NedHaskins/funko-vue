<script setup>
	// console.clear();
	import { ref, reactive, computed, watch } from 'vue';
	import { useRoute, RouterLink } from 'vue-router';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { query, where, collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Database variables
	const db = useFirestore();
	const route = useRoute();
	const categories = useCollection(collection(db, 'categories'));

	const figureRef = doc(db, 'figures', route.params.slug);

	const figure = useDocument(figureRef);

	const tempFigure = ref(figure); //allows for walking back edits
	console.log(tempFigure.value.category);
	//Reactive objects to hold user-chosen values from the dropdown menus.
	// const chosenCategoryId = ref(null);
	// const chosenSubcategoryId = ref(null);

	const chosenCategoryId = ref(null);

	const subcategoriesRef = computed(function () {
		if (tempFigure.value) {
			return collection(db, 'categories', tempFigure.value.category, 'subcategories');
		} else {
			console.log('There are no subcategories in this collection.');
		}
	});

	const subcategories = useCollection(subcategoriesRef);

	// let updateForm = reactive({
	// 	slug: tempFigure?.slug,
	// 	name: tempFigure?.name,
	// 	category: tempFigure?.category,
	// 	subcategory: tempFigure?.subcategory,
	// 	image: tempFigure?.image,
	// 	price: tempFigure?.price,
	// 	description: tempFigure?.description,
	// });

	function updateFigure(id) {
		setDoc(doc(db, 'figures', tempFigure.value.id), {
			slug: tempFigure.value.slug,
			name: tempFigure.value.name,
			category: tempFigure.value.category,
			subcategory: tempFigure.value.subcategory,
			image: tempFigure.value.image,
			price: tempFigure.value.price,
			description: tempFigure.value.description,
		});
		alert('Figure updated');
	}

	function revertFigure() {}
</script>

<template>
	<pre style="color: orange" v-if="figure">{{ figure }}</pre>
	<pre style="color: cyan" v-if="figure">{{ tempFigure.subcategory }}</pre>
	<!-- <pre style="color: lime" v-if="figure">{{ route.params.slug }}</pre> -->
	<div style="color: red" v-if="figure">{{ subcategories }}</div>
	<div v-if="tempFigure" class="view-edit-figure-form-wrapper">
		<h2>View / Edit Figure Info</h2>
		<form @submit.prevent="updateFigure(tempFigure.id)">
			<input-wrapper>
				<label>Slug</label>
				<input id="slug" type="text" v-model="tempFigure.slug" />
			</input-wrapper>

			<input-wrapper>
				<label>Name</label>
				<input id="name" type="text" v-model="tempFigure.name" />
			</input-wrapper>

			<input-wrapper>
				<label>Category</label>
				<select v-model="tempFigure.category">
					<option v-for="choice in categories" :value="choice.id">
						{{ choice.name }}
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
				<input v-model="tempFigure.image" />
			</input-wrapper>

			<input-wrapper>
				<label>Price</label>
				<input v-model="tempFigure.price" />
			</input-wrapper>

			<input-wrapper>
				<label>Description</label>
				<input v-model="tempFigure.description" />
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
