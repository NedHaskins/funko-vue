<!--UI notes for this page:

make an [X} option to the left of each item row to remove it from the list if desired.-->

<script setup>
	import { ref, computed } from 'vue';
	//RouterView's pulled in from somewhere else??

	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';

	// defineProps(['user', 'cart']);

	const cart = useCartService();
</script>

<template>
	<table class="cart">
		<tbody>
			<tr v-for="group in cart.cartGrouping">
				<td class="name">{{ group[0].name }}</td>
				<td class="item-quantity">
					<button id="remove" @click="cart.removeItem(group[0])">-</button>
					<input type="number" :value="group.length" />
					<!--place v-model here-->
					<button id="add" @click="cart.addItem(group[0])">+</button>
				</td>
				<td id="price" class="price">${{ group[0].price * group.length }}</td>
			</tr>
			<tr class="total">
				<td>TOTAL</td>
				<td></td>
				<td>${{ cart.prettyTotal }}</td>
			</tr>
		</tbody>
	</table>

	<cart-bottom>
		<button-wrapper>
			<button type="button" @click="cart.deleteCollection()">Clear cart</button>
		</button-wrapper>

		<button-wrapper>
			<RouterLink @click="cart.toggleCheckout()" to="/shopping-cart/checkout">
				<button type="button">Checkout</button>
			</RouterLink>
		</button-wrapper>
	</cart-bottom>
	<section :class="`${cart.showCheckout}`">
		<RouterView />
	</section>
</template>
<style lang="scss" scoped>
	table {
		font-family: 'Bangers';
		font-size: 19px;
	}

	table,
	tbody {
		width: 100%;
	}

	tr {
		display: flex;
		flex-direction: row;
		margin-top: 15px;

		td {
			display: flex;
			// border: 3px solid lime;
			flex-direction: row;

			input {
				background-color: black;
				border: none;
				color: white;
				font-family: 'Bangers';
				font-size: 19px;
				text-align: center;
				width: 20%;
			}
		}

		.name,
		.price {
			width: 40%;
			align-items: center;
		}

		.item-quantity {
			align-items: center;
			justify-content: space-evenly;
			gap: 10px;
			// width: 30%;

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
		.price {
			justify-content: right;
		}
	}

	.total {
		td {
			padding: 11px 0px 11px 0px;
		}
		td:nth-of-type(1),
		td:nth-of-type(3) {
			width: 35%;
		}

		td:nth-of-type(2) {
			width: 30%;
		}

		td:nth-of-type(3) {
			justify-content: right;
		}
	}

	cart-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: 24px;
	}

	.total {
		display: flex;
		flex-direction: row;
		color: var(--vividMulberry);
	}

	.total > * {
		// border: 2px dashed green;
	}

	.total p {
		padding: 15px;
		text-align: right;
	}

	/*SCAFFOLDING*/
	// .cart-items {
	// 	border: 3px dashed black;
	// 	padding: 3px;

	// 	li {
	// 		border: 3px dashed red;
	// 	}
	// }

	.checkout-open {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		overflow: auto;
		background-color: rgb(100, 100, 100, 0.8);
	}
</style>
