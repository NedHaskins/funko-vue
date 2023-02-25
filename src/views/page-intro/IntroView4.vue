<script setup></script>

<template>
	<section class="intro-module">
		<intro-text>
			<h1>so, please...enjoy the site...and feel free to get in touch for a consultation anytime!</h1>
		</intro-text>
		<RouterLink class="picture-wrapper" to="/home">
			<picture>
				<img src="https://peprojects.dev/images/portrait.jpg" />
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
