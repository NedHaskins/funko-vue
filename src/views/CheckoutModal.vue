<script setup>
	import { RouterLink } from 'vue-router';

	import { useCartService } from '@/services/CartService';

	const cart = useCartService();
</script>

<template>
	<h1>Checkout!</h1>
	<button type="button">
		<RouterLink @click="cart.toggleCheckout()" to="/shopping-cart">Back to checkout</RouterLink>
	</button>
</template>

<style lang="scss" scoped></style>
