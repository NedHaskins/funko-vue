import { defineStore } from 'pinia';

import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut as fbSignOut,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { useCurrentUser } from 'vuefire';

export const useUserService = defineStore('user', function () {
	const auth = getAuth();

	const current = useCurrentUser();

	function clearForm(form) {
		form.email = '';
		form.password = '';
	}

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
		current,
	};
});
