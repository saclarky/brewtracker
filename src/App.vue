<template>
  <div id="app">
    <navigation id="nav"></navigation>
    <navigationUser v-if="currentUser" id="navUser"></navigationUser>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import navigation from './components/navigation/navigation'
import navigationUser from './components/navigation/navigationUser'

export default {
  created() {
this.$store.dispatch('initAllBrewData').then(() => {
  console.log('firebase load done')
}) 
  },
  components: {navigation, navigationUser},
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Yantramanav&display=swap');
@import '../node_modules/vue2-timepicker/dist/VueTimepicker.css';
html, body {
  font-family: 'Yantramanav', sans-serif;
  font-size: 16pt;
  
  box-sizing: border-box;
}
html {
  height: calc(100% - 79px);
}
body {
  margin: 0 auto;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}
.navOffset {
  position: relative;
  top: 79px;
  height: 100%;
}
.row {
    display: flex;
    flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #34db9b;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
</style>