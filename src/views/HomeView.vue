<script setup>
   import FeaturedItems from '@/components/FeaturedItems.vue';

   import { collection } from 'firebase/firestore';
   import { useFirestore, useCollection } from 'vuefire';

   const db = useFirestore();
   const figures = useCollection(collection(db, 'figures'));
</script>

<template>
   <!--if user is loggedin and they have an admin role-->

   <FeaturedItems v-if="figures" />
</template>

<style scoped></style>
