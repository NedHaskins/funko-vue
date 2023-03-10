//Purpose is to allow easy access to the figure collections
//and subcollections.

import { computed } from 'vue';

import { useRoute } from 'vue-router';

import { defineStore } from 'pinia';

import { collection } from 'firebase/firestore';

import { useFirestore, useCollection } from 'vuefire';

export const useFigureService = defineStore('figures', function () {
	const route = useRoute();
	const db = useFirestore();

	const figuresReference = computed(function () {
		return collection(db, 'figures');
	});

	const list = useCollection(figuresReference);

	const figure = computed(function () {
		return list.value.find((item) => item.id == route.params.figure);
	});

	return {
		list,
		figure,
	};
});
