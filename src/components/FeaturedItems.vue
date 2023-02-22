<script setup>
	// console.clear();
	import _ from 'lodash';

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

	//Special script imports :)
	import RainbowLetters from '@/scripts/rainbowLetters';

	//Firestore / Vuefire variables
	const db = useFirestore();

	// const figuresRef = computed(function () {
	// 	return collection(db, 'figures');
	// });

	const figures = useCollection(collection(db, 'figures')); //WHY DOES THIS WORK

	let figuresCopy = [];

	if (figures) {
		figures.value.forEach(function (figure) {
			figuresCopy.push(figure);
		});
	}

	//It appears that if a foreach method is used to grab data from a reactive object,

	// function get3Random(items) {
	// 	if (items) {
	// 		let randomArray = [];
	// 		for (let i = 0; i < 3; i++) {
	// 			let randomIndex = Math.floor(Math.random() * items.length);
	// 			let randomItem = items[randomIndex];
	// 			randomArray.push(randomItem);
	// 			items.splice(randomIndex, 1);
	// 		}

	// 		return randomArray;
	// 		//ensures that the same element won't be selected twice -- and reduces the amount of memory the initial array takes up, as the items are being removed from it
	// 	}
	// }
	//lodash call to deal with the random card sorting on the home page.

	function makeRandomList(list) {
		let randomArray = [];
		let randomList = _.shuffle(list);
		for (let i = 0; i < 3; i++) {
			randomArray.push(randomList[i]);
		}
		console.log('Random array created.', randomArray);
		return randomArray;
	}

	const randomFigureList = makeRandomList(figures.value);

	const active = ref(true);

	const container = ref(null);
	const phrase = 'Featured Items';
	onMounted(function () {
		RainbowLetters(phrase);
	});
</script>

<template>
	<section class="featured-items">
		<pre v-if="figures" style="color: green">{{ figures }}</pre>
		<pre v-if="figures" style="color: blue">{{ makeRandomList(figures) }}</pre>

		<module-header>
			<div id="letters-container" ref="container"></div>
		</module-header>
		<!-- <ul :class="{ party: active }"> -->
		<!-- 	<li v-for="card in featuredFigures">
				<FigureCard v-bind:figures="randomArray" />
			</li>
 -->
		<FigureList v-bind:figures="figuresCopy" />
		<!-- </ul>  -->
	</section>
</template>

<style scoped>
	.featured-items {
		border: 3px solid red;
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
