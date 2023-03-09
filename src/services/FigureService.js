//Purpose is to allow easy access to the figure collections
//and subcollections.

import { computed } from 'vue';

import { defineStore } from 'pinia';

import { collection } from 'firebase/firestore';

import { useFirestore, useCollection } from 'vuefire';

export const useFigureService = defineStore('figures', function () {
	const db = useFirestore();

	const figuresReference = computed(function () {
		return collection(db, 'figures');
	});

	const list = useCollection(figuresReference);

	return {
		list,
	};
});
