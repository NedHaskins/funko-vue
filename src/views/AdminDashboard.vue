<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
</script>

<template>
	<!-- <div v-if="userService.role === 'admin'"> -->
	<h1>Admin Dashboard</h1>
	<!-- </div> -->

	<RouterLink to="/admin/user-profile">Create / view / edit profile</RouterLink>
	<!-- <RouterLink to="/admin/create-user">Create user</RouterLink> -->
	<RouterLink to="/admin/create-item">Create item</RouterLink>
	<RouterLink to="/admin/create-category">Create category</RouterLink>
	<RouterLink to="/admin/create-subcategory">Create subcategory</RouterLink>

	<RouterView />
</template>
