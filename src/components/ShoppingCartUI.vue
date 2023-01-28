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
				<div>{{ item.name }}</div>
				<div class="item-quantity">
					<button id="remove">-</button>
					<div>{{ item.quantity }}</div>
					<button id="add" @click="incrementValue(item)">+</button>
				</div>
				<div>${{ item.price }}</div>
			</li>
		</ul>

		<button-wrapper>
			<button>Update cart</button>
		</button-wrapper>

		<button-wrapper>
			<button @click.prevent="clearCart">Clear cart</button>
		</button-wrapper>
	</inner-column>
</template>
<style lang="scss" scoped>
	inner-column {
		max-width: 600px;
	}

	.cart-items {
		li {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
		}
	}

	.item-quantity {
		display: flex;
		flex-direction: row;
	}

	/*SCAFFOLDING*/
	.cart-items {
		border: 3px dashed black;
		padding: 3px;

		li {
			border: 3px dashed red;
		}
	}
</style>
