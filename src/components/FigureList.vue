<script setup>
	import { useFigureDataStore } from '@/stores/figureData';

	const figures = useFigureDataStore();
</script>
<template>
	<ul v-for="figure in figures.list">
		<li>
			<RouterLink v-bind:to="`/figure/${figure.slug}`">
				<img v-bind:src="figure.image" />
				<figcaption>{{ figure.name }}</figcaption>
			</RouterLink>
		</li>
	</ul>
</template>
