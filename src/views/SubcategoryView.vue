<script setup>
	//Vue imports
	import { useRoute } from 'vue-router';

	//Vue components
	import FigureList from '@/components/FigureList.vue';
	import FigureCard from '@/components/FigureCard.vue';

	//Firestore / Viefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { query, where, collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const categories = useCollection(collection(db, 'categories'));

	// const figures = useCollection(q); //vuefire

	const filteredFiguresRef = query(collection(db, 'figures'), where('subcategory', '==', route.params.sub));

	const filteredFigures = useDocument(filteredFiguresRef);

	const subcatRef = query(
		collection(db, 'categories', route.params.cat, 'subcategories'),
		where('subcategory', '==', route.params.sub),
	);
	const subcategory = useDocument(subcatRef);
</script>

<template>
	<module-header>
		<h2>{{ subcategory[0].name }}</h2>
		<h3>{{ subcategory[0].blurb }}</h3>
	</module-header>

	<FigureList :figures="filteredFigures" />
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
