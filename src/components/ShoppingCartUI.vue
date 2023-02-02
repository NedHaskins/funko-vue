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
		item.quantity++; //needs to reference the variable in the cart
	}

	function decrementValue(item) {
		item.quantity--;
	}

	//quantity <----> price

	function totalItemPrice(price, quantity) {
		return Number(price * quantity).toFixed(2);
	}

	const subtotal = computed(function () {
		let sub = 0;
		shoppingCart.list.forEach(function (item) {
			sub += item.price * item.quantity;
		});
		return Number(sub.toFixed(2));
	});

	function cartTotal() {
		//for each cost in each list item, push the cost to a new array, then sum them all
	}

	function clearCart() {
		shoppingCart.list = [];
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
		console.log('Cart was cleared.');
	}

	function searchCart(newItem) {
		return items.value.find(function (itemInCart) {
			return newItem.id == itemInCart.id;
		});
	}

	function add(item, quantity) {
		const newItem = { ...item }; //creating a cuplicate item from the cart store, with perhaps additional params

		const newQty = Number(qty);
		newItem.quantity = newQty;

		const found = searchCart(newItem);

		if (found) {
			console.log('Item was found in the list');
			found.quantity = newQty;
		} else {
			console.log('Item was not found in list');
			items.value.push(newItem);
		}
	}
</script>

<template>
	<inner-column>
		<table class="cart">
			<tbody>
				<tr v-for="item in shoppingCart.list">
					<td class="name">{{ item.name }}</td>
					<td class="item-quantity">
						<button id="remove" @click="decrementValue(item)">-</button>
						<div>{{ item.quantity }}</div>
						<button id="add" @click="incrementValue(item)">+</button>
					</td>
					<td id="price" class="price">${{ totalItemPrice(item.price, item.quantity) }}</td>
				</tr>
				<tr class="total">
					<td>TOTAL</td>
					<td></td>
					<td>${{ subtotal }}</td>
				</tr>
			</tbody>
		</table>

		<cart-bottom>
			<button-wrapper>
				<button>Update cart</button>
			</button-wrapper>

			<button-wrapper>
				<button @click.prevent="clearCart">Clear cart</button>
			</button-wrapper>

			<button-wrapper>
				<button>Place order</button>
			</button-wrapper>
		</cart-bottom>
	</inner-column>
</template>
<style lang="scss" scoped>
	inner-column {
		max-width: 600px;
		// border: 3px dashed cyan;
	}

	table {
		font-family: 'Bangers';
		font-size: 19px;
	}

	table,
	tbody,
	tr,
	td {
		// border: 3px dashed green;
		// padding: 10px;
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
			flex-direction: row;
		}

		.name,
		.price {
			width: 35%;
			align-items: center;
		}

		.item-quantity {
			align-items: center;
			justify-content: space-evenly;
			gap: 10px;
			width: 30%;

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
</style>
