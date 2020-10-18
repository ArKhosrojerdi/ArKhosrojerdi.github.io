<template>
  <div class="container main-page d-flex flex-column col-12 col-lg-6 col-sm-9 rounded-sm-0">
    <div class="header-logo d-flex flex-column align-content-center">
      <h1 class="my-auto" v-if="page === 'Main'">پانتونون</h1>
      <h1 class="my-auto" v-else-if="page === 'TableBody'">جدول تیم‌ها</h1>
      <h1 class="my-auto" v-else-if="page === 'Categories'">دسته‌بندی‌‌ها</h1>
    </div>
    <div class="game-settings d-flex flex-column flex-1">
      <div class="mx-auto col-lg-12 col-md-12 col-sm-12 col-12 py-4 d-flex flex-column flex-1">
        <transition name="fade">
          <router-view></router-view>
        </transition>

        <!--        <router-view>-->
        <!--          <transition name="fade" mode="out-in">-->
        <!--            <component :is="page"></component>-->
        <!--          </transition>-->
        <!--        </router-view>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.main-page {
  overflow: auto;
  border-radius: 2rem;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 0 16px 0 darken(#2669BF, 7%);
}

.header-logo {
  height: 8rem;
  background-color: #F24B6A;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 10px 8px -8px darken(#EFEFEF, 10%);
  z-index: 70;
}

.header-logo h1 {
  width: 100%;
  color: #EFEFEF;
}

.game-settings {
  min-height: 30rem;
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  align-content: center;
  border-radius: 0 0 2rem 2rem;
  position: relative;
}

.d-flex .flex-column .flex-1 {
  flex: 1;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .main-page {
    border-radius: 0;
    box-shadow: none;
  }

  .game-settings {
    border-radius: 0 0 .5rem .5rem;
    min-height: calc(100vh - 6rem - 30px) !important;
  }

  .header-logo {
    height: 6rem;
    border-radius: .5rem .5rem 0 0;
  }
}

/* Small devices (portrait tablets and large phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .main-page {
    border-radius: 0;
    box-shadow: none;
  }

  .game-settings {
    border-radius: 0 0 .5rem .5rem;
    min-height: calc(100vh - 8rem - 30px) !important;
  }

  .header-logo {
    border-radius: .5rem .5rem 0 0;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  .main-page {
    border-radius: 2rem;
    box-shadow: 0 0 16px 0 darken(#2669BF, 7%);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
//@media only screen and (min-width: 992px) and (max-width: 1199.98px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
//@media only screen and (min-width: 1200px) {...}

</style>
