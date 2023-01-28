<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
</script>

<template>
	<RouterView />
	<h1>This is the admin dashboard</h1>

	<RouterLink to="/admin/create-item">Create item</RouterLink>
	<!--View users -- user roles, (dropdown), -->
	<!--Add/remove users-->
	<!--add.remove items/-->
	<!-- <RouterLink to="/create-item">Create Item</RouterLink> -->

	<!-- --->
</template>
