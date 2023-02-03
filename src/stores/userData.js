import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('users', function () {
	const database = reactive([
		{
			id: 'a1',
			username: 'ned',
			role: 'admin',
			password: 'mango',
		},
		{
			id: 'a2',
			username: 'test',
			role: 'user',
			password: 'carrot',
		},
	]);

	const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || false); //Can you explain why this is a ref value?

	const isLoggedIn = computed(function () {
		if (currentUser.value) {
			return true;
		} else {
			return false;
		}
	});

	//maybe make a computed property for admin check

	function add(record) {
		//for future adding of users
		database.push(record);
	}

	function saveToStorage(user) {
		localStorage.setItem('currentUser', JSON.stringify(user, null, 2));
	}

	return {
		database,
		add,
		saveToStorage,
		isLoggedIn,
		currentUser,
	};
});
