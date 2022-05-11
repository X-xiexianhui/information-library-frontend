// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './assets/css/backend.css'
import VueParticles from 'vue-particles'
import cookie from 'vue-cookies'
Vue.use(cookie)
Vue.use(VueParticles)
Vue.use(VXETable)
Vue.prototype.$http = axios
Vue.use(ElementUI)
let protocol = window.location.protocol
let host = window.location.host
console.log(host)
let reg = /^127.0.0.1+/
if (reg.test(host)) {
  axios.defaults.baseURL = 'http://127.0.0.1:80'
} else {
  axios.defaults.baseURL = protocol + '//' + host + ':80'
}

axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
