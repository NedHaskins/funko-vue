<script setup>
	import { reactive } from 'vue';
	import { useUserDataStore } from '@/stores/userData';

	const users = useUserDataStore();

	const form = reactive({
		username: '',
		password: '',
	});

	function checkLogin() {
		if (form.username && form.password) {
			users.database.forEach(function (user) {
				if (user.username === form.username && user.password === form.password) {
					users.isLoggedIn = true;
					users.currentUser = user;
					users.saveToStorage(user);
					// router.push('/');
				}
			});
		}
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
				<label for="password">price</label>
				<input id="password" type="text" v-model="form.password" />
			</input-wrapper>
			<button-wrapper>
				<button @click.prevent="save">Add to cart</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style scoped></style>
