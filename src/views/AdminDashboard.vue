<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
</script>

<template>
	<!-- <div v-if="userService.role === 'admin'"> -->
	<h1>Admin Dashboard</h1>
	<!-- </div> -->

	<!-- <div v-if="userService.role === 'user'"> -->
	<h1>User Dashboard</h1>
	<!-- </div> -->

	<RouterView />

	<RouterLink to="/admin/user-profile">View / edit profile</RouterLink>

	<!--//for admins-->

	<RouterLink to="/admin/create-item">Create item</RouterLink>

	<p>Create / edit user</p>
	<!-- <RouterLink to="/create-item">Create Item</RouterLink> -->

	<!-- --->
</template>
