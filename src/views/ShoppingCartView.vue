<script setup>
	import { computed } from 'vue';

	import { collection } from 'firebase/firestore';
	import { useFirestore, useCollection } from 'vuefire';
	import { useUserService } from '@/services/UserService';
	import ShoppingCartUI from '@/components/ShoppingCartUI.vue';

	const db = useFirestore();
	const user = useUserService();
</script>

<template>
	<section class="shopping-cart-view">
		<module-header>
			<h2 v-if="user.current">{{ user.name }}'s Shopping Cart</h2>
		</module-header>
		<ShoppingCartUI />
	</section>
</template>

<style lang="scss" scoped>
	.shopping-cart-view {
		// border: 3px solid lime;
	}
	h1 {
		font-family: 'Bangers';
	}
</style>
