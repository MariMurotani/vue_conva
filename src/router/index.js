import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import HelloConv from '@/pages/HelloConv'
import HelloVuetify from '@/pages/HelloVuetify'
import Toasted from 'vue-toasted'

Vue.use(Router)
Vue.use(Toasted)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/vueconva',
      name: 'HelloConva',
      component: HelloConv
    },
    {
      path: '/vuetify',
      name: 'HelloVuetify',
      component: HelloVuetify
    }
  ]
})
