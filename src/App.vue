<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	const route = useRoute();

	const ui = useInterfaceStore();
</script>

<template>
	<header v-bind:class="`${route.name} ${ui.menuClass}`">
		<div class="inner-column">
			<!-- 			<pre><code>
		{{ route.name }}</code></pre> -->
			<h1>Funko Pop Store</h1>
			<menu-wrapper>
				<!-- {{ ui.menuClass }} -->
				<nav class="site-menu">
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/about">About</RouterLink>
					<RouterLink to="/contact">Contact</RouterLink>
					<RouterLink to="/figures">Figures</RouterLink>
					<RouterLink to="/create-item">Create Item</RouterLink>
				</nav>
				<button @click="ui.toggleMenu()">Toggle menu</button>
				<RouterLink to="/shopping-cart">
					<picture class="cart"><img src="/images/shopping-cart.jpeg" /></picture
				></RouterLink>
			</menu-wrapper>
		</div>
	</header>

	<main class="outlet">
		<div class="inner-column">
			<RouterView />
		</div>
	</main>

	<footer>
		<div class="inner-column">https://github.com/NedHaskins/funko-vue</div>
	</footer>
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
