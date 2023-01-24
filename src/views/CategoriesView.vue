<script setup>
   import { useCategoriesStore } from '@/stores/categories';

   const categories = useCategoriesStore();
</script>

<template>
   <h2>This page will list all of the high-level categories for the figures.</h2>

   <ul>
      <li v-for="category in categories.list">
         <RouterLink v-bind:to="`/category/${category.slug}`"
            ><h3>{{ category.name }}</h3></RouterLink
         >
      </li>
   </ul>
</template>

<style>
   li {
      font-size: 24px;
      font-family: 'Bangers';
   }
</style>
