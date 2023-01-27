<script setup>
	import { RouterView, RouterLink } from 'vue-router';

	import SiteHeader from '@/components/SiteHeader.vue';
	import SiteFooter from '@/components/SiteFooter.vue';

	import { onMounted, watch } from 'vue';

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
		<inner-column>
			<RouterView />
		</inner-column>
	</main>
	<SiteFooter />
</template>

<style scoped></style>
