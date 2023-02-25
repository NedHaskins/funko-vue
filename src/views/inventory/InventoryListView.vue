<script setup>
	import { ref, reactive, computed, watch, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';

	//Firestore / Vuefire imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

	const db = useFirestore();
	const figures = useCollection(collection(db, 'figures'));
</script>

<template>
	<figure-list>
		<h2>Figure List</h2>
		<ul v-if="figures" v-for="figure in figures">
			<li>
				<link-wrapper>
					<RouterLink :to="`/inventory/edit/${figure.slug}`">Edit</RouterLink>
				</link-wrapper>
				<button>Delete</button>
				<figure-name>{{ figure.name }}</figure-name>
			</li>
		</ul>
	</figure-list>
</template>

<style lang="scss" scoped>
	figure-list {
		margin-top: 31px;
		display: block;
		background-color: gray;
		padding: 20px;

		ul {
			margin-top: 20px;
			li {
				display: flex;
				flex-direction: row;
				gap: 20px;
				// border: 3px solid black;

				link-wrapper,
				figure-name {
					display: block;
				}

				link-wrapper,
				button {
					border: 3px solid black;
					padding: 10px;
					font-family: 'Bangers';
					background-color: white;
				}

				button,
				a {
					font-size: 20px;
				}

				figure-name {
					display: flex;
					// border: 3px solid red;
					align-items: center;
					font-family: 'Bangers';
					font-size: 22px;
				}
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		a {
			color: black;
		}
	}

	@media (min-width: 600px) {
		figure-list {
			max-width: 520px;
		}
	}
</style>
