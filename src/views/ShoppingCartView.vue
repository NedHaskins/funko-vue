<script setup>
	// import ShoppingCartUI from '@/components/ShoppingCartUI.vue';
	import FirestoreShoppingCartUI from '@/components/FirestoreShoppingCartUI.vue';
	import { useUserService } from '@/services/UserService';

	const user = useUserService();
</script>

<template>
	<section class="shopping-cart-view">
		<module-header>
			<h2 v-if="user.current">{{ user.name }}'s Shopping Cart</h2>
		</module-header>
		<!-- <ShoppingCartUI /> -->
		<FirestoreShoppingCartUI v-bind:user="user" />
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
