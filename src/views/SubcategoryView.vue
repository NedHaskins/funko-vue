<script setup>
	import { useRoute } from 'vue-router';
	import { useCategoriesStore } from '@/stores/categories';

	import FigureList from '@/components/FigureList.vue';
	import FigureCard from '@/components/FigureCard.vue';

	//FIRESTORE AND VUEFIRE IMPORTS

	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { query, where, collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//VUE VARIABLES
	const route = useRoute();

	//DATABASE VARIABLES

	const db = useFirestore();

	const categories = useCollection(collection(db, 'categories'));

	const q = query(collection(db, 'figures'), where('subcategory', '==', route.params.sub));

	const figures = useCollection(q); //vuefire's using this

	const subcategories = useCollection(collection(db, 'categories', route.params.cat, 'subcategories'));

	// defineProps(['category', 'subcategory']);

	//Return only the figures that match the "subcategory" of the route.params.
	let filteredFigures = [];

	//Look at each of the figures in the figure store.
	//If their subcategory value matches the route.params.sub,
	//push it to filteredFigures.

	// figures.forEach(function (figure) {
	// 	if (figure.subcategory == route.params.sub) {
	// 		filteredFigures.push(figure);
	// 	}
	// });

	console.log(figures);

	// const category = categories.find(function (record) {
	// 	return record.slug == route.params.cat;
	// });

	// const subcategory = subcategories.find(function (item) {
	// 	return item.id == route.params.sub;
	// }); // find needs to be used here -- not filter -- as it'll return an array [] otherwise
</script>

<template>
	<code>
		<pre></pre>
	</code>
	<module-header> </module-header>
	<!-- 	<ul class="figure-list">
		<li v-for="figureCard in filteredFigures">
			<FigureCard v-bind:figure="figureCard" />
		</li>
	</ul> -->

	<FigureList v-bind:figures="figures" />
</template>

<style scoped>
	figure-card {
		display: grid;

		gap: var(--scaffoldPadding);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	li {
		justify-self: center;
	}

	h3 {
		text-align: center;
	}

	@media (min-width: 960px) {
		ul {
		}
	}

	figcaption {
		text-align: center;
		margin-top: 8px;
	}
</style>
