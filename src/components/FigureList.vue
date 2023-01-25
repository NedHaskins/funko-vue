<script setup>
	import { useFigureDataStore } from '@/stores/figureData';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	// import FigureCard from '@/components/FigureCard.vue';

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
		<li v-for="figure in figures.list">
			<figure-card>
				<picture>
					<img v-bind:src="figure.image" />
				</picture>
				<h3>{{ figure.name }}</h3>
				<div class="card-bottom">
					<div class="price-wrapper">
						<p>${{ figure.price }}</p>
					</div>
					<button-wrapper class="add-to-cart">
						<button @click.prevent="addToCart(figure.name, figure.price)">Add to cart</button>
					</button-wrapper>
					<div class="more-info">
						<RouterLink v-bind:to="`/figure/${figure.slug}`">More info</RouterLink>
					</div>
				</div>
			</figure-card>
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
