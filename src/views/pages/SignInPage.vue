<script setup>
	import { reactive } from 'vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();

	const form = reactive({
		email: '',
		password: '',
	});
</script>

<template>
	<button type="button" @click="user.signOut()" v-if="user.current">signout</button>

	<div v-if="user.current">Signed in as: {{ user.current.email }}</div>

	<form @submit.prevent="user.signUp(form)" v-if="!user.current">
		<h2 class="attention-voice">Sign up!!!</h2>

		<form-field>
			<label for="email1">email</label>
			<input id="email1" type="text" v-model="form.email" />
		</form-field>

		<form-field>
			<label for="password1">password</label>
			<input id="password1" type="text" v-model="form.password" />
		</form-field>

		<button type="submit">Sign up</button>
	</form>

	<form @submit.prevent="user.signIn(form)" v-if="!user.current">
		<h2 class="attention-voice">Login</h2>

		<form-field>
			<label for="email2">email</label>
			<input id="email2" type="text" v-model="form.email" />
		</form-field>

		<form-field>
			<label for="password2">password</label>
			<input id="password2" type="text" v-model="form.password" />
		</form-field>

		<button type="submit">Login</button>
	</form>
</template>
