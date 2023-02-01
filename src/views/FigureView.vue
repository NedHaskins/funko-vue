<script setup>
	import { useRoute } from 'vue-router';
	import { useFigureDataStore } from '@/stores/figureData';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	const route = useRoute();
	const figures = useFigureDataStore();
	const shoppingCart = useShoppingCartStore();

	const figure = figures.list.find(function (record) {
		return record.slug == route.params.figure;
	});

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
	<figure-info>
		<picture> <img v-bind:src="figure.image" /></picture>
		<text-block>
			<h1>{{ figure.name }}</h1>
			<p>{{ figure.description }}</p>
		</text-block>
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>
			<button-wrapper class="add-to-cart">
				<button @click.prevent="addToCart(figure.name, figure.quantity, figure.price)">Add to cart</button>
			</button-wrapper>
		</card-bottom>
	</figure-info>
</template>

<style lang="scss" scoped>
	figure-info {
		margin-top: 20px;
		// border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		text-block {
			display: block;
			margin-top: 25px;
			max-width: 60%;
			text-align: center;
			h1 {
				font-family: 'Bangers';
			}
			p {
				font-family: 'Fredoka One';
				font-weight: normal;
				margin-top: 15px;
			}
		}

		card-bottom {
			margin-top: 27px;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			gap: 30px;

			p,
			button {
				font-size: 27px;
			}
		}

		picture {
			border: 4px solid var(--ink);
			padding: 15px;
			width: 300px;
		}
	}
</style>
