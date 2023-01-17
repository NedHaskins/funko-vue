<script setup>
	import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<!-- <header v-bind:class="route:name"> -->
	<h1>Funko Pop Store</h1>
	<nav class="site-menu">
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
		<RouterLink to="/contact">Contact</RouterLink>
		<RouterLink to="/figures">Figures</RouterLink>
	</nav>
	<!-- </header> -->

	<main class="outlet">
		<RouterView />
	</main>
</template>

<style>
	.router-link-active {
		font-weight: 700;
		color: green;
	}
</style>
