import { computed } from 'vue';

import { useRouter } from 'vue-router';

import { defineStore } from 'pinia';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { doc, addDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

import { useCurrentUser, useFirestore, useDocument, useCollection } from 'vuefire';
//these are all ref objects

export const useUserService = defineStore('user', function () {
	const auth = getAuth();
	const db = useFirestore();
	const current = useCurrentUser();
	const router = useRouter();

	function clearForm(form) {
		form.email = '';
		form.password = '';
	}

	const docReference = computed(function () {
		if (current.value) {
			// console.log(authUser.value.uid);
			return doc(collection(db, 'users'), current.value.uid);
		} else {
			return false;
		}
	});
	// console.log(docReference);
	const userDoc = useDocument(docReference);
	const role = computed(() => userDoc.value?.role);
	const name = computed(() => userDoc.value?.name);

	function signUp(form) {
		createUserWithEmailAndPassword(auth, form.email, form.password)
			.then((userCredential) => {
				const newUser = userCredential.user;
				console.log('Current user using Vuefire function: ', current.value.uid);
				console.log('New user id: ', newUser.uid);
				setDoc(doc(db, 'users', newUser.uid), {
					firstName: form.firstName,
					lastName: form.lastName,
					email: form.email,
					password: form.password,
					role: 'user',
				});
				alert('New user created.');
			})

			.then((userCredential) => {
				router.push('/home');
				// clearForm(form);
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
				router.push('/home');
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
				//check that the user is disconnected -- and reload corresponding cart data -- or all user data
				router.push('/home');
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
		role,
		auth,
	};
});
