import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';

import CategoriesView from '@/views/CategoriesView.vue';
import CategoryView from '@/views/CategoryView.vue';
import SubcategoryView from '@/views/SubcategoryView.vue';

import FiguresView from '@/views/FiguresView.vue';
import FigureView from '@/views/FigureView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';

import AdminDashboardView from '@/views/AdminDashboard.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import CreateItemView from '@/views/CreateItemView.vue';

import FirebaseTestView from '@/views/FirebaseTestView.vue';
import SignInPage from '@/views/pages/SignInPage.vue';

//Admin inventory views
import AdminInventoryView from '@/views/inventory/AdminInventoryView.vue';
import InventoryListView from '@/views/inventory/InventoryListView.vue';
import CreateFigureView from '@/views/inventory/CreateFigureView.vue';
import EditFigureView from '@/views/inventory/EditFigureView.vue';
import CreateCategoryView from '@/views/inventory/CreateCategoryView.vue';
import CreateSubcategoryView from '@/views/inventory/CreateSubcategoryView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'intro-1',
			component: () => import('@/views/page-intro/IntroView1.vue'),
		},
		{
			path: '/intro/2',
			name: 'intro-2',
			component: () => import('@/views/page-intro/IntroView2.vue'),
		},
		{
			path: '/intro/3',
			name: 'intro-3',
			component: () => import('@/views/page-intro/IntroView3.vue'),
		},
		{
			path: '/intro/4',
			name: 'intro-4',
			component: () => import('@/views/page-intro/IntroView4.vue'),
		},
		{
			path: '/home',
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
			path: '/figures',
			name: 'figures',
			component: FiguresView,
		},
		{
			//used for when a figure has no subcategory
			//Order matters here.  This one must be listed first so that figures with no subcategories can be properly loaded.
			//The best solution may be to use a completely different URL.
			path: '/:cat/:figure',
			name: 'figure-no-sub',
			component: FigureView,
		},
		{
			path: '/:cat/:sub',
			name: 'subcategory',
			component: SubcategoryView,
		},
		{
			//These are the route params! :)
			path: '/figure/:cat/:sub/:figure', //<--- values here are used to filter down values to match for detail pages
			name: 'figure-with-sub',
			component: FigureView,
		},
		{
			path: '/shopping-cart',
			name: 'shopping-cart',
			component: ShoppingCartView,
			meta: { requiresAuth: true },
		},
		{
			path: '/admin',
			name: 'user-dashboard',
			component: AdminDashboardView,
			meta: { requiresAuth: true },
			children: [
				{
					path: '/admin/user-profile',
					name: 'user-profile',
					component: UserProfileView,
				},
				{
					path: '/admin/create-item',
					name: 'create-item',
					component: CreateItemView,
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
		{
			path: '/inventory',
			name: 'inventory',
			component: AdminInventoryView,
			children: [
				{
					path: '/inventory/figure-list',
					name: 'figure-list',
					component: InventoryListView,
				},
				{
					path: '/inventory/create-figure',
					name: 'create-figure',
					component: CreateFigureView,
				},
				{
					path: '/inventory/edit/:slug',
					name: 'edit-figure',
					component: EditFigureView,
				},
				{
					path: '/inventory/create-category',
					name: 'create-category',
					component: CreateCategoryView,
				},
				{
					path: '/inventory/create-subcategory',
					name: 'create-subcategory',
					component: CreateSubcategoryView,
				},
			],
		},
	],
});

router.beforeEach(async (to) => {
	// routes with `meta: { requiresAuth: true }` will check for the users, others won't
	if (to.meta.requiresAuth) {
		const currentUser = await getCurrentUser();
		// if the user is not logged in, redirect to the login page
		if (!currentUser) {
			return {
				path: '/signin-page',
				query: {
					// we keep the current path in the query so we can redirect to it after login
					// with `router.push(route.query.redirect || '/')`
					redirect: to.fullPath,
				},
			};
		}
	}
});

export default router;
