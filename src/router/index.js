import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';

import UserLoginView from '../views/UserLoginView.vue';

import CategoriesView from '../views/CategoriesView.vue';
import CategoryView from '../views/CategoryView.vue';
import SubcategoryView from '../views/SubcategoryView.vue';

import FiguresView from '../views/FiguresView.vue';
import FigureView from '../views/FigureView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';
import CreateItemView from '../views/CreateItemView.vue';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         name: 'home',
         component: HomeView,
      },
      // {
      //    path: '/about',
      //    name: 'about',
      //    // route level code-splitting
      //    // this generates a separate chunk (About.[hash].js) for this route
      //    // which is lazy-loaded when the route is visited.
      //    component: () => import('../views/AboutView.vue'),
      // },
      {
         path: '/about',
         name: 'about',
         component: AboutView,
      },
      {
         path: '/contact',
         name: 'contact',
         component: ContactView,
      },
      {
         path: '/login',
         name: 'login',
         component: UserLoginView,
      },
      {
         path: '/categories',
         name: 'categories',
         component: CategoriesView,
      },
      {
         path: '/category/:slug',
         name: 'category',
         component: CategoryView,
      },

      {
         path: '/figures',
         name: 'figures',
         component: FiguresView,
      },
      {
         path: '/subcategory/:slug',
         name: 'subcategory',
         component: SubcategoryView,
      },

      {
         path: '/figure/:slug',
         name: 'figure',
         component: FigureView,
      },
      {
         path: '/shopping-cart',
         name: 'shopping-cart',
         component: ShoppingCartView,
      },
      {
         path: '/create-item',
         name: 'create-item',
         component: CreateItemView,
      },
   ],
});

export default router;
