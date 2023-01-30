<script setup>
	defineProps(['category']);
</script>

<template>
	<category-card>
		<RouterLink v-bind:to="`/category/${category.slug}`">
			<picture>
				<img v-bind:src="category.image" />
			</picture>
		</RouterLink>
		<h3>{{ category.name }}</h3>
	</category-card>
</template>

<style lang="scss">
	category-card {
		display: block;
		font-family: 'Bangers';
		margin-top: 15px;

		h3 {
			margin-top: 8px;
			text-align: center;
		}
	}

	li {
		justify-self: center;
	}

	picture {
		width: 236px;

		padding: 10px;
	}
</style>
