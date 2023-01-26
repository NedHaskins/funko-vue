import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', function () {
	const database = reactive([
		{
			id: 'a1',
			name: 'ned',
			role: 'admin',
			password: 'mango',
		},
		{
			id: 'a2',
			name: 'test',
			role: 'user',
			password: 'carrot',
		},
	]);

	const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || {}); //Can you explain why this is a ref value?

	const isLoggedIn = computed(function () {
		if (currentUser.value) {
			return true;
		} else {
			return false;
		}
	});

	function add(record) {
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
