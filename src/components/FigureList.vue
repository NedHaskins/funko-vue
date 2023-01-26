<script setup>
	import { useFigureDataStore } from '@/stores/figureData';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	import FigureCard from '@/components/FigureCard.vue';

	const figures = useFigureDataStore();
	const shoppingCart = useShoppingCartStore();

	//Prepare local storage to be read by the app.

	function addToCart(name, price) {
		const record = {
			name: name,
			price: price,
		};
		shoppingCart.add(record);
		console.log(shoppingCart.list); //check
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	}
</script>
<template>
	<ul class="figure-list">
		<li v-for="blech in figures.list">
			<FigureCard v-bind:figure="blech" />
		</li>
	</ul>
</template>

<style scoped>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	@media (min-width: 960px) {
		ul {
		}
	}
</style>
