<template>
  <div id="app">
    <router-view class="my-md-5 my-sm-0"/>
<!--        <Clouds/>-->
  </div>
</template>

<script>
// import Clouds from './components/Clouds.vue'

export default {
  name: 'App',
  // components: {
    // Clouds
  // }
}
</script>

<style lang="scss">
$primary_color: #2669BF;

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
  background-color: $primary_color;
  direction: rtl;
}

#app {
  position: relative;
  overflow: auto;
  min-height: 100vh;
  font-family: 'Yekan', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //background-color: $primary_color;
  line-height: 1;

  background: rgb(38,105,191);
  background: linear-gradient(180deg, rgba(38,105,191,1) 0%, rgba(38,140,191,1) 100%);
}

button {
  outline: none !important;
  border: none;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}
</style>
