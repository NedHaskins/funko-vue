import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import { VueFire, VueFireAuth } from 'vuefire';

import App from './App.vue';
import router from './router';

import './assets/css/main.css';

import { firebaseApp } from '@/firebase';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);

app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
});

app.mount('#app');

watch(
	pinia.state,
	(state) => {
		localStorage.setItem('shoppingCartData', JSON.stringify(state.shoppingCart));
	},
	{ deep: true }, //what does this mean?
);
