<script setup>
   //Vue imports
   import { onMounted } from 'vue';
   import { useRoute } from 'vue-router';

   //Vue components
   import SubcategoryCard from '@/components/SubcategoryCard.vue';
   import FigureList from '@/components/FigureList.vue';

   //Firestore / Vuefire imports
   import { useFirestore, useDocument, useCollection } from 'vuefire';
   import { collection, doc, getDoc, query, where } from 'firebase/firestore';

   //Vuefire variables
   const db = useFirestore();
   const route = useRoute();

   //Firestore variables
   const figures = useCollection(collection(db, 'figures'));
   const categories = useCollection(collection(db, 'categories'));
   const category = useDocument(doc(db, 'categories', route.params.cat));
   const subcategories = useCollection(collection(db, 'categories', route.params.cat, 'subcategories'));

   const filterFiguresByCategoryRef = query(collection(db, 'figures'), where('category', '==', route.params.cat));
   const filterFiguresByCategory = useCollection(filterFiguresByCategoryRef);
</script>

<template>
   <module-header>
      <p>{{ subcategories }}</p>
      <h2>{{ category.name }}</h2>
      <h3>{{ category.blurb }}</h3>
   </module-header>

   <!--if the current category selected has any subcategories-->
   <ul class="subcategory-list" v-if="subcategories.length">
      <li v-for="subcategory in subcategories">
         <SubcategoryCard v-bind:category="category" v-bind:subcategory="subcategory" />
      </li>
   </ul>

   <FigureList v-else v-bind:figures="filterFiguresByCategory" />
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
