<script setup>
   //The page needs to check the slug of the page and check it against all of the items that share that category -- and then make them appear on the page.

   import { useRoute } from 'vue-router';
   import { useCategoriesStore } from '@/stores/categories';

   import SubcategoryCard from '@/components/SubcategoryCard.vue';

   const route = useRoute();
   const categories = useCategoriesStore();

   const category = categories.list.find(function (record) {
      return record.slug == route.params.slug;
   });
   //List all the subcategories in a navigation menu below.
</script>

<template>
   {{ route.params }}
   <module-header>
      <h2>{{ category.name }}</h2>

      <h3>{{ category.blurb }}</h3>
   </module-header>
   <ul class="subcategory-list">
      <li v-for="subcategory in category.subcategories">
         <SubcategoryCard v-bind:subcategory="subcategory" v-bind:category="category" />
      </li>
   </ul>
</template>

<style lang="scss" scoped>
   ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--scaffoldPadding);
   }
</style>
