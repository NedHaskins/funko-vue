<script setup>
   import CategoryCard from '@/components/CategoryCard.vue';

   import { useCategoriesStore } from '@/stores/categories';

   const categories = useCategoriesStore();
</script>

<template>
   <module-header>
      <h2>Choose a category!</h2>
   </module-header>

   <ul>
      <li v-for="item in categories.list">
         <CategoryCard v-bind:category="item" />
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
