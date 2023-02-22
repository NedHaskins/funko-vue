<script setup></script>

<template>
	<section class="intro-module">
		<h1>If you're not a fan of Funko figures yet...</h1>
		<RouterLink to="/intro/3">
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
