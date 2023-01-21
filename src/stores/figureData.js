//The figure data store should be imported from local storage.

import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFigureDataStore = defineStore('figureData', function () {
   const list = reactive([
      {
         id: '3udhdhj',
         slug: 'galadriel',
         name: 'Galadriel',
         category: 'lotr',
         subcategory: 'elves',
         image: '/images/galadriel.png',
         price: 12.99,
         description:
            'Lady of Lórien, one of the last High Elves to dwell in Middle-Earth in the Third Age. Holder of Nenya, one of the Elven Rings of Power.',
      },
      {
         id: '3udhdhj',
         slug: 'legolas',
         name: 'Legolas',
         category: 'lotr',
         subcategory: 'elves',
         image: '/images/legolas.png',
         price: 12.99,
         description:
            'Son of Thranduil, King of the Elves of Mirkwood. One of the Nine Companions that set out to Mordor to destroy the One Ring.',
      },
   ]);

   return { list: list };
});
