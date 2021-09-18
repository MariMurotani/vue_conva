<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <h1>Test Application for Quick study</h1>
    [ <router-link to="/conv">VueConv</router-link> | <router-link to="/vuetify">Vuetify</router-link> ]
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
