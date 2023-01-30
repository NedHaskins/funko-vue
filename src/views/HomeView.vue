<script setup>
   import FeaturedItems from '@/components/FeaturedItems.vue';
   import { useUserDataStore } from '@/stores/userData';
   const users = useUserDataStore();
</script>

<template>
   <!--if user is loggedin and they have an admin role-->

   <FeaturedItems />
</template>

<style scoped></style>
