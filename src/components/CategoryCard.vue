<script setup>
	defineProps(['category']);
</script>
<template>
	<category-card>
		<RouterLink v-bind:to="`/${category.id}`">
			<picture>
				<img v-bind:src="category.image" />
			</picture>
		</RouterLink>

		<!--SubcategoriesView if there are subcategories
			if not, it'll go straight to a filtered figure list-->

		<h3>{{ category.name }}</h3>
	</category-card>
</template>

<style lang="scss" scoped>
	category-card {
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

		padding: 10px;
	}
</style>
