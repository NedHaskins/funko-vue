<script setup>
   import { useCategoryStore } from '@/stores/categories';

   const categories = useCategoryStore();
</script>

<template>
   <h2>This page will list all of the high-level categories for the figures.</h2>

   <ul>
      <li v-for="category in categories.list">
         <RouterLink v-bind:to="`/categories/${category.slug}`"
            ><h3>{{ category.name }}</h3></RouterLink
         >
      </li>
   </ul>
</template>

<style>
   li {
      font-size: 24px;
   }
</style>
