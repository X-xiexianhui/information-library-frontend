import Vue from 'vue';
import VueRouter from 'VueRouter';
import VueForm from '@lljj/vue-json-schema-form';
import elementUI from '@/_common/components/ElementUi/index.js';
import routes from './router/router';

import App from './App';

Vue.use(VueRouter);
Vue.component('VueForm', VueForm);
// Ui
Vue.use(elementUI);

new Vue({
    router: new VueRouter({
        mode: 'hash',
        routes,
        scrollBehavior() {
            return { x: 0, y: 0 };
        }
    }),
    render: h => h(App)
}).$mount('#app');
