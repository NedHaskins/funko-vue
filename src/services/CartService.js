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
		const trash = await doc(collection(db, 'users', user.current.uid, 'cart'), figure.id);
		// console.log('Are you sure?');
		if (confirm('Are you sure?')) {
			await deleteDoc(trash);
			// 	}
		}
	}
	return {
		user,
		list,
		cartGrouping,
		totalItems,
		totalPrice,
		addItem,
		removeItem,
	};
});

const total = computed(function () {
	let total = 0;
	shoppingCart.list.forEach(function (item) {
		total = total + Number(item.price);
	});
	return total;
});

function incrementValue(item) {
	item.quantity++; //needs to reference the variable in the cart
}

function decrementValue(item) {
	if (item.quantity > 0) {
		item.quantity--;
	}
}

const subtotal = computed(function () {
	let sub = 0;
	shoppingCart.list.forEach(function (item) {
		sub += item.price * item.quantity;
	});
	return Number(sub).toFixed(2);
});

function updateCart() {
	//		check each item.quantity input value;  if it's 0, remove it from the list
	for (let i = 0; i < shoppingCart.list.length; i++) {
		if (shoppingCart.list[i].quantity === 0) {
			shoppingCart.list.splice(i, 1);
			i--; //needed to reset the counting position(the object being looked at) to an index of [0]
		}
	}

	// shoppingCart.list.forEach(function (item, index) {
	// 	if (item.quantity === 0) {
	// 		shoppingCart.list.splice(index, 1);
	// 		index--;
	// 	}
	// }); //this doesn't reset the VALUE OF THE INDEX BEING CHECKED to 0
	localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	console.log('Cart was updated in local storage.');
}

function clearCart() {
	shoppingCart.list = [];
	localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	console.log('Cart was cleared.');
}
