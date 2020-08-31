import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebaseConfig'
import login from '../views/logIn'
import brews from '../views/brews'
import addBrewDay from '../views/addBrewDay'
import calendar from '../views/calendar'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/brews',
    name: 'brews',
    component: brews,
    meta: {
      requiresAuth: true
    }
  },{
    path: '/addBrewDay',
    name: 'addBrewDay',
    component: addBrewDay,
    meta: {
      requiresAuth: true
    }
  },{
    path: '/calendar',
    name: 'calendar',
    component: calendar,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
