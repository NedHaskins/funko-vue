//Pinia
import { defineStore } from 'pinia';

//Vue
import { computed } from 'vue';

//Firebase imports
import { useFirestore, useCollection, useDocument } from 'vuefire';
import { getDocs, collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useUserService } from '@/services/UserService';

//Firebase variables

export const useCartService = defineStore('cart', function () {
	const user = useUserService();
	const db = useFirestore();

	const cartReference = computed(function () {
		if (user.current) {
			return collection(db, 'users', user.current.uid, 'cart');
		} else {
			return false; //this needs to be a "guest" cart object - maybe local storage?
		}
	});

	const list = useCollection(cartReference);

	// await promise;

	// console.log(list.value);

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
		return list.value.reduce((total, item) => Number(item.price) + total, 0);
	});

	const prettyTotal = computed(function () {
		return totalPrice.value.toFixed(2);
	});

	async function addItem(figure) {
		//add a new document to the cart collection.
		//Each figure's data will be in a document.
		//Create a document with figure data (which is already in Firestore)
		//make sure each document has a unique ID (which will be created anyway)

		await addDoc(collection(db, 'users', user.current?.uid, 'cart'), figure);
		console.log('the thrill is pretty awesome');
	}

	async function removeItem(figure) {
		//look up why this needs to be async
		//if number of objects is greater than 0...put a check in....
		const trash = await doc(collection(db, 'users', user.current?.uid, 'cart'), figure.id);
		// console.log('Are you sure?');
		if (confirm('Are you sure?')) {
			await deleteDoc(trash);
			// 	}
		}
	}

	async function deleteCollection() {
		const querySnapshot = await getDocs(collection(db, 'users', user.current?.uid, 'cart'));
		// querySnapshot.forEach(function (doc) {
		// 	// // doc.data() is never undefined for query doc snapshots
		// 	// console.log(doc.id, " => ", doc.data());
		// 	console.log(typeof querySnapshot, doc.id);
		// 	// await deleteDoc(doc(db, 'users', user.current?.uid, 'cart', doc.id))
		// });
		for (let item of querySnapshot.docs) {
			console.log(item);
			await deleteDoc(doc(db, 'users', user.current?.uid, 'cart', item.id));
		}
		// console.log(querySnapshot.docs);
	}

	// 	const collectionRef = collection(db, 'users', user.current?.uid, 'cart');
	// 	console.log(collectionRef);
	// 	const query = collectionRef.orderBy('__name__').limit(batchSize);

	// 	return new Promise((resolve, reject) => {
	// 		deleteQueryBatch(db, query, resolve).catch(reject);
	// 	});
	// }

	// async function deleteQueryBatch(db, query, resolve) {
	// 	const snapshot = await query.get();

	// 	const batchSize = snapshot.size;
	// 	if (batchSize === 0) {
	// 		// When there are no documents left, we are done
	// 		resolve();
	// 		return;
	// 	}

	// 	// Delete documents in a batch
	// 	const batch = db.batch();
	// 	snapshot.docs.forEach((doc) => {
	// 		batch.delete(doc.ref);
	// 	});
	// 	await batch.commit();

	// 	// Recurse on the next process tick, to avoid
	// 	// exploding the stack.
	// 	process.nextTick(() => {
	// 		deleteQueryBatch(db, query, resolve);
	// 	});
	// }

	return {
		user,
		list,
		cartGrouping,
		totalItems,
		totalPrice,
		addItem,
		removeItem,
		deleteCollection,
		// deleteQueryBatch,
		prettyTotal,
	};
});
