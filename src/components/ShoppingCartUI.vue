<script setup>
	import { computed } from 'vue';

	import { useShoppingCartStore } from '@/stores/shoppingCart';

	const shoppingCart = useShoppingCartStore();

	const total = computed(function () {
		let total = 0;
		shoppingCart.list.forEach(function (item) {
			total = total + Number(item.price);
		});
		return total;
	});

	function incrementValue(item) {
		const quantity = item.quantity;
		quantity++;
	}

	function clearCart() {
		shoppingCart.list = [];
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
		console.log('Cart was cleared.');
	}
</script>

<template>
	<inner-column>
		<ul class="cart-items">
			<li v-for="item in shoppingCart.list">
				<div class="name">{{ item.name }}</div>
				<div class="item-quantity">
					<button id="remove">-</button>
					<div>{{ item.quantity }}</div>
					<button id="add" @click="incrementValue(item)">+</button>
				</div>
				<div class="price">${{ item.price }}</div>
			</li>
		</ul>

		<cart-bottom>
			<button-wrapper>
				<button>Update cart</button>
			</button-wrapper>

			<button-wrapper>
				<button @click.prevent="clearCart">Clear cart</button>
			</button-wrapper>
		</cart-bottom>
	</inner-column>
</template>
<style lang="scss" scoped>
	inner-column {
		max-width: 600px;
	}

	.cart-items {
		display: flex;
		flex-direction: column;
		gap: 10px;
		li {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;
			font-family: 'Bangers';
			font-size: 20px;

			.item-quantity {
				font-family: 'Bangers';
				display: flex;
				align-items: center;
				flex-direction: row;
				// border: 3px dashed green;
				gap: 15px;

				button {
					background-color: var(--cherokee);
					padding: 4px 11px;
				}

				button:hover {
					background-color: var(--ink);
					color: var(--cherokee);
				}

				@media (prefers-color-scheme: dark) {
					button {
						border: 3px solid gray;
					}
				}
			}

			.name,
			.price {
				flex: 2;
				text-align: center;
			}
		}
	}

	cart-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: 24px;
	}

	/*SCAFFOLDING*/
	// .cart-items {
	// 	border: 3px dashed black;
	// 	padding: 3px;

	// 	li {
	// 		border: 3px dashed red;
	// 	}
	// }
</style>
