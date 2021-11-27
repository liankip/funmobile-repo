import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import VueApexCharts from 'vue3-apexcharts';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import '@/assets/css/main.css'

const defaultDocumentTitle = 'Funmo Report'

router.beforeEach(to => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)

  store.dispatch('formScreenToggle', !!to.meta.formScreen)
})

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

import '@hennge/vue3-pagination/dist/vue3-pagination.css';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/tailwind.css'

const app = createApp(App);
app.use(VueApexCharts);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');
