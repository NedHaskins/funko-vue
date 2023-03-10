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
	<div style="color: lime">{{ route.params.figure }}</div>
	<div style="color: orange">{{ favorites.list }}</div>

	<div style="color: green">{{ figure }}</div>
	<figure-info>
		<picture> <img v-bind:src="figure.image" /></picture>
		<card-bottom>
			<text-block>
				<h1>{{ figure.name }}</h1>
				<p>{{ figure.description }}</p>
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
