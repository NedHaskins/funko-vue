<script setup>
	import { useCharacterDataStore } from '@/stores/characterData';

	const characters = useCharacterDataStore();
</script>
<template>
	<ul v-for="character in characters.list">
		<li>
			<a href="#">{{ character.name }}</a>
		</li>
	</ul>
</template>
