<script setup>
	//Foundational imports
	import { onMounted, computed, ref } from 'vue';
	import { RouterLink, useRoute, useRouter } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	//Firebase imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	import gsap from 'gsap';

	const route = useRoute();

	const heartbeat = ref(null);

	onMounted(function () {
		// var heartbeat = '.heartbeat';

		var timeline = gsap.timeline();

		timeline
			.to(heartbeat.value, {
				scale: 1.5,
				duration: 1,
			})
			.to(heartbeat.value, {
				scale: 1,

				duration: 1,
			});

		timeline.timeScale(1);
		timeline.repeat(-1);
		//allows for retroactive editing of event speed
	});
</script>

<template>
	<section class="intro-module">
		<intro-text><h1>Welcome to the Funko Pop Store.</h1></intro-text>

		<div class="animation">
			<RouterLink class="picture-wrapper" to="/intro/2">
				<picture ref="heartbeat">
					<img src="https://peprojects.dev/images/portrait.jpg" />
				</picture>
			</RouterLink>
		</div>

		<button-wrapper>
			<RouterLink to="/home">Home Page</RouterLink>
		</button-wrapper>
	</section>
</template>

<style lang="scss" scoped>
	.animation {
		position: fixed;
		background-color: black;
		display: grid;
		place-items: center;
	}

	.intro-module {
		border: 3px solid var(--vermilion);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		height: 100vh;

		button-wrapper,
		intro-text {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
		}

		.picture-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 2;
			picture {
				max-width: 223px;
			}
		}

		button-wrapper {
			a {
				border: 3px solid black;
				background: var(--paper);
				color: var(--ink);
				font-family: 'Bangers';
				font-size: 20px;
				padding: 12px;
			}
			a:hover {
				border: 3px solid var(--paper);
				background: var(--ink);
				color: var(--paper);
				font-family: 'Bangers';
				font-size: 20px;
				padding: 12px;
			}
		}

		h1 {
			font-family: 'Bangers';
		}
	}
</style>
