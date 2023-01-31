<script setup>
	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';

	const route = useRoute();
	const figures = useFigureDataStore();

	const figure = figures.list.find(function (record) {
		return record.slug == route.params.figure;
	});
</script>
<template>
	<section class="figure-info">
		<picture> <img v-bind:src="figure.image" /></picture>
		<h1>{{ figure.name }}</h1>
		<p>{{ figure.description }}</p>
	</section>
</template>

<style>
	.figure-info {
		border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.figure-info > * {
		margin: var(--standardMargin) 0 var(--standardMargin) 0;
	}

	.figure-info picture {
		border: 2px solid black;
	}
</style>
