import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './utils/request'
import './assets/js/tweenMax/TweenMax.min.js'

// eslint-disable-next-line no-undef
console.log(TimelineMax)
Vue.prototype.$axios = request;
// eslint-disable-next-line no-undef
Vue.prototype.$timelineMax = TimelineMax

Vue.use(ElementUI)

import PearBlogComponents from './components/PearBlogComponents'
Vue.use(PearBlogComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
