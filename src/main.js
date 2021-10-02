// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueKonva from 'vue-konva'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import Toasted from 'vue-toasted'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(VueKonva)
Vue.use(Vuetify)
Vue.use(Toasted)
Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  }),
  components: { App },
  template: '<App/>'
})
