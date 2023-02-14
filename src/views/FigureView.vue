<script setup>
	import { useRoute } from 'vue-router';
	import { useShoppingCartStore } from '@/stores/shoppingCart';

	//FIRESTORE AND VUEFIRE IMPORTS

	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	//DATABASE VARIABLES

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures')); //reactive data
	const categories = useCollection(collection(db, 'categories'));

	const route = useRoute();

	//Return the singular figure document in the database.

	// const figure = figures.list.find(function (record) {
	// 	return record.slug == route.params.figure;
	// });

	const figure = useDocument(doc(collection(db, 'figures'), route.params.figure));

	console.log(figure);

	function addToCart(name, quantity, price) {
		const newItem = {
			name: name,
			quantity: 1,
			price: price,
		};

		const match = shoppingCart.list.find(function (item) {
			return item.name === newItem.name;
		});

		if (match) {
			match.quantity = match.quantity + newItem.quantity;
		} else {
			shoppingCart.list = [...shoppingCart.list, newItem];
		}

		// shoppingCart.add(record);
		console.log(shoppingCart.list); //check
		localStorage.setItem('shoppingCartData', JSON.stringify(shoppingCart.list));
	}
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
				<button @click.prevent="addToCart(figure.name, figure.quantity, figure.price)">Add to cart</button>
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
