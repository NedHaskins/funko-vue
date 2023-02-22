<script setup>
	//Foundational imports
	import { onMounted, computed } from 'vue';
	import { RouterLink, useRoute, useRouter } from 'vue-router';
	import { useInterfaceStore } from '@/stores/interface';

	//Firebase imports
	import { useFirestore, useCollection, useDocument } from 'vuefire';
	import { collection, doc, addDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
	import { useUserService } from '@/services/UserService';

	const route = useRoute();
</script>

<template>
	<section class="intro-module">
		<intro-text> <h1>Welcome to the Funko Pop Store.</h1></intro-text>
		<RouterLink class="picture-wrapper" to="/intro/2">
			<picture>
				<img src="https://peprojects.dev/images/portrait.jpg" />
			</picture>
		</RouterLink>
		<button-wrapper>
			<button type="button">Home Page</button>
		</button-wrapper>
	</section>
</template>

<style lang="scss" scoped>
	.intro-module {
		border: 3px solid var(--vermilion);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		height: 100vh;

		h1 {
			font-family: 'Bangers';
			flex: 1;
		}

		.picture-wrapper {
			flex: 2;
			picture {
				max-width: 223px;
			}
		}

		button-wrapper,
		.picture-wrapper,
		intro-text {
			display: flex;
			align-items: center;
			justify-content: center;
			flex: 1;
		}
	}
</style>
