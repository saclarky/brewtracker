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
  
  components: {navigation, navigationUser},
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>

<style>
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