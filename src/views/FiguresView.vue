<script setup>
	//Vue imports
	import { computed, onMounted } from 'vue';

	import FigureList from '@/components/FigureList.vue';

	//Firebase imports
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Firebase variables

	const db = useFirestore();

	const figuresReference = computed(function () {
		return collection(db, 'figures');
	});

	const figures = useCollection(figuresReference); //reactive data
</script>
<template>
	<module-header>
		<h2>Choose a figure from the list below!</h2>
		<h3>To filter figures down by category, click on the "Categories" link above.</h3>
	</module-header>
	<FigureList v-bind:figures="figures" />
</template>

<style scoped></style>
