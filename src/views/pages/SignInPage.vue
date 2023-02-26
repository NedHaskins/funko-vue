<script setup>
	import { reactive } from 'vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();

	const logInForm = reactive({
		email: '',
		password: '',
	});

	const signUpForm = reactive({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
</script>

<template>
	<div v-if="user.current">Signed in as: {{ user.current.email }}</div>
	<button type="button" @click="user.signOut()" v-if="user.current">signout</button>

	<forms-outerbox>
		<div class="user-login">
			<form @submit.prevent="user.signIn(logInForm)" v-if="!user.current">
				<h2 class="attention-voice">Login</h2>

				<input-wrapper>
					<label for="email2">email</label>
					<input id="email2" type="text" v-model="logInForm.email" />
				</input-wrapper>

				<input-wrapper>
					<label for="password2">password</label>
					<input id="password2" type="text" v-model="logInForm.password" />
				</input-wrapper>

				<button-wrapper>
					<button type="submit">Log in</button>
				</button-wrapper>
			</form>
		</div>
		<div class="user-signup">
			<form @submit.prevent="user.signUp(signUpForm)" v-if="!user.current">
				<h2 class="attention-voice">Sign up</h2>

				<input-wrapper>
					<label for="first-name">first name</label>
					<input id="first-name" type="text" v-model="signUpForm.firstName" />
				</input-wrapper>

				<input-wrapper>
					<label for="last-name">last name</label>
					<input id="last-name" type="text" v-model="signUpForm.lastName" />
				</input-wrapper>

				<input-wrapper>
					<label for="email1">email</label>
					<input id="email1" type="text" v-model="signUpForm.email" />
				</input-wrapper>

				<input-wrapper>
					<label for="password1">password</label>
					<input id="password1" type="text" v-model="signUpForm.password" />
				</input-wrapper>
				<button-wrapper>
					<button type="submit">Sign up</button>
				</button-wrapper>
			</form>
		</div>
	</forms-outerbox>
</template>

<style lang="scss" scoped>
	forms-outerbox {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		align-items: center;
		gap: 50px;
	}

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
		padding: 30px 0px 30px 0px;
		// max-width: 630px;
		// margin: 60px auto 0px auto;
		width: 80%;
	}

	.user-signup,
	.user-login {
		justify-content: center;
	}

	// .user-login {
	// 	justify-content: space-between;
	// }

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
		margin-top: 30px;
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
		forms-outerbox {
			flex-direction: row;
			justify-content: space-evenly;
		}

		.user-signup,
		.user-login {
			padding: 26px;
		}

		.user-login {
			align-self: start;
		}

		form {
			width: 100%;
		}

		button-wrapper {
			margin-top: 19px;
		}

		input-wrapper {
			margin-top: 9px;
			label,
			input {
				font-size: 19px;
			}
		}
	}
</style>
