import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './utils/request'

Vue.prototype.$axios = request;

Vue.use(ElementUI)

import PearBlogComponents from './components/PearBlogComponents'
Vue.use(PearBlogComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
