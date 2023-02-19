//Pinia
import { defineStore } from 'pinia';

//Vue
import { computed } from 'vue';

//Firebase imports
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useUserService } from '@/services/UserService';

//Firebase variables

export const useCartService = defineStore('cart', function () {
	const user = useUserService();
	const db = useFirestore();
	const categories = useCollection(collection(db, 'categories'));
	const userCollection = useCollection(collection(db, 'users'));
	const figures = useCollection(collection(db, 'figures'));

	const cartReference = computed(function () {
		if (user.current) {
			return collection(db, 'users', user.current.uid, 'cart');
		} else {
			return false; //this needs to be a "guest" cart object - maybe local storage?
		}
	});
	const list = useCollection(cartReference);

	//used to group objects that have the same .name value together in an array
	const cartGrouping = computed(function () {
		return list.value?.reduce(function (group, item) {
			group[item.name] = group[item.name] ?? [];
			group[item.name].push(item);
			return group;
		}, {}); //THE ACCUMULATORRRRRR
	});

	const totalItems = computed(function () {
		return list.value.length;
	});

	const totalPrice = computed(function () {
		return list.value.reduce((total, item) => item.price + total, 0);
	});

	async function addItem(figure) {
		//add a new document to the cart collection.
		//Each figure's data will be in a document.
		//Create a document with figure data (which is already in Firestore)
		//make sure each document has a unique ID (which will be created anyway)

		await addDoc(collection(db, 'users', user.current.uid, 'cart'), figure);
		console.log('the thrill is pretty awesome');
	}

	async function removeItem(figure) {
		//look up why this needs to be async
		//if number of objects is greater than 0...put a check in....
		const trash = await doc(collection(db, 'users', user.current.uid, 'cart'), figure.id);
		// console.log('Are you sure?');
		if (confirm('Are you sure?')) {
			await deleteDoc(trash);
			// 	}
		}
	}

	function clearCart() {
		// console.log(list.value);
		list.value = [];
	}

	return {
		user,
		list,
		cartGrouping,
		totalItems,
		totalPrice,
		addItem,
		removeItem,
		clearCart,
	};
});
