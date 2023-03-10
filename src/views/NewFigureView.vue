<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useFavoritesService } from '@/services/FavoritesService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
	//Favorites icons
	import FavoritesOnIcon from '@/components/icons/FavoritesOnIcon.vue';
	import FavoritesOffIcon from '@/components/icons/FavoritesOffIcon.vue';

	import { useFigureService } from '@/services/FigureService';
	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();

	const figuresRef = computed(function () {
		return collection(db, 'figures');
	});

	const figures = useCollection(figuresRef);

	const figure = computed(function () {
		return figures.value.find((item) => item.id == route.params.figure);
	});

	const favorites = useFavoritesService();

	const favorited = computed(function () {
		//is this figure ID in the favorites collection? true/false
		return favorites.list.find((favorite) => favorite.name == figure.value.id);
	});
</script>
<template>
	<figure-info>
		<picture> <img v-bind:src="figure?.image" /></picture>
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
				<button v-if="figure" class="favorite" @click="favorites.toggleFavorite(figure.id)">
					<FavoritesOnIcon v-if="favorited" />
					<FavoritesOffIcon v-else />
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
				// width: 100%;

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

				text-block {
					max-width: 100%;
				}
				p {
					max-width: 100%;
				}
			}
		}
	}
</style>
