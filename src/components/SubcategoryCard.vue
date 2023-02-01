<script setup>
	defineProps(['category', 'subcategory']);
</script>

<template>
	<subcategory-card>
		<RouterLink v-bind:to="{ name: 'subcategory', params: { cat: category.slug, sub: subcategory.slug } }">
			<picture>
				<img v-bind:src="subcategory.image" />
			</picture>
		</RouterLink>
		<h3>{{ subcategory.name }}</h3>
	</subcategory-card>
</template>

<style lang="scss" scoped>
	subcategory-card {
		display: block;
		font-family: 'Bangers';
		margin-top: 15px;

		a:hover {
			filter: hue-rotate(225deg);
		}

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
		border: 3px solid var(--ink);
		padding: 10px;
	}
</style>
