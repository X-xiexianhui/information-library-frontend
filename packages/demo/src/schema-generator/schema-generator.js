import '@/_common/bootstrap.js';

import Vue from 'vue';
import elementUI from '@/_common/components/ElementUi/index.js';
import router from './router';
import App from './App';
import store from './store/store';

// Ui
Vue.use(elementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
