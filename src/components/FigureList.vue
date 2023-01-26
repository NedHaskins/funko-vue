<script setup>
	import { useFigureDataStore } from '@/stores/figureData';

	import FigureCard from '@/components/FigureCard.vue';

	const figures = useFigureDataStore();
</script>
<template>
	<ul class="figure-list">
		<li v-for="card in figures.list">
			<FigureCard v-bind:figure="card" />
		</li>
	</ul>
</template>

<style scoped>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	@media (min-width: 960px) {
		ul {
		}
	}
</style>
