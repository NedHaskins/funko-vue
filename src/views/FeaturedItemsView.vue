<script setup>
	import { useFigureDataStore } from '@/stores/figureData';
	const figures = useFigureDataStore();

	function threeRandomFigures() {
		count = 0;
		var figure = items[Math.floor(Math.random() * items.length)];
	}
</script>
<template>
	<featured-items class="home">
		<!--Collect three random figures from the figure database.-->
	</featured-items>
</template>

<style scoped>
	featured-items {
		display: block;
	}
</style>
