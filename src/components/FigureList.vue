<script setup>
	import { useFigureDataStore } from '@/stores/figureData';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

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
				<h3 class="energy-voice">{{ figure.name }}</h3>
				<div>
					<p>{{ figure.price }}</p>
					<button-wrapper>
						<button @click.prevent="addToCart(figure.name, figure.price)">Add to cart</button>
					</button-wrapper>
					<RouterLink v-bind:to="`/figure/${figure.slug}`">More</RouterLink>
				</div>
			</figure-card>
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

	div {
		display: flex;
		justify-content: space-between;
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
