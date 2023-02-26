<script setup>
	//Foundational imports
	import { onMounted, ref } from 'vue';
	import { RouterLink } from 'vue-router';

	//GSAP imports
	import gsap from 'gsap';
	const heartbeat = ref(null);
	onMounted(function () {
		// var heartbeat = '.heartbeat';

		var timeline = gsap.timeline();

		timeline
			.to(heartbeat.value, {
				scale: 1.25,
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
		<intro-text>
			<h1>If you're not a fan of Funko figures yet...</h1>
		</intro-text>
		<RouterLink class="picture-wrapper" to="/intro/3">
			<picture ref="heartbeat">
				<img src="https://peprojects.dev/alpha-4/ned/images/funko-fire/ant-man.jpg" />
			</picture>
		</RouterLink>
		<button-wrapper>
			<RouterLink to="/home">Home Page</RouterLink>
		</button-wrapper>
	</section>
</template>

<style lang="scss" scoped>
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
				padding: 10px;
				max-width: 223px;
			}
		}

		.picture-wrapper:hover {
			filter: hue-rotate(225deg);
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
