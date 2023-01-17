import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFigureDataStore = defineStore('figureData', function () {
   const list = reactive([
      {
         name: 'Ant-Man',
         image: '../../public/images/ant-man.jpeg',
         price: '$12.99',
      },
      { name: 'Circle Soldier', image: '../../public/images/circle-soldier.jpeg', price: '$14.99' },
      {
         name: 'Witch-King of Angmar',
         image: '../../public/images/witch-king.png',
         price: '$12.99',
      },
   ]);

   return { list: list };
});
