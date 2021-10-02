import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  },

  getters: {
    // Check if both Larry and Jenny are happy
    happyStaff: state => {
      return state.isLarryHappy && state.isJennyHappy
    }
  },

  mutations: {
    setWindowWidth (state, width) {
      state.windowWidth = width
    },
    setWindowHeight (state, height) {
      state.windowHeight = height
    }
  },

  actions: {
    // 認証APIを呼び出すstore
    fetchSomething (context, amount) {
      // fetch data ffrom API then commit
      // context.commit('setWindowSize', 0, 0)
      //
    }
  }
})
