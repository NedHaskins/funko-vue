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
		return (price * quantity).toFixed(2);
	}

	const subtotal = computed(function () {
		let sub = 0;
		shoppingCart.list.forEach(function (item) {
			sub += item.price * item.quantity;
		});
		return sub.toFixed(2);
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
		<ul class="cart-items">
			<li v-for="item in shoppingCart.list">
				<div class="name">{{ item.name }}</div>
				<div class="item-quantity">
					<button id="remove" @click="decrementValue(item)">-</button>
					<div>{{ item.quantity }}</div>
					<button id="add" @click="incrementValue(item)">+</button>
				</div>
				<div id="price" class="price">${{ item.price * item.quantity }}</div>
			</li>
			<li class="total">
				<div></div>
				<div></div>
				<div>${{ subtotal }}</div>
			</li>
		</ul>

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

	.total {
		display: flex;
		flex-direction: row;
	}

	.total > * {
		border: 2px dashed green;
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
