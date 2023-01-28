<script setup>
	import { RouterLink, useRoute } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';
	import { useUserDataStore } from '@/stores/userData';

	import UserIcon from '@/components/icons/UserIcon.vue';
	import CartIcon from '@/components/icons/CartIcon.vue';
	import CheeseburgerIcon from '@/components/icons/CheeseburgerIcon.vue';

	import { useShoppingCartStore } from '@/stores/shoppingCart';
	const shoppingCart = useShoppingCartStore();

	const route = useRoute();
	const ui = useInterfaceStore();
	const users = useUserDataStore();

	var body = document.querySelector('body');

	// set up a "listener" that will
	// listen for "clicks" (and taps) on the whole page!
	document.addEventListener('click', function (event) {
		// console.log(event.target); //showed up on the login page

		if (event.target.matches('.toggle')) {
			body.classList.toggle('small-menu-open');
		}

		if (event.target.matches('a')) {
			body.classList.toggle('small-menu-open');
		}
	});
</script>
<template>
	<header v-bind:class="`${route.name} ${ui.menuClass}`">
		<inner-column>
			<header-top>
				<space-box class="left">
					<div @click="ui.toggleMenu()" class="svg-wrapper hamburger">
						<CheeseburgerIcon class="toggle" />
					</div>
				</space-box>
				<title-wrapper>
					<h1 class="site-title normal-voice">Funko Pop East Coast</h1>
					<span>{{ users.currentUser }}</span>
				</title-wrapper>
				<space-box class="right">
					<div class="svg-wrapper user-icon">
						<RouterLink to="/login">
							<UserIcon />
						</RouterLink>
					</div>

					<div class="svg-wrapper cart">
						<RouterLink to="/shopping-cart">
							<span class="cart-count">{{ shoppingCart.getCount }}</span>
							<CartIcon />
						</RouterLink>
					</div>
				</space-box>
			</header-top>

			<menu-wrapper>
				<!-- {{ ui.menuClass }}  -->

				<nav class="site-menu">
					<RouterLink to="/">Home</RouterLink>

					<RouterLink to="/figures">Figures</RouterLink>
					<RouterLink to="/categories">Categories</RouterLink>

					<button class="toggle small-screen">Close</button>
				</nav>
			</menu-wrapper>
		</inner-column>
	</header>
</template>

<style scoped>
	/*	*:focus {
	 outline: 20px solid black;}*/

	.site-menu {
		font-family: 'Bangers';
	}

	.site-menu a {
		font-size: 32px;
	}

	.site-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.site-menu a {
		padding: 0.8em 0.8em 0 0.8em;
	}

	.site-menu .router-link-active {
		font-weight: 700;
		color: var(--vividMulberry);
	}
	@media (max-width: 599px) {
		.site-menu {
			display: none;
		}
	}

	@media (min-width: 600px) {
		.svg-wrapper.hamburger,
		button.toggle.small-screen {
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

	.site-title {
		font-size: calc(36px + 1.3vw);
	}

	@media (max-width: 729px) {
		title-wrapper {
			max-width: 265px;
		}
	}

	space-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
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
		width: 44px;
		margin-left: 11px;
	}

	@media (min-width: 600px) {
		space-box.right {
			flex-direction: row;
			justify-content: space-evenly;
		}

		.user-icon {
			margin-left: 0px;
		}
	}

	.cart {
		position: relative;
		width: 51px;
	}

	.cart-count {
		background-color: var(--cherokee);
		position: absolute;
		top: -9px;
		right: -8px;
		border: 2px solid black;
		padding: 4px;
		text-align: center;
		border-radius: 50%;
	}

	@media (prefers-color-scheme: dark) {
		.cart-count {
			color: var(--ink);
		}
	}

	/*SCAFFOLDING */

	inner-column > * {
		/*		border: 3px solid black;*/
	}

	space-box > * {
		/*		border: 3px dashed green;*/
	}

	space-box,
	.site-title {
		/*		border: 3px dashed red;*/
	}

	@media (max-width: 599px) {
		/* only if small! */
		.site-menu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			/* */
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* */
			opacity: 0;
			background-color: gray;
			pointer-events: none;
			transform: translate(-100%, 0); /* another fun option to try #a */
			transform: scale(0.5);
			/* */
			transition: 0s;
		}
		.site-menu a {
			min-width: 200px;
			text-align: center;
		}
		/*   .site-menu .corner {
		   position: absolute;
		   top: 20px;
		   right: 20px;
		 } */

		body.small-menu-open .site-menu {
			opacity: 1;
			pointer-events: initial;
			transform: translate(0, 0); /* another fun option to try #a */
			transform: scale(1);
			transition: 0.2s;
		}

		body.small-menu-open .site-menu a {
			opacity: 1;
		}
		button.toggle.small-screen {
			border: 3px solid white;
			background-color: black;
			color: white;
			font-family: 'Bangers';
			font-size: 32px;
			padding: 16px;
			margin-top: 20px;
		}

		button.toggle.small-screen:hover {
			border: 3px solid black;
			background-color: var(--paper);
			color: var(--ink);
			font-family: 'Bangers';
			font-size: 32px;
			padding: 16px;
		}
	}
</style>
