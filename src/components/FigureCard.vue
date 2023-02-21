<script setup>
	import { computed } from 'vue';
	import { useUserService } from '@/services/UserService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	defineProps(['figure']);

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
</script>
<template>
	<figure-card>
		<RouterLink v-if="!figure.subcategory" :to="`/${figure.category}/${figure.slug}`">
			<picture>
				<img v-bind:src="figure.image" />
			</picture>
		</RouterLink>

		<RouterLink v-else :to="`/${figure.category}/${figure.subcategory}/${figure.slug}`">
			<picture>
				<img v-bind:src="figure.image" />
			</picture>
		</RouterLink>

		<h3>{{ figure.name }}</h3>
		<!--link this back to the figure detail-->
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>

			<div v-if="figure.subcategory == null" class="more-info">
				<RouterLink v-bind:to="{ name: 'figure-no-sub', params: { cat: figure.category, figure: figure.slug } }"
					>More info</RouterLink
				>
			</div>

			<div v-else class="more-info">
				<RouterLink
					v-bind:to="{
						name: 'figure-with-sub',
						params: { cat: figure.category, sub: figure.subcategory, figure: figure.slug },
					}"
					>More info</RouterLink
				>
			</div>
		</card-bottom>
	</figure-card>
</template>

<style lang="scss" scoped>
	figure-card {
		display: block;

		a:hover {
			filter: hue-rotate(225deg);
		}

		h3,
		card-bottom {
			margin-top: 12px;
		}
	}
	picture {
		width: 236px;
		justify-self: center;
		padding: 10px;
	}

	card-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		gap: 30px;

		p,
		button {
			font-size: 27px;
		}
	}

	@media (min-width: 600px) {
		picture {
		}
	}
</style>
