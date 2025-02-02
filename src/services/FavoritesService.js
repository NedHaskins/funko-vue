//Pinia
import { defineStore } from 'pinia';

//Vue
import { ref, computed } from 'vue';

//Firebase imports
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { getDocs, collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useUserService } from '@/services/UserService';
import { useFigureService } from '@/services/FigureService';

export const useFavoritesService = defineStore('favorites', function () {
	const user = useUserService();
	const figures = useFigureService();

	const db = useFirestore();

	const favoritesReference = computed(function () {
		if (user.current) {
			return collection(db, 'users', user.current.uid, 'favorites');
		} else {
			return false; //this needs to be a "guest" cart object - maybe local storage?
		}
	});

	const list = useCollection(favoritesReference);

	async function toggleFavorite(id) {
		const alreadyFavorited = list.value.find((item) => item.name == id);
		//if the figure is in the favorites collection
		if (!user.current) {
			alert('You must be a user to add favorites!');
		}
		if (figures && alreadyFavorited) {
			//remove it
			await deleteDoc(doc(collection(db, 'users', user.id, 'favorites'), id));
			console.log(alreadyFavorited);
			// alert(`${figures.figure.name} was removed from ${user.userDoc.firstName}'s favorites list.`);
		} else {
			await setDoc(doc(db, 'users', user.id, 'favorites', id), {
				name: id,
			});
			console.log(alreadyFavorited);
			// alert(`${figures.figure.name} was added to ${user.userDoc.firstName}'s favorites list. :)`);
		}
	}

	//Used to change the CSS class of the SVG for favorites.
	const favoriteIcon = ref(false);

	function toggleSVG() {
		favoriteIcon.value = !favoriteIcon.value;
	} //this isn't being used...

	const svgClass = computed(function () {
		if (favoriteIcon.value) {
			return 'favorite-on';
		} else {
			return 'favorite-off';
		}
	});

	return {
		user,
		list,
		toggleFavorite,
	};
});
