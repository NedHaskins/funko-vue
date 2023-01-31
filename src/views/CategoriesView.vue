<script setup>
   import { ref, onMounted } from 'vue';

   import CategoryCard from '@/components/CategoryCard.vue';

   import { useCategoriesStore } from '@/stores/categories';

   import RainbowLetters from '@/scripts/rainbowLetters';
   const categories = useCategoriesStore();

   const container = ref(null);

   onMounted(function () {
      RainbowLetters('Choose a category!');
   });
</script>

<template>
   <module-header>
      <div id="letters-container" ref="container"></div>
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

   li {
      justify-self: center;
   }
</style>
