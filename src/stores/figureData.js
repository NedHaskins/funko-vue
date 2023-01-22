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
         image: '/images/galadriel.jpg',
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
         image: '/images/legolas.jpg',
         price: 12.99,
         description:
            'Son of Thranduil, King of the Elves of Mirkwood. One of the Nine Companions that set out to Mordor to destroy the One Ring.',
      },

      {
         id: '329djnn',
         slug: 'square-soldier',
         name: 'Square Soldier',
         category: 'tv-show',
         subcategory: 'squid-game',
         image: '/images/square-soldier.jpg',
         price: 14.99,
         description:
            'Member of management in the shadowy organization portrayed in the Korean hit Netflix series "Squid Game". Anonymous, armed, and tasked with keeping the game\'s competitors in line.',
      },
   ]);

   return { list: list };
});
