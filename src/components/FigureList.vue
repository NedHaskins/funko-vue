<script setup>
	import { onMounted } from 'vue';

	import confetti from 'canvas-confetti';

	import FigureCard from '@/components/FigureCard.vue';

	var myCanvas = document.getElementById('canvas');

	var myConfetti = confetti.create(myCanvas, {
		resize: true,
		useWorker: true,
	});

	onMounted(function () {
		// confetti();
		myConfetti({
			particleCount: 500,
			spread: 300,
			// any other options from the global
			// confetti function
		});
	});

	defineProps(['figures']);
</script>
<template>
	<ul class="figure-list">
		<li v-for="card in figures">
			<FigureCard v-bind:figure="card" />
		</li>
	</ul>
	<div id="canvas"></div>
</template>

<style lang="scss" scoped>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);

		li {
			justify-self: center;
		}
	}

	#canvas {
		border: 3px solid lime;
		padding: 50px;
	}
</style>
