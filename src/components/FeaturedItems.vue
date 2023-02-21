<script setup>
	//Vue imports
	import { onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';

	//Vue components
	import SubcategoryCard from '@/components/SubcategoryCard.vue';
	import FigureList from '@/components/FigureList.vue';
	import FigureCard from '@/components/FigureCard.vue';

	//Firestore / Vuefire imports
	import { useFirestore, useDocument, useCollection } from 'vuefire';
	import { collection, doc, getDoc, query, where } from 'firebase/firestore';

	//Special script imports :)
	import RainbowLetters from '@/scripts/rainbowLetters';

	//Firestore / Vuefire variables
	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures'));

	let figuresFromStore = [];

	let featuredFigures = [];

	figures.value.forEach(function (figure) {
		figuresFromStore.push(figure);
	});

	//this is needed to not permanently change the actual store list, which will affect other components rendering during the session

	function get3Random(items) {
		for (let i = 0; i < 3; i++) {
			let randomIndex = Math.floor(Math.random() * figuresFromStore.length);
			let randomItem = figuresFromStore[randomIndex];
			featuredFigures.push(randomItem);
			figuresFromStore.splice(randomIndex, 1);
			//ensures that the same element won't be selected twice -- and reduces the amount of memory the initial array takes up, as the items are being removed from it
		}
	}
	get3Random(figures.value);

	const container = ref(null);

	const active = ref(true);

	const phrase = 'Featured Items';

	onMounted(function () {
		RainbowLetters(phrase);
	});
</script>

<template>
	<pre v-if="figures">{{ figures }}</pre>
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
