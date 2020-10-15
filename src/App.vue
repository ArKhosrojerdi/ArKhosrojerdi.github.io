<template>
  <div id="app" class="mt-md-5 mt-sm-0 mt-0 rounded-sm-0">
    <!--    <MainPage/>-->
    <router-view/>
    <!--    <Clouds/>-->
  </div>
</template>

<script>
// import MainPage from './components/MainPage.vue';
// import Clouds from './components/Clouds.vue'

export default {
  name: 'App',
  components: {
    // MainPage,
    // Clouds
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Yekan';
  src: url('~@/assets/fonts/yekan-font/Yekan.eot'); /* IE9 Compat Modes */
  src: url('~@/assets/fonts/yekan-font/Yekan.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    //url('~@/assets/fonts/yekan-font/Yekan.woff2') format('woff2'), /* Modern Browsers */
  url('~@/assets/fonts/yekan-font/Yekan.woff') format('woff'), /* Modern Browsers */
    //url('~@/assets/fonts/yekan-font/Yekan.otf') format('opentype'), /* Open Type Font */
  url('~@/assets/fonts/yekan-font/Yekan.ttf') format('truetype'), /* Safari, Android, iOS */
  url('~@/assets/fonts/yekan-font/Yekan.svg#Yekan') format('svg'); /* Legacy iOS */
  font-weight: normal;
  font-style: normal;
}

html, body {
  background-color: #2669BF;
  direction: rtl;
}

#app {
  font-family: 'Yekan', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2669BF;
  line-height: 1;
}

button {
  outline: none !important;
  border: none;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}
</style>
