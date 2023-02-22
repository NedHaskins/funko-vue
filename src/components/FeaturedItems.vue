<script setup>
	//NPM packages
	import _ from 'lodash';

	//Animation packages
	import confetti from 'canvas-confetti';

	//Special script imports
	import RainbowLetters from '@/scripts/rainbowLetters';

	//Vue imports
	import { onMounted, ref, computed } from 'vue';
	import { useRoute } from 'vue-router';

	//Vue components
	import SubcategoryCard from '@/components/SubcategoryCard.vue';
	import FigureList from '@/components/FigureList.vue';
	import FigureCard from '@/components/FigureCard.vue';

	//Firestore / Vuefire imports
	import { useFirestore, useDocument, useCollection } from 'vuefire';
	import { collection, doc, getDoc, query, where } from 'firebase/firestore';

	//Firestore / Vuefire variables
	const db = useFirestore();

	//Confetti instructions

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

	//Making a random list for the featured items.
	const originalList = useCollection(collection(db, 'figures'));

	const randomList = computed(function () {
		return _.shuffle(originalList.value).slice(0, 3);
	});

	//An example of a toggle with true/false.
	const active = ref(true);

	//Running the rainbow letters import.
	const container = ref(null);
	const phrase = 'Featured Items';
	onMounted(function () {
		RainbowLetters(phrase);
	});
</script>

<template>
	<section class="featured-items">
		<!-- <pre v-if="figures" style="color: cyan">{{ randomList }}</pre> -->
		<!-- <pre v-if="figures" style="color: blue">{{}}</pre> -->

		<module-header>
			<div id="letters-container" ref="container"></div>
		</module-header>
		<ul :class="{ party: active }">
			<li v-for="item in randomList">
				<FigureCard v-bind:figure="item" />
			</li>
		</ul>

		<!-- <FigureList v-bind:figures="makeRandomList(figures)" /> -->
		<div id="canvas"></div>
	</section>
</template>

<style scoped>
	#canvas {
		display: none;
	}
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
