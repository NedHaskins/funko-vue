<script setup></script>

<template>
	<section class="intro-module">
		<h1>it's possible you may be one not too long from now...</h1>
		<RouterLink to="/intro/4">
			<picture>
				<img src="https://peprojects.dev/images/portrait.jpg" />
			</picture>
		</RouterLink>
		<button-wrapper>
			<button type="button">Home Page</button>
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
		min-height: 100vh;

		h1 {
			font-family: 'Bangers';
		}

		picture {
			max-width: 223px;
		}
	}

	button-wrapper {
		display: block;
		margin-top: 100px;
	}
</style>
