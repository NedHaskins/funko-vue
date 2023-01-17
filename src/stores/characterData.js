import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCharacterDataStore = defineStore('characterData', function () {
   const list = reactive([
      {
         name: 'Fëanor',
         type: 'elf',
      },
      { name: 'Galadriel', type: 'elf' },
   ]);

   return { list: list };
});
