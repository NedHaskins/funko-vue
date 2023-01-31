<script setup>
	import { useFigureDataStore } from '@/stores/figureData';

	import RainbowLetters from '@/scripts/rainbowLetters';

	import FigureCard from '@/components/FigureCard.vue';
	import { onMounted, ref } from 'vue';
	const figures = useFigureDataStore();

	//Phase 1:  Write out code that will pair up each letter in an array with a color in the colors array.

	let figuresFromStore = [];

	let featuredFigures = [];

	figures.list.forEach(function (figure) {
		figuresFromStore.push(figure);
	});
	//this is needed to not permanently change the actual store list, which will affect other components rendering during the session

	function get3Random(items) {
		for (let i = 0; i < 3; i++) {
			let randomIndex = Math.floor(Math.random() * figuresFromStore.length);
			let randomItem = figuresFromStore[randomIndex];
			featuredFigures.push(randomItem);
			figuresFromStore.splice(randomIndex, 1); //ensures that the same element won't be selected twice -- and reduces the amount of memory the initial array takes up, as the items are being removed from it
		}
	}
	get3Random(figures);

	const container = ref(null);

	const active = ref(true);

	const phrase = 'Featured Items';

	onMounted(function () {
		RainbowLetters(phrase);
	});

	// :to="{ name: routeName: params: { item: item }"
</script>

<template>
	<module-header>
		<div id="letters-container" ref="container"></div>
	</module-header>
	<ul class="featured-items" :class="{ party: active }">
		<li v-for="card in featuredFigures">
			<FigureCard v-bind:figure="card" />
		</li>
	</ul>
</template>

<style scoped>
	picture {
		width: 236px;
		padding: 10px;
	}
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	li {
		justify-self: center;
	}

	@media (min-width: 960px) {
		ul {
		}
	}
</style>
