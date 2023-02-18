<script setup>
	console.clear();
</script>
<template>
	<p v-if="user.current">{{ user.name }}'s cart has successfully been retrieved from Firestore.</p>

	<div>{{ user.role }}</div>
	<pre><div>{{ cart }}</div></pre>
</template>

<style></style>
