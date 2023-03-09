<script setup>
	//Vue imports
	import { ref, computed, onBeforeMount } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';
	import { useFavoritesService } from '@/services/FavoritesService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, getDocs, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	//Favorites icons
	import FavoritesOnIcon from '@/components/icons/FavoritesOnIcon.vue';
	import FavoritesOffIcon from '@/components/icons/FavoritesOffIcon.vue';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const cart = useCartService();
	const favorites = useFavoritesService();

	const figureRef = computed(function () {
		return query(collection(db, 'figures'), where('slug', '==', route.params.figure));
	});
	// const { data: figure, promise: figureLoaded } = useCollection(figureRef);

	// onBeforeMount(async function () {
	// 	await figureLoaded;
	// 	console.log('Figure is loaded');
	// });
	//adds time to get the data from Firebase so the Vuefire variable can be defined correctly

	const figure = useCollection(figureRef);

	//is there a way to "solidify" or "save" the values here?
</script>
<template v-if="figure[0]">
	<div>{{ route.params.figure }}</div>
	<div>{{ favorites.list }}</div>
	<figure-info>
		<picture> <img v-bind:src="figure[0]?.image" /></picture>
		<card-bottom>
			<text-block>
				<h1>{{ figure[0]?.name }}</h1>
				<p>{{ figure[0]?.description }}</p>
			</text-block>

			<figure-extras>
				<div class="price-wrapper">
					<p>${{ figure[0]?.price }}</p>
				</div>
				<button-wrapper class="add-to-cart">
					<button type="button" @click="cart.addItem(figure[0])">Add to cart</button>
				</button-wrapper>

				<!-- <svg-wrapper
					id="favorite-off"
					class="favorite-off"
					@click="favorites.toggleFavorite(figure[0])"
					v-if="favorites.isFavorited == false"
				>
					<FavoritesOffIcon />
				</svg-wrapper>

				<svg-wrapper id="favorite-on" class="favorite-on" @click="favorites.toggleFavorite(figure[0])" v-else>
					<FavoritesOnIcon />
				</svg-wrapper> -->
				<!--button...svg inside button-->
			</figure-extras>
		</card-bottom>
	</figure-info>
</template>

<style lang="scss" scoped>
	figure-info {
		margin-top: 20px;
		border: 3px solid red;
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
			border: 3px solid lime;
			margin-top: 27px;
			display: flex;
			flex-direction: column;
			align-items: center;
			// gap: 30px;
			// width: 100%;
			// max-width: 400px;

			pre {
				/* these are a pain to get right. suitable as a baseline.. */
				border: 3px solid yellow;
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

			text-block {
				border: 3px solid red;
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
				border: 3px solid purple;
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
				border: 3px solid blue;
				width: 50%;
			}
			card-bottom {
				flex-direction: column;
				align-items: center;
				width: 50%;
			}
		}
	}
</style>
