import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFigureDataStore = defineStore('figureData', function () {
   const list = reactive([
      {
         id: '12e',
         slug: 'ant-man',
         name: 'Ant-Man',
         image: '../../public/images/ant-man.jpeg',
         price: '$12.99',
      },
      { name: 'Circle Soldier', image: '../../public/images/circle-soldier.jpeg', price: '$14.99' },
      {
         id: '23f',
         slug: 'witch-king',
         name: 'Witch-King of Angmar',
         image: '../../public/images/witch-king.png',
         price: '$12.99',
      },
   ]);

   return { list: list };
});
