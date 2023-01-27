<script setup>
	import FigureList from '@/components/FigureList.vue';
</script>
<template>
	<div class="figures-landing-text">
		<!--idea for this text:  animate it to alternate between colors for every other letter-->
		<h2>Choose a figure from the list below!</h2>
	</div>
	<FigureList />
</template>

<style>
	.figures-landing-text {
		display: flex;
		justify-content: center;
		font-family: 'Bangers';
	}
</style>
