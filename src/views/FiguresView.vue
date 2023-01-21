<script setup>
	import FigureList from '@/components/FigureList.vue';
</script>
<template>
	<div class="figures-landing-text">
		<h2>
			Choose a figure for more info. Eventually these will have been filtered down to a specific subset, i.e. Elves.
		</h2>
	</div>
	<FigureList />
</template>

<style>
	.figures-landing-text {
		display: flex;
		justify-content: center;
	}
</style>
