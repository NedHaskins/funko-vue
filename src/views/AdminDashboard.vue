<script setup>
	import { ref, onMounted } from 'vue';

	import { RouterLink, RouterView, useRoute } from 'vue-router';

	import RainbowLetters from '@/scripts/rainbowLetters';
	const container = ref(null);
	onMounted(function () {
		RainbowLetters('Admin Dashboard');
	});
</script>

<template>
	<module-header>
		<div id="letters-container" ref="container"></div>
	</module-header>

	<!-- <div v-if="userService.role === 'admin'"> -->
	<!-- </div> -->
	<dashboard-navbar>
		<RouterLink to="/inventory">Inventory UI</RouterLink>

		<RouterLink to="/admin/user-profile">View / edit profile</RouterLink>
	</dashboard-navbar>

	<RouterView />
</template>

<style lang="scss">
	dashboard-navbar {
		border: 3px solid black;
		background-color: var(--melon);
		display: flex;
		justify-content: space-evenly;
		text-align: center;
		flex-wrap: wrap;
		padding: 10px;
		gap: 10px;

		a {
			display: inline-block;
			font-family: 'Bangers';
			font-size: 36px;
		}

		.router-link-active {
			font-weight: 700;
			color: green;
		}

		a:hover {
			color: green;
		}
	}

	@media (prefers-color-scheme: dark) {
		dashboard-navbar {
			border: none;

			a {
				color: black;
			}
		}
	}

	@media (min-width: 700px) {
		dashboard-navbar {
			a {
				font-size: 28px;
			}
		}
	}
</style>
