<script setup>
	import { ref, reactive } from 'vue';
	// import { updateDoc } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	const user = userService();

	const form = reactive({
		name: user?.info.firstName,
	});

	// watch(user, function(a,b) {
	// 	form.firstName = user.info.firstName;
	// })
</script>

<template>
	<h1 class="loud-voice">Your Profile Info</h1>

	<p>{{ user.name }}</p>
	<p>{{ user.uniqueID }}</p>

	<p>INFO: {}</p>

	<form @submit-prevent="user.updateProfile(form)">
		<div class="field">
			<label>First Name</label>
			<input type="text" v-model="form.firstName" />
			<label>Last Name</label>
			<input type="text" v-model="form.lastName" />
			<label>Email</label>
			<input type="text" v-model="form.email" />
		</div>
	</form>
</template>

<form v-if="editingUserName"></form>
