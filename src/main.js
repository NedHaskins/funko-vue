import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/css/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

// watch(
// 	pinia.state,
// 	(state) => {
// 		localStorage.setItem('shoppingCartData', JSON.stringify(state.shoppingCart));
// 	},
// 	{ deep: true }, //what does this mean?
// );
