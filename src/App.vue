<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	const route = useRoute();

	const ui = useInterfaceStore();
</script>

<template>
	<header v-bind:class="`${route.name} ${ui.menuClass}`">
		<pre><code>
		{{ route.name }}</code></pre>
		<h1>Funko Pop Store</h1>
		<menu-wrapper
			>{{ ui.menuClass }}
			<nav class="site-menu">
				<RouterLink to="/">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
				<RouterLink to="/contact">Contact</RouterLink>
				<RouterLink to="/figures">Figures</RouterLink>
			</nav>
			<button @click="ui.toggleMenu()">Toggle menu</button>
			<picture class="cart"><img src="../public/images/shopping-cart.jpeg" /></picture>
		</menu-wrapper>
	</header>

	<main class="outlet">
		<RouterView />
	</main>

	<footer>footer</footer>
</template>

<style>
	.site-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.site-menu a {
		padding: 1em;
	}

	.router-link-active {
		font-weight: 700;
		color: green;
	}
</style>
