import '@/_common/bootstrap.js';

import Vue from 'vue';
import elementUI from '@/_common/components/ElementUi/index.js';
import router from './router';
import App from './App';

// Ui
Vue.use(elementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
