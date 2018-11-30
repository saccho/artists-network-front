<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from '@/components/MyFooter'

export default {
  name: 'App',
  components: {
    MyFooter
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
