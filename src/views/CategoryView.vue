<script setup>
   import { onMounted } from 'vue';

   import { useRoute } from 'vue-router';

   import SubcategoryCard from '@/components/SubcategoryCard.vue';
   import FigureList from '@/components/FigureList.vue';

   //FIRESTORE IMPORTS

   import { useFirestore, useDocument, useCollection } from 'vuefire';
   import { collection, doc, getDoc, query, where } from 'firebase/firestore';
   const db = useFirestore();

   const route = useRoute();

   const figures = useCollection(collection(db, 'figures'));
   const categories = useCollection(collection(db, 'categories'));

   const category = useDocument(doc(db, 'categories', route.params.cat));

   const subcategories = useCollection(collection(db, 'categories', route.params.cat, 'subcategories'));

   // if (category.value) {
   //    console.log('Value detected');
   // }

   // let filteredFigures = [];

   // for (figure in figures) {
   //    if (figure.category == route.params.cat) {
   //       //this is unique to this page -- it's calling for cat instead of sub
   //       filteredFigures.push(figure);
   //    }
   // }
</script>

<template>
   <module-header>
      <h2>{{ category.name }}</h2>
      <h3>{{ category.blurb }}</h3>
   </module-header>

   <ul class="subcategory-list" v-if="subcategories">
      <li v-for="subcategory in subcategories">
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

   h2 {
      margin-top: 30px;
   }
</style>
