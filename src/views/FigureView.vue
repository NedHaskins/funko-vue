<script setup>
	//Vue imports
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUserService } from '@/services/UserService';
	import { useCartService } from '@/services/CartService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//Vue variables
	const route = useRoute();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
	const cart = useCartService();

	const categories = useCollection(collection(db, 'categories'));
	const figures = useCollection(collection(db, 'figures'));
	const figure = useDocument(doc(collection(db, 'figures'), route.params.figure));
</script>
<template>
	<figure-info>
		<picture> <img v-bind:src="figure.image" /></picture>
		<text-block>
			<h1>{{ figure.name }}</h1>
			<p>{{ figure.description }}</p>
		</text-block>
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>
			<button-wrapper class="add-to-cart">
				<button @click.prevent="cart.addItem(figure)">Add to cart</button>
			</button-wrapper>
		</card-bottom>
	</figure-info>
</template>

<style lang="scss" scoped>
	figure-info {
		margin-top: 20px;
		// border: 3px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

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
			flex-direction: row;
			justify-content: space-evenly;
			gap: 30px;

			p,
			button {
				font-size: 27px;
			}
		}

		picture {
			border: 4px solid var(--ink);
			padding: 15px;
			width: 300px;
		}
	}
</style>
