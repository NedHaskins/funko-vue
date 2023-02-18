<script setup>
	import { computed } from 'vue';
	import { useUserService } from '@/services/UserService';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	defineProps(['figure']);

	import { useCartService } from '@/services/CartService';
	const cart = useCartService();

	//Firestore / Vuefire variables
	const db = useFirestore();
	const user = useUserService();
</script>
<template>
	<figure-card>
		<picture>
			<img v-bind:src="figure.image" />
		</picture>
		<h3>{{ figure.name }}</h3>
		<!--link this back to the figure detail-->
		<card-bottom>
			<div class="price-wrapper">
				<p>${{ figure.price }}</p>
			</div>
			<button-wrapper class="add-to-cart">
				<button @click.prevent="cart.addItem(figure)">Add to cart</button>
			</button-wrapper>
			<div class="more-info">
				<RouterLink :to="`/${figure.category}/${figure.subcategory}/${figure.slug}`">More<br />info</RouterLink>
			</div>
		</card-bottom>
	</figure-card>
</template>

<style scoped>
	picture {
		width: 236px;
		justify-self: center;
		padding: 10px;
	}

	card-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	@media (min-width: 600px) {
		picture {
		}
	}
</style>
