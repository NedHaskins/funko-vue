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
	<div class="user-signup">
		<form @submit.prevent="user.signUp(form)" v-if="!user.current">
			<h2 class="attention-voice">Sign up</h2>
			<input-wrapper>
				<label for="email1">email</label>
				<input id="email1" type="text" v-model="form.email" />
			</input-wrapper>

			<input-wrapper>
				<label for="password1">password</label>
				<input id="password1" type="text" v-model="form.password" />
			</input-wrapper>
			<button-wrapper>
				<button type="submit">Sign up</button>
			</button-wrapper>
		</form>
	</div>

	<div class="user-login">
		<form @submit.prevent="user.signIn(form)" v-if="!user.current">
			<h2 class="attention-voice">Login</h2>

			<input-wrapper>
				<label for="email2">email</label>
				<input id="email2" type="text" v-model="form.email" />
			</input-wrapper>

			<input-wrapper>
				<label for="password2">password</label>
				<input id="password2" type="text" v-model="form.password" />
			</input-wrapper>

			<button-wrapper>
				<button type="submit">Log in</button>
			</button-wrapper>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.user-signup,
	.user-login {
		border: 2px solid var(--ink);
		box-shadow: 10px 10px var(--ink);
		background-color: var(--x11gray);
		display: flex;
		flex-direction: column;
		text-align: center;
		align-items: center;
		justify-content: center;
		margin-top: 60px;
		padding: 30px 0px 30px 0px;
		// margin: 60px auto 0px auto;
		// width: 80%;
	}

	@media (prefers-color-scheme: dark) {
		.user-signup,
		.user-login {
			background-color: var(--ink);
			border: 2px solid var(--paper);
			box-shadow: 10px 10px var(--paper);
		}
	}
	form {
		width: 70%;
	}

	input-wrapper,
	button-wrapper {
		display: flex;

		justify-content: center;
		margin-top: 40px;
	}

	button-wrapper {
		flex-direction: row;
	}
	input-wrapper {
		flex-direction: column;
		label {
			text-align: left;
			font-size: calc(20px + 1vw);
		}

		input {
			margin-top: 10px;
			font-size: 3vh;
		}
	}

	@media (min-width: 540px) {
		form {
			// border: 1px solid black;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		label,
		input {
			font-family: 'Courier';

			text-align: left;
		}

		input-wrapper,
		button-wrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			justify-content: center;

			gap: 35px;
			font-size: 24px;
		}
	}
</style>
