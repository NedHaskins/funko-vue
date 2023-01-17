<script setup>
	import { useFigureDataStore } from '@/stores/figureData';

	const figures = useFigureDataStore();
</script>
<template>
	<ul v-for="figure in figures.list">
		<li>
			<a href="#">{{ figure.name }}</a>
			<img v-bind:src="figure.image" />
		</li>
	</ul>
</template>
