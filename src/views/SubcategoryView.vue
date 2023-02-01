<script setup>
	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';
	import { useCategoriesStore } from '@/stores/categories';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	import FigureList from '@/components/FigureList.vue';
	import FigureCard from '@/components/FigureCard.vue';

	const route = useRoute();

	const categories = useCategoriesStore();
	const figures = useFigureDataStore();
	const shoppingCart = useShoppingCartStore();

	defineProps(['subcategory']);

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

	// const subcategory = categories.list.find(function(record) {
	// 	if(record.slug == route.params.slug)
	// });

	//Return only the figures that match the "subcategory" of the route.params.
	let filteredFigures = [];

	figures.list.forEach(function (figure) {
		if (figure.subcategory == route.params.sub) {
			filteredFigures.push(figure);
		}
	});

	const category = categories.list.find(function (record) {
		return record.slug == route.params.cat;
	});

	const subcategory = category.subcategories.find(function (item) {
		return item.slug == route.params.sub;
	}); // find needs to be used here -- not filter -- as it'll return an array [] otherwise
</script>

<template>
	<!-- 	<code>
		<pre>{{ subcategory }}</pre>
	</code> -->
	<module-header>
		<h2>{{ subcategory.name }}</h2>
		<h3>{{ subcategory.blurb }}</h3>
	</module-header>
	<!-- 	<ul class="figure-list">
		<li v-for="figureCard in filteredFigures">
			<FigureCard v-bind:figure="figureCard" />
		</li>
	</ul> -->

	<FigureList v-bind:figures="filteredFigures" />
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

	li {
		justify-self: center;
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
