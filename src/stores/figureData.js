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
         image: '/images/categories/lotr/elves/galadriel.jpg',
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
         image: '/images/categories/lotr/elves/legolas.jpg',
         price: 12.99,
         description:
            'Son of Thranduil, King of the Elves of Mirkwood. One of the Nine Companions that set out to Mordor to destroy the One Ring.',
      },

      {
         id: '329djnn',
         slug: 'square-soldier',
         name: 'Square Soldier',
         category: 'tv',
         subcategory: 'squid-game',
         image: '/images/categories/tv/squid-game/masked-manager.jpg',
         price: 14.99,
         description:
            'Member of management in the shadowy organization portrayed in the Korean hit Netflix series "Squid Game". Anonymous, armed, and tasked with keeping the game\'s competitors in line.',
      },

      {
         id: '1234983jdd',
         slug: 'ryomen-sukuna',
         name: 'Ryomen Sukuna',
         category: 'anime',
         subcategory: 'jujutsu-kaisen',
         image: '/images/categories/anime/ryomen-sukuna.jpg',
         price: 14.99,
         description: 'The King of Curses',
      },
      {
         id: '1234983jdd',
         slug: 'wolverine',
         name: 'Wolverine',
         category: 'marvel',
         image: '/images/categories/marvel/wolverine.jpg',
         price: 14.99,
         description:
            'Powerful mutant with healing abilities and an Adamantium skeleton.  Captured and experimented on in the Weapon X program.',
      },
      {
         id: '1234983jdd',
         slug: 'homer-in-hedges',
         name: 'Homer in Hedges',
         category: 'memes',
         image: '/images/categories/memes/homer-in-hedges.jpg',
         price: 14.99,
         description: 'Protagonist of "The Simpsons."',
      },
      {
         id: '1234983jdd',
         slug: 'agent-smith',
         name: 'Agent Smith',
         category: 'movies',
         subcategory: 'the-matrix',
         image: '/images/categories/movies/the-matrix/agent-smith.jpg',
         price: 14.99,
         description:
            'Main antagonist of the world of the Matrix, out to destroy the remnant of humanity still fighting the System.',
      },
      {
         id: '1234983jdd',
         slug: 'slash',
         name: 'Slash',
         category: 'music',
         subcategory: '1980s',
         image: '/images/categories/music/1980s/slash.jpg',
         price: 14.99,
         description: "The untamed lead guitarist for Guns 'n' Roses at the beginning of their career.",
      },
      {
         id: '1234983jdd',
         slug: 'grumpy-cat',
         name: 'Grumpy Cat',
         category: 'memes',
         image: '/images/categories/memes/grumpy-cat.jpg',
         price: 14.99,
         description:
            "This cat (real name Tardar Sauce)'s photo went viral in 2012 after photographs of her sour expression emerged online.",
      },
      {
         id: '1234983jdd',
         slug: 'this-is-fine-dog',
         name: 'This is Fine Dog',
         category: 'memes',
         image: '/images/categories/memes/this-is-fine-dog.jpg',
         price: 14.99,
         description:
            "The meme comes from KC Green's six-panel comic “On Fire.” In the first, the dog, wearing a small bowler hat, sits at a table, surrounded by flames. In the second, the dog smiles brightly and says, “This is fine.”",
      },
      {
         id: '1234983jdd',
         slug: 'iron-man',
         name: 'Iron Man',
         category: 'marvel',
         image: '/images/categories/marvel/iron-man.jpg',
         price: 14.99,
         description:
            'Tony Stark, a wealthy business magnate and inventor, suffers a grievous chest injury during a kidnapping. When his captors try to force him to build a weapon of mass destruction, he instead builds a prototype of his fmaous suit to help him escape...',
      },
   ]);

   return { list: list };
});
