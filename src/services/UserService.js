import { computed } from 'vue';

import { defineStore } from 'pinia';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { doc, collection, query, where, getDocs } from 'firebase/firestore';

import { useCurrentUser, useFirestore, useDocument, useCollection } from 'vuefire';
//these are all ref objects

function useUser() {
	const db = useFirestore();
	const authUser = useCurrentUser();

	const docReference = computed(function () {
		if (authUser.value) {
			console.log(authUser.value.uid);
			return doc(collection(db, 'users'), authUser.value.uid);
		} else {
			return false;
		}
	});
	console.log(docReference);
	const userDoc = useDocument(docReference);
	const role = computed(() => userDoc.value?.role);
	const name = computed(() => userDoc.value?.name);
	// const isAdmin = computed(function () {
	// 	return userDoc.roles.admin;
	// });

	return { userDoc, name };
}

export const useUserService = defineStore('user', function () {
	const auth = getAuth();

	const current = useCurrentUser();

	function clearForm(form) {
		form.email = '';
		form.password = '';
	}

	const { userDoc, name } = useUser();

	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				console.log('user.signUp');
				clearForm(form);
			})
			.catch((error) => {
				if (error.code === 'auth/weak-password') {
					alert("You'll need at least 6 characters for your password.");
				}
				console.log(error.code, error.message);
			});
	}

	function signIn(form) {
		const { email, password } = form; // you could destructure the object like this too
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log('user.signIn');
				clearForm(form);
			})
			.catch((error) => {
				console.log(error.code, error.message);
			});
	}

	function signOut() {
		fbSignOut(auth)
			.then(() => {
				console.log('user.signOut');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return {
		signUp,
		signIn,
		signOut,
		name,
		current,
		userDoc,
	};
});
