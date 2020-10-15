import { createApp } from 'vue';
import App from './App.vue';

import router  from './router';
import { store } from "./store/index";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../public/fontawesome-free-5.15.1-web/css/all.min.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

