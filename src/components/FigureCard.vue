<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useFavoritesService } from '@/services/FavoritesService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();

	const props = defineProps(['figure']);

	const favorites = useFavoritesService();

	const favorited = computed(function () {
		if (props.figure) {
			//is this figure ID in the favorites collection? true/false
			return favorites.list.find((favorite) => favorite.name == props.figure.id);
		}
	});

	// onMounted(function () {
	// 	console.log(figure);
	// });

	//Trying a different way to bring the figures into the figure card.

	// 	const figureRef = query(collection(db, 'figures'), where('slug', '==', route.params.figure));

	// 	const figure = useDocument(figureRef);
	//
</script>
<template>
	<div>{{ figure.slug }}</div>
	<div style="color: cyan">{{ favorites.list }}</div>
	<div style="color: red">{{ favorited }}</div>
	<figure-card v-if="figure">
		<RouterLink
			v-if="!figure.subcategory"
			v-bind:to="{ name: 'figure-no-sub', params: { cat: figure.category, figure: figure.id } }"
		>
			<picture>
				<img v-bind:src="figure.image" />
			</picture>
		</RouterLink>

		<RouterLink
			v-else
			v-bind:to="{
				name: 'figure-with-sub',
				params: { cat: figure.category, sub: figure.subcategory, figure: figure.id },
			}"
		>
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

			<div v-if="!figure.subcategory" class="more-info">
				<RouterLink v-bind:to="{ name: 'figure-no-sub', params: { cat: figure.category, figure: figure.id } }"
					>More info</RouterLink
				>
			</div>

			<div v-else class="more-info">
				<RouterLink
					v-bind:to="{
						name: 'figure-with-sub',
						params: { cat: figure.category, sub: figure.subcategory, figure: figure.id },
					}"
					>More info</RouterLink
				>
			</div>

			<button class="favorite" @click="favorites.toggleFavorite(figure.id)">Toggle favorites</button>
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
