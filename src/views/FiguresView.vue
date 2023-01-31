<script setup>
	import FigureList from '@/components/FigureList.vue';

	import { useFigureDataStore } from '@/stores/figureData';

	const figures = useFigureDataStore();
</script>
<template>
	<module-header>
		<h2>Choose a figure from the list below!</h2>
		<h3>To filter figures down by category, click on the "Categories" link above.</h3>
	</module-header>
	<FigureList v-bind:figures="figures.list" />
</template>

<style scoped></style>
