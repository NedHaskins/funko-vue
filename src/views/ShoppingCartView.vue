<script setup>
	import { reactive, computed } from 'vue';
	import { useShoppingCartStore } from '@/stores/shoppingCart';
	// import ItemRow from './ItemRow.vue';

	const shoppingCart = useShoppingCartStore();

	const total = computed(function () {
		let total = 0;
		shoppingCart.list.forEach(function (item) {
			total = total + Number(item.price);
		});
		return total;
	});

	// function setUpCart() {
	// 	const data = JSON.parse(localStorage.getItem('shoppingCartData')) || [];

	// 	data.forEach((shoppingCartData) => {
	// 		shoppingCart.list = [...shoppingCart.list, shoppingCartData];
	// 	});

	// 	console.log(shoppingCart.list);
	// }

	//find a way to view cart contents

	function clearCart() {
		shoppingCart.list = [];
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
		console.log('Cart was cleared.');
	}
</script>

<template>
	<inner-column>
		<h1>shopping cart</h1>

		<div class="overflow-wrapper">
			<table class="item-list">
				<tbody>
					<tr v-for="item in shoppingCart.list">
						<td>{{ item.name }}</td>
						<td>{{ item.price }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<table class="item-total">
			<tbody>
				<tr>
					<td>Total</td>
					<td class="cost total">${{ total }}</td>
				</tr>
			</tbody>
		</table>
		<button-wrapper>
			<button @click.prevent="clearCart">Clear cart</button>
		</button-wrapper>
	</inner-column>
</template>

<style></style>
