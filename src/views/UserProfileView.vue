<script setup>
	import { ref, reactive } from 'vue';
	// import { updateDoc } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();

	const form = reactive({
		name: user?.name,
		role: user?.role,
	});

	// watch(user, function(a,b) {
	// 	form.firstName = user.info.firstName;
	// })
</script>

<template>
	<!-- <form v-if="editingUserName"></form> -->

	<div class="profile-info">
		<h2 class="loud-voice">Profile Info</h2>
		<form @submit-prevent="user.updateProfile(form)">
			<input-wrapper>
				<label>First Name</label>
				<input type="text" v-model="form.name" />
			</input-wrapper>
			<input-wrapper>
				<label>Role</label>
				<input type="text" v-model="form.role" />
			</input-wrapper>
		</form>
	</div>
</template>

<style lang="scss" scoped>
	.profile-info {
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
		margin: 60px auto 0px auto;
		width: 80%;
	}

	@media (prefers-color-scheme: dark) {
		.profile-info {
			background-color: var(--ink);
			border: 2px solid var(--paper);
			box-shadow: 10px 10px var(--paper);
		}
	}

	form {
		// border: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label,
	input {
		font-family: 'Bangers';
		font-size: calc(20px + 1vw);
	}

	input-wrapper,
	button-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		// width: 90%;
		gap: 35px;
		font-size: 24px;
		margin-top: 30px;
	}

	@media (max-width: 539px) {
		input-wrapper {
			margin-top: 0px;
			flex-direction: column;
			gap: 5px;

			label {
				margin-top: 30px;
				vertical-align: middle;
			}

			input {
				margin-top: 10px;
				font-size: 5vw;
			}
		}
	}
</style>
