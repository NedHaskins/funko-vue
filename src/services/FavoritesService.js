//Pinia
import { defineStore } from 'pinia';

//Vue
import { ref, computed } from 'vue';

//Firebase imports
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { getDocs, collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useUserService } from '@/services/UserService';

export const useFavoritesService = defineStore('favorites', function () {
	const user = useUserService();
	const db = useFirestore();

	const favoritesReference = computed(function () {
		if (user.current) {
			return collection(db, 'users', user.current.uid, 'favorites');
		} else {
			return false; //this needs to be a "guest" cart object - maybe local storage?
		}
	});

	const list = useCollection(favoritesReference);

	const isFavorited = ref(null);

	function favoriteValueCheck() {
		const found = list.value.find((item) => item.name == route.params.figure);
		if (found) {
			isFavorited.value = true;
			console.log(isFavorited.value);
			console.log('True value returned.');
		} else {
			isFavorited.value = false;
			console.log(isFavorited.value);
			console.log('False value returned.');
		}
	}

	// async function FavoriteValueCheck() {
	// 	if (user.current) {
	// 		try {
	// 			if (favorites) {
	// 				let docSnap = await getDoc(doc(db, 'users', user.id, 'favorites', figure.id));
	// 				if (docSnap.exists()) {
	// 					isFavorited.value = true;
	// 					console.log(isFavorited.value);
	// 					console.log('True value returned.');
	// 				} else {
	// 					isFavorited.value = false;
	// 					console.log(isFavorited.value);
	// 					console.log('False value returned.');
	// 				}
	// 			}
	// 		} catch (ex) {
	// 			console.log('There was a problem...');
	// 		}
	// 	}
	// }

	// const favoriteValueCheck = computed( function () {
	// 	if (favorites.value) {
	// 		let docSnap = await getDoc(doc(db, 'users', user.id, 'favorites', figure.id));
	// 		if (docSnap.exists()) {
	// 			isFavorited.value = true;
	// 			console.log(isFavorited.value);
	// 			console.log('True value returned.');
	// 		} else {
	// 			isFavorited.value = false;
	// 			console.log(isFavorited.value);
	// 			console.log('False value returned.');
	// 		}
	// 	}
	// 	return isFavorited.value;
	// })
	// }

	async function toggleFavorite(figure) {
		isFavorited.value = !isFavorited.value;
		console.log(isFavorited.value);
		if (isFavorited.value === true) {
			//if there's no favorites yet...create one
			await setDoc(doc(db, 'users', user.current?.uid, 'favorites', figure.id), {
				name: figure.id,
			});
			alert(`${figure.name} was added to ${user.userDoc.firstName}'s favorites list. :)`);
		} else {
			//Only the ID is needed here, because it serves as a reference to the object -- unlike the above, you're not adding an object.
			await deleteDoc(doc(collection(db, 'users', user.current?.uid, 'favorites'), figure.id)),
				alert(`${figure.name} was removed from ${user.userDoc.firstName}'s favorites list.`);
		}
		console.log('Value changed.');
	}

	//Used to change the CSS class of the SVG for favorites.
	const favoriteIcon = ref(false);
	function toggleSVG() {
		favoriteIcon.value = !favoriteIcon.value;
	}
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
		favoriteValueCheck,
	};
});
