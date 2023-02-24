<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
</script>

<template>
	<!-- <div v-if="userService.role === 'admin'"> -->
	<h1>Admin Dashboard</h1>
	<!-- </div> -->

	<RouterLink to="/inventory">Inventory UI</RouterLink>

	<RouterLink to="/admin/user-profile">View / edit profile</RouterLink>

	<RouterView />
</template>
