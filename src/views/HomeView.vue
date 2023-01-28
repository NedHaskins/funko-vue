<script setup>
   import FeaturedItems from '@/components/FeaturedItems.vue';
   import AdminDashboard from '@/views/AdminDashboard.vue';
   import { useUserDataStore } from '@/stores/userData';
   const users = useUserDataStore();
</script>

<template>
   <!--if user is loggedin and they have an admin role-->
   {{ users.currentUser }}
   <div v-if="users.isLoggedIn">
      <AdminDashboard />
   </div>

   <FeaturedItems />
</template>

<style scoped></style>
