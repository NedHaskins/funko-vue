<script setup>
   //The page needs to check the slug of the page and check it against all of the items that share that category -- and then make them appear on the page.

   import { useRoute } from 'vue-router';
   import { useCategoriesStore } from '@/stores/categories';
   import { useFigureDataStore } from '@/stores/figureData';

   import SubcategoryCard from '@/components/SubcategoryCard.vue';
   import FigureList from '@/components/FigureList.vue';

   const route = useRoute();
   const categories = useCategoriesStore();
   const figures = useFigureDataStore();

   const category = categories.list.find(function (record) {
      return record.slug == route.params.cat; // this references the name of the path in the router file (index.js)
   });
   //List all the subcategories in a navigation menu below.

   let filteredFigures = [];

   figures.list.forEach(function (figure) {
      if (figure.category == route.params.cat) {
         //this is unique to this page -- it's calling for cat instead of sub
         filteredFigures.push(figure);
      }
   });

   console.log(route.params);
</script>

<template>
   <module-header>
      <h2>{{ category.name }}</h2>

      <h3>{{ category.blurb }}</h3>
   </module-header>

   <!--the conditional will go here.  If the category currently has subcategories...-->

   <ul class="subcategory-list" v-if="subcategories in category">
      <li v-for="subcategory in category.subcategories">
         <SubcategoryCard v-bind:category="category" v-bind:subcategory="subcategory" />
      </li>
   </ul>

   <ul class="figure-list" v-else>
      <FigureList v-bind:figures="filteredFigures" />
   </ul>
</template>

<style lang="scss" scoped>
   ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--scaffoldPadding);

      li {
         justify-self: center;
      }
   }
</style>
