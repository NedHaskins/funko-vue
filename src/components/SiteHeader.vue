<script setup>
	import { RouterLink, RouterView, useRoute } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	import SiteHeader from '@/components/SiteHeader.vue';

	const route = useRoute();
	const ui = useInterfaceStore();
</script>
<template>
	<header v-bind:class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<header-top>
				<space-box class="left">
					<div @click="ui.toggleMenu()" class="svg-wrapper hamburger">
						<img src="/images/Cheeseburger.svg" />
					</div>
				</space-box>
				<!-- 			<pre><code>
		{{ route.name }}</code></pre> -->
				<title-wrapper>
					<h1 class="site-title normal-voice">Funko Pop<br />East Coast</h1>
				</title-wrapper>
				<space-box class="right">
					<div class="svg-wrapper user-icon">
						<img src="/images/user-icon.svg" />
					</div>

					<div class="svg-wrapper cart">
						<RouterLink to="/shopping-cart">
							<img src="/images/cart.svg" />
						</RouterLink>
					</div>
				</space-box>
			</header-top>

			<menu-wrapper>
				<!-- {{ ui.menuClass }}  -->

				<nav class="site-menu">
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/about">About</RouterLink>
					<RouterLink to="/contact">Contact</RouterLink>
					<RouterLink to="/figures">Figures</RouterLink>
					<RouterLink to="/categories">Categories</RouterLink>
					<RouterLink to="/create-item">Create Item</RouterLink>
				</nav>
			</menu-wrapper>
		</inner-column>
	</header>
</template>

<style scoped>
	@media (min-width: 600px) {
		.svg-wrapper.hamburger {
			display: none;
		}
	}
	inner-column {
		display: flex;
		flex-direction: column;
	}

	header-top {
		display: flex;
		flex-direction: row;
		justify-content: stretch;
	}

	space-box {
		display: block;
		flex: 1;
	}

	title-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 3;
	}

	space-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
	}

	@media (min-width: 600px) {
		space-box.right {
			flex-direction: row;
			justify-content: space-evenly;
		}
	}

	.svg-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	button {
		border: 0px;
		background-color: none;
	}

	.user-icon {
		width: 60px;
	}

	.cart {
		width: 66px;
	}

	/*SCAFFOLDING */

	.inner-column > * {
		border: 3px solid black;
	}

	space-box > * {
		border: 3px dashed green;
	}

	space-box,
	.site-title {
		border: 3px dashed red;
	}
</style>
