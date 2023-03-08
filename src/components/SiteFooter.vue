<template>
	<footer>
		<inner-column>
			<nav class="site-menu footer">
				<RouterLink to="/about">About</RouterLink>
				<RouterLink to="/contact">Contact</RouterLink>
				<a class="github" href="https://github.com/nedhaskins/funko-vue">Project Github Link</a>
			</nav>
		</inner-column>
	</footer>
</template>

<style scoped>
	footer {
		padding: 44px;
	}

	.site-menu.footer {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}

	.site-menu a {
		font-family: 'Bangers';
		font-size: 32px;
		text-align: center;
	}

	.github {
		color: var(--puertoRico);
	}
</style>
