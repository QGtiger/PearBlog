import Vue from 'vue'
import VueRouter from 'vue-router'
import shouye from './modules/shouye'
import ormshouye from './modules/orm/auth'
import utils from './modules/orm/utils'

Vue.use(VueRouter)

const routes = [
  ...shouye
]

const OrmRoutes = [
  ...ormshouye,
  ...utils
].map(item => {
  item.path = '/orm' + item.path
  if (item.redirect) item.redirect = '/orm' + item.redirect
  return item
})

const finalRoutes = [
  ...routes,
  ...OrmRoutes
]

console.log(finalRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: finalRoutes
})

export default router
