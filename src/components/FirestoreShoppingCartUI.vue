<script setup>
	defineProps(['user']);
</script>
<template>
	<p v-if="user.current">{{ user.name }}'s cart has successfully been retrieved from Firestore.</p>

	<div>{{ user.role }}</div>
</template>

<style></style>
