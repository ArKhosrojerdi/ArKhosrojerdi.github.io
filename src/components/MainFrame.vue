<template>
  <div class="container main-page d-flex flex-column col-12 col-lg-6 col-sm-9 rounded-sm-0">

    <Header/>

    <div class="game-settings d-flex flex-column flex-1">
      <div class="mx-auto col-lg-12 col-md-12 col-sm-12 col-12 py-4 d-flex flex-column flex-1">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669bf;
$light: #EFEFEF;

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
  box-shadow: 0 0 16px 0 darken($primary_color, 7%);
}

.game-settings {
  min-height: 30rem;
  background-color: $light;
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

</style>
