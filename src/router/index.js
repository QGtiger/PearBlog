import Vue from 'vue'
import VueRouter from 'vue-router'
import shouye from './modules/shouye'
import ormshouye from './modules/orm/auth'

Vue.use(VueRouter)

const routes = [
  ...shouye
]

const OrmRoutes = [
  ...ormshouye
].map(item => {
  item.path = '/orm' + item.path
  return item
})

const finalRoutes = [
  ...routes,
  ...OrmRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: finalRoutes
})

export default router
