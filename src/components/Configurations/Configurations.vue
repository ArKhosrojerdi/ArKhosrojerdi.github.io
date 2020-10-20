<template>
  <div class="d-flex flex-column flex-1 col-xl-6 col-lg-9 col-md-9 col-sm-12 col-12 mx-auto p-0">
    <div>
      <h6>نوع بازی</h6>
      <div>
        <button v-if="!gameTypesAppended" class="choose-game-type"
                @click="gameTypesAppended = !gameTypesAppended">
          {{ gameType }}
        </button>

        <div v-if="gameTypesAppended" class="d-flex flex-column align-items-center game-types"
             @click="gameTypesAppended = !gameTypesAppended">
          <button class="choose-game-type-child w-100" v-for="(gameType, index) in gameTypes" :key="index"
                  :value="gameType" @click="setGameType(gameType)">
            {{ gameType }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-4 d-flex flex-column">
      <h6>تعداد تیم‌ها</h6>
      <div class="num-bar">
        <div class="d-flex">
          <button class="btn-set btn-inc px-2" @click="addTeam" :disabled="teams.length >= 6">
            <i class="fa fa-plus"></i>
          </button>
          <h3 class="m-auto w-100">{{ toPersian(teams.length) }}</h3>
          <button class="btn-set btn-dec px-2" @click="removeTeam" :disabled="teams.length <= 2">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <div class="mt-2">
          <transition-group name="list">
            <input type="text" v-for="(team, index) in teams" :key="index" class="team-name mb-1 text-center"
                   v-model="team.name">
          </transition-group>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h6>تعداد دورها</h6>
      <div class="d-flex num-bar">
        <button class="btn-set btn-inc px-2" :disabled="totalRounds >= 20" @click="setNumberOfRounds(1)"
                :class="{active:interval}">
          <i class="fa fa-plus"></i>
        </button>
        <h3 class="m-auto">{{ toPersian(totalRounds) }}</h3>
        <button class="btn-set btn-dec px-2" :disabled="totalRounds <= 3" @click="setNumberOfRounds(-1)"
                :class="{active:interval}">
          <i class="fa fa-minus"></i>
        </button>
      </div>
    </div>

    <div class="mt-4">
      <h6 class="mb-2">زمان</h6>
      <div class="d-flex flex-row align-items-center align-content-center time-options-container">
        <button class="time-option" :class="{'active': autoTime}" @click="setAutoTime(true)">
          خودکار
        </button>
        <button class="time-option mr-auto" :class="{'active': !autoTime}" @click="setAutoTime(false)">
          دستی
        </button>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="!autoTime" class="mt-2">
          <div class="d-flex num-bar">
            <button class="btn-set btn-inc px-2" :disabled="time >= 300" @click="setTime(15)">
              <i class="fa fa-plus"></i>
            </button>
            <h3 class="m-auto">{{ toPersian(time) }} ثانیه</h3>
            <button class="btn-set btn-dec px-2" :disabled="time <= 30" @click="setTime(-15)">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div v-else class="mt-2 h-2h d-flex flex-column justify-content-center">
          <h6 class="m-0">
            زمان به نسبت
            <b>سختی</b>
            کلمه تنظیم می‌شود.
          </h6>
        </div>
      </transition>
    </div>

    <div class="d-flex flex-column flex-1 mt-4">
      <div class="mt-auto">
        <router-link to="/table">
          <button class="mt-auto nav-btn btn-border-tx-none wink px-2">برو!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';

export default {
  data() {
    return {
      gameTypesAppended: false,
      interval: false
    };
  },
  created() {
    this.initGame();
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    ...mapActions([
      'setNumberOfRounds',
      'addTeam',
      'removeTeam',
      'setAutoTime',
      'setTime',
      'setGameType',
      'initGame'
    ])
  },
  computed: {
    ...mapState([
      'totalRounds',
      'teams',
      'autoTime',
      'time',
      'gameTypes',
      'gameType'
    ]),
  },
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

.h-2h {
  height: 2.5rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.main-page {
  overflow: auto;
  border-radius: 2rem;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 0 16px 0 darken($primary_color, 7%);
}

.header-logo {
  height: 8rem;
  background-color: #F24B6A;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  box-shadow: 0 10px 4px -8px darken($light, 20%);
  position: relative;
  z-index: 70;
}

.header-logo h1 {
  width: 100%;
  color: $light;
  margin: 0;
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

.custom-select:focus {
  outline: none;
  box-shadow: none;
}

.choose-game-type {
  border-radius: .5rem;
  box-shadow: 0 0 8px 0 darken($light, 10%);
}

.choose-game-type:hover:enabled {
  box-shadow: 0 0 8px 0 darken($light, 25%);
}

.choose-game-type:focus {
  box-shadow: none;
}

.choose-game-type, .choose-game-type-child {
  background-color: $primary_color;
  color: $light;
  font-size: 20px;
  outline: none;
  border: none;
  width: 100%;
  height: 2.5rem;
  margin: 0;
}

.choose-game-type-child {
  border-top: 1px solid $light;
}

.choose-game-type-child:hover:enabled {
  background-color: darken($primary_color, 5%);
}

.choose-game-type-child:focus {
  background-color: darken($primary_color, 5%);
}

.choose-game-type-child:first-child {
  border-radius: .5rem;
  border-top: none;
}

.game-types {
  box-shadow: 0 0 8px 0 darken($light, 10%);
  padding: 0;
  margin: 0;
  //position: absolute;
  border-radius: .5rem;
  //width: calc(100% - 30px);
  width: 100%;
}

.mb-2h {
  margin-bottom: 72px;
}

.btn-set {
  outline: none;
  border: 4px solid darken($primary_color, 20%);
  border-radius: .5rem;
  height: 2.5rem;
  width: 2.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: block;
  background-color: $primary_color;
  box-shadow: 0 0 8px 0 darken($light, 10%);
  font-size: 16px;
  color: $light;
  font-weight: 900;
}

.btn-set.btn-dec {
  border-top: none;
  border-left: none;
}

.btn-set.btn-dec:disabled {
  border: 4px solid darken($primary_color, 5%);
  border-bottom: none;
  border-right: none;
}

.btn-set.btn-inc {
  border-top: none;
  border-right: none;
}

.btn-set.btn-inc:disabled {
  border: 4px solid darken($primary_color, 5%);
  border-bottom: none;
  border-left: none;
}

.btn-set:enabled:hover:enabled {
  cursor: pointer;
  box-shadow: 0 0 8px 0 darken($light, 25%);
}

.btn-set:focus:active:enabled {
  border: none
}

.btn-set:disabled {
  background-color: lighten($primary_color, 5%);
  border-color: darken($primary_color, 0%);
  cursor: not-allowed;
  color: darken($light, 10%);
}

.team-name {
  border: 1px solid darken($light, 20%);
  outline: none;
  width: 100%;
  border-radius: .5rem;
  padding: 6px 8px;
  color: #202020;
  background-color: darken($light, 10%);
  box-shadow: 0 0 2px 0 darken($light, 10%);
}

.team-name:focus, .team-name:active:enabled {
  box-shadow: 0 0 8px 0 darken($light, 10%);
  background-color: darken($light, 5%)
}

.nav-btn {
  outline: none;
  border: 4px solid darken($primary_color, 20%);
  background-color: $primary_color;
  border-radius: .5rem;
  color: $light;
  font-weight: 900;
  font-size: 24px;
  height: 4rem;
  width: 4rem;
  box-shadow: 0 0 8px 0 darken($light, 10%);
}

.nav-btn.btn-border-tx-none {
  border-top: none;
  border-left: none;
  border-right: none;
}

.wink {
  animation: wink 1s infinite linear;
}

.nav-btn:hover:enabled {
  box-shadow: 0 8px 10px 0 darken($light, 20%);
}

.nav-btn:active:enabled, .nav-btn:focus {
  border: none;
  outline: none;
}

.list-enter-active,
.list-leave-active {
  transition: all .4s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(1.5rem);
}

.time-options-container {
  height: 2.5rem;
  width: 100%;
}

.time-option {
  height: 100%;
  width: 49.5%;
  background-color: darken($light, 10%);
  border-radius: .5rem;
  border: 4px solid darken($light, 20%);
  border-top: none;
  color: #404040;
  outline: none;
  box-shadow: 0 2px 2px 0 darken($light, 10%);
}

.time-option.active {
  color: $light;
  background-color: #44A666;
  border-color: darken(#44A666, 10%);
}

.time-option:active:enabled {
  border: none;
}

.time-option:hover:enabled {
  box-shadow: 0 4px 4px 0 darken($light, 10%);
}

.time-option:last-child {
  border-left: none;
}

.time-option:first-child {
  border-right: none;
}

.d-flex .flex-column .flex-1 {
  flex: 1;
}

@keyframes wink {
  from {
    transform: scale(1);
    box-shadow: 0 2px 2px darken($light, 5%);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 3px 8px 1px darken($light, 20%);
  }
  to {
    transform: scale(1);
    box-shadow: 0 2px 2px darken($light, 5%);
  }
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
    box-shadow: 0 0 16px 0 darken($primary_color, 7%);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
//@media only screen and (min-width: 992px) and (max-width: 1199.98px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
//@media only screen and (min-width: 1200px) {...}

</style>
