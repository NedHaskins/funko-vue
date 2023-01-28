<script setup>
	import { useShoppingCartStore } from '@/stores/shoppingCart';
	defineProps(['figure']);

	const shoppingCart = useShoppingCartStore();

	function addToCart(name, quantity, price) {
		const record = {
			name: name,
			quantity: 1,
			price: price,
		};
		shoppingCart.add(record);
		console.log(shoppingCart.list); //check
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	}
</script>
<template>
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
				<button @click.prevent="addToCart(figure.name, figure.quantity, figure.price)">Add to cart</button>
			</button-wrapper>
			<div class="more-info">
				<RouterLink v-bind:to="`/figure/${figure.slug}`">More<br />info</RouterLink>
			</div>
		</div>
	</figure-card>
</template>

<style scoped>
	picture {
		width: 236px;
		justify-self: center;
		padding: 10px;
	}

	@media (min-width: 600px) {
		picture {
		}
	}
</style>
