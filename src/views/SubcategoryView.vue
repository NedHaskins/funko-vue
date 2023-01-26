<script setup>
	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	import FigureCard from '@/components/FigureCard.vue';

	const route = useRoute();
	const figures = useFigureDataStore();
	const shoppingCart = useShoppingCartStore();

	//Prepare local storage to be read by the app.
	// function setUpCart() {
	// 	const data = JSON.parse(localStorage.getItem('shoppingCartData')) || [];

	// 	data.forEach((shoppingCartData) => {
	// 		shoppingCart.list = [...shoppingCart.list, shoppingCartData];
	// 	});

	// 	console.log(shoppingCart.list);
	// }

	function addToCart(name, price) {
		const record = {
			name: name,
			price: price,
		};
		shoppingCart.add(record);
		console.log(shoppingCart.list); //check
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	}

	// setUpCart();

	//Return only the figures that match the "subcategory" of the route.params.
	let filteredFigures = [];

	figures.list.forEach(function (figure) {
		if (figure.subcategory == route.params.slug) {
			filteredFigures.push(figure);
		}
	});

	console.log(filteredFigures);
</script>

<template>
	<ul class="figure-list">
		<li v-for="figureCard in filteredFigures">
			<FigureCard v-bind:figure="figureCard" />
		</li>
	</ul>
</template>

<style scoped>
	figure-card {
		display: grid;

		gap: var(--scaffoldPadding);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	h3 {
		text-align: center;
	}

	@media (min-width: 960px) {
		ul {
		}
	}

	figcaption {
		text-align: center;
		margin-top: 8px;
	}
</style>
