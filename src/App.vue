<script setup>
	import { RouterView } from 'vue-router';

	import SiteHeader from '@/components/SiteHeader.vue';
</script>

<template>
	<SiteHeader />
	<main class="outlet">
		<div class="inner-column">
			<RouterView />
		</div>
	</main>

	<footer>
		<div class="inner-column">
			<a href="https://github.com/NedHaskins/funko-vue">Project Github</a>
		</div>
	</footer>
</template>

<style></style>
