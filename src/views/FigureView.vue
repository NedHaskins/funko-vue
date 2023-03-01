<script setup>
	//Vue imports
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';

	//Favorites icons
	import FavoritesOnIcon from '@/components/icons/FavoritesOnIcon.vue';
	import FavoritesOffIcon from '@/components/icons/FavoritesOffIcon.vue';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const cart = useCartService();

	const figureRef = computed(function () {
		return query(collection(db, 'figures'), where('slug', '==', route.params.figure));
	});

	const figure = useDocument(figureRef);

	const isFavorited = ref(false);

	async function toggleFavorite(figure) {
		isFavorited.value = !isFavorited.value;
		console.log(isFavorited.value);
		if (isFavorited.value === true) {
			//if there's no favorites yet...create one
			await addDoc(collection(db, 'users', user.current?.uid, 'favorites'), figure);
			alert(`${figure.name} was added to ${user.userDoc.firstName}'s favorites list. :)`);
		} else {
			await deleteDoc(doc(db, 'users', user.current?.uid, 'favorites', figure.id));
			alert(`${figure.name} was removed from ${user.userDoc.firstName}'s favorites list.`);
		}
	}
</script>
<template>
	<figure-info>
		<picture> <img v-bind:src="figure[0].image" /></picture>
		<card-bottom>
			<text-block>
				<h1>{{ figure[0].name }}</h1>
				<p>{{ figure[0].description }}</p>
			</text-block>
			<figure-extras>
				<div class="price-wrapper">
					<p>${{ figure[0].price }}</p>
				</div>
				<button-wrapper class="add-to-cart">
					<button type="button" @click="cart.addItem(figure[0])">Add to cart</button>
				</button-wrapper>

				<svg-wrapper class="favorite-off" @click="toggleFavorite(figure[0])" v-if="isFavorited === false">
					<FavoritesOffIcon />
				</svg-wrapper>

				<svg-wrapper class="favorite-on" @click="toggleFavorite(figure[0])" v-else>
					<FavoritesOnIcon />
				</svg-wrapper>
			</figure-extras>
		</card-bottom>
	</figure-info>
</template>

<style lang="scss" scoped>
	svg-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	figure-info {
		margin-top: 20px;
		// border: 3px solid red;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		picture {
			border: 4px solid var(--ink);
			padding: 15px;
			width: 300px;
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

		card-bottom {
			margin-top: 27px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30px;
			width: 100%;
			// max-width: 400px;

			p,
			button {
				font-size: 27px;
			}

			figure-extras {
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
				width: 100%;

				.price-wrapper {
					text-align: center;
				}

				.price-wrapper,
				svg-wrapper {
					width: 20%;
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
			picture {
				width: 50%;
			}
			card-bottom {
				flex-direction: column;
				width: 50%;
			}
		}
	}
</style>
