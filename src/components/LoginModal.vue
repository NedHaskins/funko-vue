<script setup>
	import { reactive } from 'vue';
	import { useUserDataStore } from '@/stores/userData';
	import { useRouter } from 'vue-router';

	const users = useUserDataStore();

	const router = useRouter();

	const form = reactive({
		username: '',
		password: '',
	});

	function checkLogin() {
		if (form.username && form.password) {
			users.database.forEach(function (user) {
				if (user.username == form.username && user.password == form.password) {
					users.isLoggedIn = true;
					users.currentUser = user;
					users.saveToStorage(user);
					router.push('/');
				}
			});
		}
	}
</script>
<template>
	<div class="user-login">
		<form @submit.prevent="checkLogin">
			<input-wrapper>
				<label for="user-id">Username</label>
				<input id="user-id" type="text" v-model="form.username" />
			</input-wrapper>

			<input-wrapper>
				<label for="password">Password</label>
				<input id="password" type="text" v-model="form.password" />
			</input-wrapper>
			<button-wrapper>
				<button>Submit</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style scoped></style>
