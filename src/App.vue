<script setup>
	import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
	<header>
		<h1>Lord of the Rings Gateway</h1>
	</header>

	<nav class="site-menu">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About this Project</a></li>
			<li><a href="/tolkien">J.R.R. Tolkien</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</nav>

	<ul class="subpage-links">
		<li>
			<RouterLink to="/characters">Characters</RouterLink>
		</li>
		<li>
			<RouterLink to="/places">Places</RouterLink>
		</li>
		<li>
			<RouterLink to="/artifacts">Artifacts</RouterLink>
		</li>
	</ul>

	<RouterView />
</template>
