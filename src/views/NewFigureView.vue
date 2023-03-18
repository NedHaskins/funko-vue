<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useFavoritesService } from '@/services/FavoritesService';
	import { useCartService } from '@/services/CartService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	import { useFigureService } from '@/services/FigureService';
	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const cart = useCartService();

	const figuresRef = computed(function () {
		return collection(db, 'figures');
	});

	const figures = useCollection(figuresRef);

	const figure = computed(function () {
		return figures.value.find((item) => item.id == route.params.figure);
	});

	const favorites = useFavoritesService();

	const favorited = computed(function () {
		if (figure.value) {
			//is this figure ID in the favorites collection? true/false
			return favorites.list.find((favorite) => favorite.name == figure.value.id);
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
<template>
	<figure-info v-if="figure">
		<picture> <img :src="figure?.image" /></picture>
		<card-bottom>
			<text-block>
				<h1>{{ figure?.name }}</h1>
				<p>{{ figure?.description }}</p>
			</text-block>

			<figure-extras>
				<div class="price-wrapper">
					<p>${{ figure?.price }}</p>
				</div>
				<button-wrapper class="add-to-cart">
					<button type="button" @click="cart.addItem(figure)">Add to cart</button>
				</button-wrapper>
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
			</figure-extras>
		</card-bottom>
	</figure-info>
</template>

<style lang="scss" scoped>
	figure-info {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;

		picture {
			border: 4px solid var(--ink);
			padding: 15px;
			width: 300px;
		}

		card-bottom {
			margin-top: 27px;
			display: flex;
			flex-direction: column;
			align-items: center;
			// gap: 30px;
			// width: 100%;
			// max-width: 400px;

			pre {
				/* these are a pain to get right. suitable as a baseline.. */
				max-width: 100%;
				max-height: 100%;
				overflow: auto;
				white-space: pre-wrap;
				word-wrap: break-word;
				overflow-wrap: break-word;
			}

			p,
			button {
				font-size: 27px;
			}

			button {
				max-width: 142px;
			}

			button.favorite {
				background-color: unset;
			}

			text-block {
				display: block;
				margin-top: 25px;
				max-width: 60%;
				text-align: center;
				h1 {
					font-family: 'Bangers';
				}
				p {
					font-family: 'Fredoka One';
					font-weight: normal;
					margin-top: 15px;
				}
			}

			figure-extras {
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				width: 100%;

				button.favorited,
				button.not-favorited {
					border: none;
					background: none;
				}

				.price-wrapper {
					text-align: center;
				}

				.price-wrapper,
				svg-wrapper {
					width: 20%;
				}

				svg-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		card-bottom {
			// border: 3px solid lime;
		}
	}

	@media (min-width: 700px) {
		figure-info {
			flex-direction: row;
			gap: 30px;
			p {
				display: block;
			}
			picture {
				width: 40%;
			}
			card-bottom {
				flex-direction: column;
				align-items: center;
				width: 60%;
				figure-extras {
					margin-top: 20px;
				}
				text-block {
					max-width: 100%;
				}
				p {
					max-width: 100%;
				}
			}
		}
	}

	/*FAVORITE BUTTON ATTRIBUTES*/

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
</style>
