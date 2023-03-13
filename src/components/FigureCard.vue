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

	const iconClass = computed(function () {
		if (favorited.value) {
			return 'favorited';
		} else {
			return 'not-favorited';
		}
	});
</script>
<div></div>
<template>
	<figure-card v-if="figure">
		<picture-wrapper>
			<RouterLink
				v-if="!figure.subcategory"
				:to="{ name: 'figure-no-sub', params: { cat: figure.category, figure: figure.id } }"
			>
				<picture>
					<img :src="figure.image" />
				</picture>
			</RouterLink>

			<RouterLink
				v-else
				:to="{
					name: 'figure-with-sub',
					params: { cat: figure.category, sub: figure.subcategory, figure: figure.id },
				}"
			>
				<picture>
					<img :src="figure.image" />
				</picture>
			</RouterLink>
		</picture-wrapper>

		<h3>{{ figure.name }}</h3>
		<!--link this back to the figure detail-->
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>

			<div v-if="!figure.subcategory" class="more-info">
				<RouterLink :to="{ name: 'figure-no-sub', params: { cat: figure.category, figure: figure.id } }"
					>More info</RouterLink
				>
			</div>

			<div v-else class="more-info">
				<RouterLink
					:to="{
						name: 'figure-with-sub',
						params: { cat: figure.category, sub: figure.subcategory, figure: figure.id },
					}"
					>More info</RouterLink
				>
			</div>

			<button :class="`${iconClass}`" @click="favorites.toggleFavorite(figure.id)">
				<!-- 				<FavoritesOffIcon v-if="!favorited" />
				<FavoritesOnIcon v-else /> -->
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 258 190"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					xml:space="preserve"
					xmlns:serif="http://www.serif.com/"
					style="
						fill-rule: evenodd;
						clip-rule: evenodd;
						stroke-linecap: round;
						stroke-linejoin: round;
						stroke-miterlimit: 1.5;
					"
				>
					<path
						d="M128.956,45.358c25.832,-46.015 77.498,-46.015 103.331,-27.609c25.833,18.406 25.833,55.218 -0,92.029c-18.083,27.609 -64.582,55.218 -103.331,73.624c-38.75,-18.406 -85.248,-46.015 -103.331,-73.624c-25.833,-36.811 -25.833,-73.623 -0,-92.029c25.832,-18.406 77.498,-18.406 103.331,27.609Z"
					/>
				</svg>
			</button>
		</card-bottom>
	</figure-card>
</template>

<style lang="scss" scoped>
	// card-bottom > * {
	// 	border: 3px solid red;
	// 	div,
	// 	p,
	// 	a {
	// 		border: 3px solid green;
	// 	}
	// }
	figure-card {
		display: block;

		picture-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}

		a:hover {
			filter: hue-rotate(225deg);
		}

		h3,
		card-bottom {
			margin-top: 12px;
		}

		button {
			border: none;
			background: none;
		}
	}
	picture {
		width: 236px;
		justify-self: center;
		padding: 10px;
	}

	card-bottom {
		display: grid;
		grid-template-columns: 1fr 30% 1fr;

		p,
		button {
			font-size: 27px;
		}
	}

	button.favorited,
	button.not-favorited {
		max-width: 69px;
	}

	:is(.favorited, .not-favorited) svg path {
		stroke: var(--ink);
		stroke-width: 12.25px;
	}

	button.favorited svg path {
		fill: #e9467c;
	}

	button.not-favorited svg path {
		fill: none;
	}

	@media (prefers-color-scheme: dark) {
		:is(.favorited, .not-favorited) svg path {
			stroke: var(--paper);
		}
	}

	@media (min-width: 600px) {
		picture {
		}
	}
</style>
