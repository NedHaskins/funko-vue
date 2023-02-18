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

	function addItem(name, quantity, price) {
		const newItem = {
			name: name,
			quantity: quantity,
			price: price,
		};

		const match = cart.find(function (item) {
			return item.name === newItem.name;
		});

		if (match) {
			match.quantity = match.quantity + newItem.quantity;
		} else {
			cart = [...cart, newItem];
		}

		// shoppingCart.add(record);
		console.log(cart); //check
		localStorage.setItem('shoppingCartData', JSON.stringify(cart));
	}

	return {
		user,
		list,
		cartGrouping,
		totalItems,
		totalPrice,
		addItem,
	};
});
