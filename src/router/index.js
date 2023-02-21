import { createRouter, createWebHistory } from 'vue-router';

import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';

import CategoriesView from '../views/CategoriesView.vue';
import CategoryView from '../views/CategoryView.vue';
import SubcategoryView from '../views/SubcategoryView.vue';

import FiguresView from '../views/FiguresView.vue';
import FigureView from '../views/FigureView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';

import AdminDashboardView from '../views/AdminDashboard.vue';
import UserProfileView from '../views/UserProfileView.vue';
import CreateItemView from '../views/CreateItemView.vue';
import CreateCategoryView from '../views/CreateCategoryView.vue';
import CreateSubcategoryView from '../views/CreateSubcategoryView.vue';

import FirebaseTestView from '../views/FirebaseTestView.vue';
import SignInPage from '../views/pages/SignInPage.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
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
			path: '/categories',
			name: 'categories',
			component: CategoriesView,
		},
		{
			path: '/:cat',
			name: 'category',
			component: CategoryView,
		},
		{
			path: '/:cat/:sub',
			name: 'subcategory',
			component: SubcategoryView,
		},

		{
			path: '/figures',
			name: 'figures',
			component: FiguresView,
		},
		{
			//used for when a figure has no subcategory
			path: '/:cat/:figure',
			name: 'figure-no-sub',
			component: FigureView,
		},
		{
			//These are the route params! :)
			path: '/:cat/:sub/:figure', //<--- values here are used to filter down values to match for detail pages
			name: 'figure-with-sub',
			component: FigureView,
		},
		{
			path: '/shopping-cart',
			name: 'shopping-cart',
			component: ShoppingCartView,
		},
		{
			path: '/admin',
			name: 'user-dashboard',
			component: AdminDashboardView,
			children: [
				{
					path: '/admin/user-profile',
					name: 'create-item',
					component: UserProfileView,
				},
				{
					path: '/admin/create-item',
					name: 'create-item',
					component: CreateItemView,
				},
				{
					path: '/admin/create-category',
					name: 'create-category',
					component: CreateCategoryView,
				},
				{
					path: '/admin/create-subcategory',
					name: 'create-subcategory',
					component: CreateSubcategoryView,
				},
			],
		},
		{
			path: '/admin/user-profile',
			name: 'user-profile',
			component: UserProfileView,
		},
		{
			path: '/firebase-test',
			name: 'firebase-test',
			component: FirebaseTestView,
		},
		{
			path: '/signin-page',
			name: 'signin-page',
			component: SignInPage,
		},
	],
});

export default router;
