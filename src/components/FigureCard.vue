<script setup>
	import { useShoppingCartStore } from '@/stores/shoppingCart';
	defineProps(['figure']);

	const shoppingCart = useShoppingCartStore();

	function addToCart(name, quantity, price) {
		const newItem = {
			name: name,
			quantity: 1,
			price: price,
		};

		const match = shoppingCart.list.find(function (item) {
			return item.name === newItem.name;
		});

		if (match) {
			match.quantity = match.quantity + newItem.quantity;
		} else {
			shoppingCart.list = [...shoppingCart.list, newItem];
		}

		// shoppingCart.add(record);
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
		<!--link this back to the figure detail-->
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>
			<button-wrapper class="add-to-cart">
				<button @click.prevent="addToCart(figure.name, figure.quantity, figure.price)">Add to cart</button>
			</button-wrapper>
			<div class="more-info">
				<RouterLink :to="`/${figure.category}/${figure.subcategory}/${figure.slug}`">More<br />info</RouterLink>
			</div>
		</card-bottom>
	</figure-card>
</template>

<style scoped>
	picture {
		width: 236px;
		justify-self: center;
		padding: 10px;
	}

	card-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	@media (min-width: 600px) {
		picture {
		}
	}
</style>
