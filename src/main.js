import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebaseConfig'

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
    position: 'top-center',
    duration: 2000,
    keepOnHover: true,
    theme: "bubble"
})

import VCalendar from 'v-calendar';
Vue.use(VCalendar);

Vue.config.productionTip = false

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  // if (user) {
  //   store.dispatch('fetchUserProfile', user)
  // }
})