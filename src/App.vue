<script setup>
	import { RouterView, RouterLink, useRoute } from 'vue-router';

	import SiteHeader from '@/components/SiteHeader.vue';
	import SiteFooter from '@/components/SiteFooter.vue';

	import { onMounted, watch } from 'vue';

	const route = useRoute();
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
	<pre class="route-display"><code></code></pre>
	<SiteHeader v-if="!route.name?.includes('intro') && !route.name?.includes('checkout')" />
	<!-- the question mark here allows the `skip` that happens in the route value during rendering.  This fixed the problem of the pages not loading successfully during this check.-->
	<main class="outlet">
		<inner-column>
			<RouterView />
		</inner-column>
	</main>
	<SiteFooter v-if="!route.name?.includes('intro') && !route.name?.includes('checkout')" />
</template>

<style scoped>
	.route-display {
		/*		display: none;*/
	}
</style>
