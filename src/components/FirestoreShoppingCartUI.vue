<script setup>
	console.clear();

	defineProps(['user']);
</script>
<template>
	<p v-if="user.current">{{ user.name }}'s cart has successfully been retrieved from Firestore.</p>

	<div>{{ user.role }}</div>
	<pre><div>{{ user.userDoc.cart }}</div></pre>
</template>

<style></style>
