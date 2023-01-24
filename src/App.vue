<script setup>
	import { RouterView } from 'vue-router';

	import SiteHeader from '@/components/SiteHeader.vue';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	import { onMounted } from 'vue';

	const shoppingCart = useShoppingCartStore();

	function setUpCart() {
		const data = JSON.parse(localStorage.getItem('shoppingCartData')) || [];
		data.forEach((shoppingCartData) => {
			shoppingCart.list = [...shoppingCart.list, shoppingCartData];
		});
		if (!data) {
			data = [];
		} else if (data == []) {
			shoppingCart.list = [];
		}
		console.log(shoppingCart.list);
	}

	onMounted(function () {
		setUpCart();
	});
</script>

<template>
	<SiteHeader />
	<main class="outlet">
		<div class="inner-column">
			{{ shoppingCart.getCount }}
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
