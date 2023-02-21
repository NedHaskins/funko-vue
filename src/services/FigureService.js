import { defineStore } from 'pinia';

export const useFigureStore = defineStore('figures', function () {
	const user = useUserService();
	const db = useFirestore();

	const figures = useCollection(collection(db, 'figures'));
});
