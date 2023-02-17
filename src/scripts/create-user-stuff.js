async function signUp(email, password) {
	createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			console.log(userCredential.user.uid);
			const newUserId = userCredential.user.uid;

			try {
				await setDoc(doc(db, 'users', newUserId), {
					username: '',
					role: {
						admin: true,
					},
				});
			} catch (error) {
				console.log(error.message);
			}

			console.log('user.signUp');
			clearForm(); //set this up
		})
		.catch((error) => {
			errorMessage.value = error.message;
			console.log('ERROR MESSAGE', error.message);
		});
}
