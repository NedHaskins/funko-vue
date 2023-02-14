<script setup>
	//Foundational imports
	import { onMounted } from 'vue';
	import { RouterLink, useRoute, useRouter } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	//Firebase imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	//File imports
	import UserIcon from '@/components/icons/UserIcon.vue';
	import CartIcon from '@/components/icons/CartIcon.vue';
	import CheeseburgerIcon from '@/components/icons/CheeseburgerIcon.vue';

	//Router and interface variables
	const route = useRoute();
	const router = useRouter();
	const ui = useInterfaceStore();

	//Firebase variables

	const userService = useUserService();
	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data
	const categories = useCollection(collection(db, 'categories'));

	const userCollection = useCollection(collection(db, 'users'));

	const q = query(collection(db, 'users'), where('uniqueID', '==', 'MRVtqQQyLNhl3XE47ntRtUFYyYY2'));

	const currentDocument = useCollection(q); //vuefire's using this

	//Other variables

	const shoppingCart = useShoppingCartStore();

	// const isOpen = ref(false); //this would be a component of a UI store maybe?

	var body = document.querySelector('body');

	// set up a "listener" that will
	// listen for "clicks" (and taps) on the whole page!
	document.addEventListener('click', function (event) {
		// console.log(event.target); //showed up on the login page

		if (event.target.matches('.toggle')) {
			body.classList.toggle('small-menu-open');
		}
		//need some logic in here to close the menu
		if (event.target.matches('.site-menu a')) {
			body.classList.remove('small-menu-open');
		}
	});

	function logOutUser() {
		users.currentUser = false;
		localStorage.setItem('currentUser', false);
		router.push('/');
	}

	const matchingName = userCollection.value.find(function (record) {
		return record.uniqueID == userService.current.uid;
		// if (record.uniqueID == userService.current.uid) {
		// 	console.log('They match', record.uniqueID, record.name);
		// 	return record;
		// }
	});

	// console.log(matchingName.name);
	// console.log(currentDocument);
</script>
<template>
	<div v-if="userService.current">{{ matchingName }}</div>
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
				</title-wrapper>
				<space-box class="right">
					<div v-if="userService.current" class="user-prompts">
						<span style="font-family: 'Bangers'; color: gray">Hi, {{ matchingName.name }}</span>
						<button class="logout" @click="userService.signOut()">Logout</button>
					</div>
					<div v-if="!userService.current" class="svg-wrapper user-icon">
						<RouterLink to="/signin-page">
							<UserIcon />
						</RouterLink>
					</div>

					<div class="svg-wrapper cart">
						<RouterLink to="/shopping-cart">
							<div class="cart-count">
								<p>{{ shoppingCart.getCount }}</p>
							</div>

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
					<RouterLink v-if="userService.current && userCollection.role === 'admin'" to="/admin-dashboard"
						>Dashboard</RouterLink
					>

					<button class="toggle small-screen">Close</button>
				</nav>
			</menu-wrapper>
		</inner-column>
	</header>
</template>

<style lang="scss" scoped>
	/*	*:focus {
	 outline: 20px solid black;}*/

	.site-menu {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;

		font-family: 'Bangers';
		a {
			padding: 0.8em 0.8em 0 0.8em;
			font-size: 32px;
		}

		.router-link-active {
			font-weight: 700;
			color: var(--vividMulberry);
		}
	}

	.small-menu-open .router-link-active {
		// color: var(--ink);
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
		border-radius: 50%;

		p {
			font-family: 'Fredoka One';
			letter-spacing: 0.1em;
			font-size: 17px;
			margin-left: 2px;
		}
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

	.user-prompts {
		// border: 3px dashed red;

		span {
			// border: 3px solid red;
			display: block;
			font-size: 23px;
			text-align: center;
		}

		.logout {
			margin-top: 6px;
			padding: 6px;
			border: 2px solid var(--ink);
		}
	}
</style>
