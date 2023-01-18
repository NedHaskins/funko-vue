<script setup>
	import { useFigureDataStore } from '@/stores/figureData';

	const figures = useFigureDataStore();
</script>
<template>
	<ul class="figure-list">
		<li v-for="figure in figures.list">
			<figure-card>
				<picture>
					<img v-bind:src="figure.image" />
				</picture>
				<h3>{{ figure.name }}</h3>
				<div>
					<p>{{ figure.price }}</p>
					<button>Add to cart</button>
					<RouterLink v-bind:to="`/figure/${figure.slug}`">More</RouterLink>
				</div>
			</figure-card>
		</li>
	</ul>
</template>

<style scoped>
	figure-card {
		display: grid;

		gap: var(--scaffoldPadding);
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--scaffoldPadding);
	}

	div {
		display: flex;
		justify-content: space-between;
	}

	@media (min-width: 960px) {
		ul {
		}
	}

	figcaption {
		text-align: center;
		margin-top: 8px;
	}
</style>
