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
				// console.log(user);
				if (user.username === form.username && user.password === form.password) {
					// //setting
					users.currentUser = user;
					users.saveToStorage(user);

					console.log(form.username, form.password, users.isLoggedIn, users.currentUser);
					router.push('/');
				}
			});
		}
	}

	function printTest() {
		console.log(form.username, form.password);
	}
</script>
<template>
	<div class="user-login">
		<form>
			<input-wrapper>
				<label for="user-id">Username</label>
				<input id="user-id" type="text" v-model="form.username" />
			</input-wrapper>

			<input-wrapper>
				<label for="password">Password</label>
				<input id="password" type="text" v-model="form.password" />
			</input-wrapper>
			<button-wrapper>
				<button @click.prevent="checkLogin()">Submit</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style scoped>
	.user-login,
	form,
	input-wrapper {
		border: 1px solid black;
		padding: 5px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input-wrapper,
	button-wrapper {
		display: flex;
		justify-content: center;
		width: 60%;
		gap: 20px;
		font-size: 36px;
	}
</style>
