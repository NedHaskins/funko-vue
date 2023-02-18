<script setup>
	import { computed } from 'vue';

	import { collection } from 'firebase/firestore';
	import { useFirestore, useCollection } from 'vuefire';

	// import ShoppingCartUI from '@/components/ShoppingCartUI.vue';
	import ShoppingCartUI from '@/components/ShoppingCartUI.vue';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';

	const db = useFirestore();
	const user = useUserService();

	const cart = useCartService();
</script>

<template>
	<section class="shopping-cart-view">
		<module-header>
			<h2 v-if="user.current">{{ user.name }}'s Shopping Cart</h2>
		</module-header>
		<ShoppingCartUI v-bind:user="user" v-bind:cart="cart" />
	</section>
</template>

<style lang="scss" scoped>
	.shopping-cart-view {
		border: 3px solid lime;
	}
	h1 {
		font-family: 'Bangers';
	}
</style>
