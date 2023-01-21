//The figure data store should be imported from local storage.

import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFigureDataStore = defineStore('figureData', function () {
   const list = reactive([
      {
         id: '12e',
         slug: 'ant-man',
         name: 'Ant-Man',
         type: 'marvel',
         image: '/images/ant-man.jpg',
         price: '$12.99',
         description:
            "Hank Pym's alter-ego. After his wife's death at the hands of secret police, he vows to root out injustice wherever it lurks. His discovery of Pym Particles allows him to alter his size.",
      },
      {
         name: 'Square Soldier',
         slug: 'square-soldier',
         type: 'tv-show',
         image: '/images/square-soldier.jpg',
         price: '$14.99',
         description:
            'Foot soldier in the shadowy organization portrayed in the Korean hit Netflix series "Squid Game". Anonymous, armed, and taksed with keeping the game\'s competitors in line.',
      },
      {
         id: '23f',
         slug: 'witch-king',
         name: 'Witch-King of Angmar',
         type: 'lotr',
         image: '/images/witch-king.jpg',
         price: '$12.99',
         description:
            'Chief of the Nazgûl, the Ringwraiths, the holders of the nine Rings of Power the Dark Lord Sauron gifted to the leaders of Men. Fear is his chief weapon.',
      },

      {
         id: '23f',
         slug: 'tekken-king',
         name: 'Tekken King',
         type: 'video-game',
         image: '/images/tekken-king.jpg',
         price: '$12.99',
         description: '',
      },
      {
         id: '23f',
         slug: 'dj-khaled',
         name: 'DJ Khaled',
         type: 'music',
         image: '/images/dj-khaled.jpg',
         price: '$12.99',
         description: '',
      },
   ]);

   return { list: list };
});
