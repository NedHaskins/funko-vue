<script setup>
	import { RouterView } from 'vue-router';

	import SiteHeader from '@/components/SiteHeader.vue';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	import { onMounted, watch } from 'vue';

	const shoppingCart = useShoppingCartStore();

	// onMounted(function () {
	// 	if (localStorage.getItem('shoppingCartData')) {
	// 		shoppingCart.list = JSON.parse(localStorage.getItem('shoppingCartData'));
	// 		console.log(shoppingCart.list);
	// 	}
	// });

	// watch(shoppingCart, function (newState, oldState) {
	// 	if (newState !== oldState) {
	// 		localStorage.setItem('shoppingCartData', JSON.stringify(newState.list));
	// 	}
	// });
</script>

<template>
	<SiteHeader />
	<main class="outlet">
		<div class="inner-column">
			{{ shoppingCart }}
			<RouterView />
		</div>
	</main>

	<footer>
		<div class="inner-column">
			<a href="https://github.com/NedHaskins/funko-vue">Project Github</a>
		</div>
	</footer>
</template>

<style></style>
