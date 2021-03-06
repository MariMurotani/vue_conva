import Vue from 'vue'
import Router from 'vue-router'
import HelloConv from '@/pages/HelloConv'
import HelloVuetify from '@/pages/HelloVuetify'
import LayoutVuetify from '@/pages/LayoutVuetify'
import Sender from '@/pages/Sender'
import Receiver from '@/pages/Receiver'

Vue.use(Router)

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
    },
    {
      path: '/layout_vuetify',
      name: 'LayoutVuetify',
      component: LayoutVuetify
    },
    {
      path: '/sender',
      name: 'Sender',
      component: Sender
    },
    {
      path: '/receiver',
      name: 'Receiver',
      component: Receiver
    }
  ]
})
