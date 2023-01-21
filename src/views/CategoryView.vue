<script setup>
   //The page needs to check the slug of the page and check it against all of the items that share that category -- and then make them appear on the page.

   import { useRoute } from 'vue-router';
   import { useCategoriesStore } from '@/stores/categories';

   const route = useRoute();
   const categories = useCategoriesStore();

   const category = categories.list.find(function (record) {
      return record.slug == route.params.slug;
   });

   //List all the subcategories in a navigation menu below.
</script>

<template>
   <h1>{{ category.name }}</h1>

   <h2>This page will list subpages within the chosen category.</h2>

   <ul class="subcategory-list">
      <li v-for="subcategory in category.subcategories">
         <RouterLink v-bind:to="`/subcategory/${subcategory.slug}`"
            ><h3>{{ subcategory.name }}</h3></RouterLink
         >
      </li>
   </ul>
</template>
