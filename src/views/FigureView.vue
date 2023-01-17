<script setup>
	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';

	const route = useRoute();
	const figures = useFigureDataStore();

	const figure = figures.list.find(function (record) {
		return record.slug == route.params.slug;
	});
</script>
<template>
	<h1>{{ figure.name }}</h1>
</template>
