const categories = useCollection(collection(db, 'categories'));

const selectedCategoryId = ref(null);

const subcategoriesCollection = computed(function () {
   if (selectedCategoryId.value) {
      return collection(db, 'restaurants', selectedCategoryId.value, 'subcategories');
   } else {
      // something ?
   }
});

const subcategories = useCollection(subcategoryCollection);

const selectedSubcategoriesId = ref(null);

watch(selectedCategoryId, function (a, b) {
   console.log('restaurant changed');
   selectedSubcategoriesId.value = null;
});

for (let key in categories._rawValue) {
   console.log(categories._rawValue[key]);
   for (let subkey in categories._rawValue[key]) {
      if (subkey === 'subcategories') {
         console.log(categories._rawValue[key][subkey]);
         for (let innerKey in categories._rawValue[key][subkey]) {
            console.log(innerKey);
         }
      }
   }
}
