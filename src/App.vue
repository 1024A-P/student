<template>
  <div id="app">
    <wj-login v-if="setLogin"></wj-login>
    <wj-header v-if="!setLogin"></wj-header>
    <router-view v-if="!setLogin"></router-view>
    <wj-footer v-if="!setLogin"></wj-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      setLogin: true
    }
  },
  mounted () {
    if (sessionStorage.studentInfo) this.setLogin = false
  }
}
</script>

<style>
html,body,#app{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
