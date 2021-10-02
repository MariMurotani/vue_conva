<template>
  <v-app>

  <v-app-bar app>
    たいとるとか
    <bread-crumbs></bread-crumbs>
  </v-app-bar>

  <v-navigation-drawer app>
    <left-menu></left-menu>
  </v-navigation-drawer>

  <!-- アプリケーションのコンポーネントに基づいてコンテンツのサイズを決定 -->
  <v-main>

    <!-- アプリケーションに適切なgutterを提供 -->
    <v-container fluid>

      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>

  </v-app>
</template>

<script>
import leftMenu from './components/LeftMenu'
import BreadCrumbs from './components/BreadCrumbs'

export default {
  name: 'App',
  components: {
    leftMenu,
    BreadCrumbs
  },
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
  },
  methods: {
    handleResize: function () {
      this.$store.commit('setWindowWidth', window.innerWidth)
      this.$store.commit('setWindowHeight', window.innerHeight)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
