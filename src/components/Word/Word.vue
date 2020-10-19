<template>
  <!--    <transition name="fade-word" mode="out-in">-->
  <div class="container main-page d-flex flex-column col-12 col-lg-6 col-sm-9">
    <div class="game-settings d-flex flex-column align-content-center">
      <div class="my-4 mx-auto col-lg-9 col-md-9 col-sm-12 col-12 d-flex flex-column flex-1">
        <div v-if="!fail && !success" class="d-flex flex-column flex-1">
          <WordHeader :catName="catName" :catId="catId"/>

          <div class="d-flex flex-column flex-1">
            <h1 class="my-auto">
              <b>{{ word }}</b>
            </h1>
          </div>

          <div class="mt-auto mb-4">
            <h5>{{ toPersian(timer) }}
              ثانیه
            </h5>
            <div class="progress ltr" :class="{'warn': timer <= 15}">
              <div class="progress-bar" :class="{'bg-danger': timer <= 15}" role="progressbar"
                   :style="{'width': volume() + '%'}"
                   :aria-valuenow="volume"
                   aria-valuemin="0" aria-valuemax="100">
              </div>
            </div>
          </div>

          <div v-if="!hasStarted" class="d-flex flex-row hide"
               :class="{'justify-content-between': changed === 0, 'justify-content-center': changed === 1}">
            <button @click="start" class="nav-btn mt-auto px-2"
                    :class="{'btn-border-tr-none': changed === 0, 'btn-border-tx-none': changed === 1}">
              <i class="fas fa-play"></i>
            </button>
            <button v-if="changed === 0" @click="fetchNewWord"
                    class="nav-btn btn-border-tl-none nav-btn-warning mt-auto px-2">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>

          <div v-else class="d-flex align-content-between align-items-between justify-content-between">
            <button class="nav-btn btn-border-tr-none mt-auto px-2" @click="succeed">
              <i class="fas fa-check"></i>
            </button>
            <button class="nav-btn nav-btn-warning btn-border-tx-none mt-auto px-2" @click="submitFault">
              <i class="fas fa-exclamation-triangle"></i>
            </button>
            <button class="nav-btn nav-btn-danger btn-border-tl-none mt-auto px-2" @click="failed">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>

        <transition name="fade">
          <div v-if="fail" class="alert-body d-flex flex-column flex-1">
            <div class="py-2 row alert-fail col-12 mx-auto">
              <h1 class="mx-auto">
                باختی که!
              </h1>
            </div>

            <TurnScore :faults="faults" :changed="changed" :savedTime="0" :point="0"/>
          </div>
        </transition>

        <transition name="fade2">
          <div v-if="success" class="alert-body d-flex flex-column flex-1">
            <div class="py-2 row alert-success col-12 mx-auto">
              <h1 class="mx-auto">
                ایول!
              </h1>
            </div>

            <TurnScore :faults="faults" :changed="changed" :savedTime="savedTime" :point="point"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <!--    </transition>-->
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

import TurnScore from './Score.vue';
import WordHeader from './WordHeader.vue';

export default {
  data() {
    return {
      word: {},
      wordId: 0,
      hasStarted: false,
      timer: 0,
      fail: false,
      success: false,
      catId: 0,
      catName: '',
      point: 0,
      changed: 0,
      faults: 0,
      savedTime: 0,
    }
  },
  components: {
    TurnScore,
    WordHeader
  },
  created() {
    this.timer = this.time;
    this.findWord();
    this.word = this.currentWord.name;
    this.wordId = this.currentWord.id;
    this.catId = this.getCategoryId();
    this.catName = this.getCategoryName();
    this.point = this.getCategoryPoint();
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    absolutePoint() {
      return this.toPersian(Math.abs(this.point));
    },
    submitFault() {
      if (this.faults === 0)
        this.faults++;
      else this.faults *= 2;
    },
    start() {
      this.hasStarted = true;
      this.countDownTimer();
    },
    stop() {
      this.hasStarted = false;
      clearTimeout(this.hasStarted);
    },
    countDownTimer() {
      if (this.timer > 0) {
        this.timer -= 1;
        setTimeout(() => {
          this.countDownTimer();
        }, 1000);
      } else {
        if (this.success === false) {
          this.failed();
        }
      }
    },
    failed() {
      stop();
      this.fail = true;
      this.point = 0;
    },
    succeed() {
      stop();
      this.savedTime = this.timer;
      if (this.point > 0)
        this.success = true;
      else this.fail = true;
    },
    volume() {
      return this.timer * 100 / this.time;
    },
    fetchNewWord() {
      this.changed = 1;
      this.changeWord();
      this.wordId = this.currentWord.id;
      this.word = this.currentWord.name;
    },
    ...mapGetters([
      'getCategoryName',
      'getCategoryId',
      'getCategoryPoint',
    ]),
    ...mapActions([
      'findWord',
      'addPoint',
      'changeWord'
    ]),
  },
  computed: {
    ...mapState([
      'time',
      'words',
      'currentWord'
    ]),
  },
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

.ltr {
  direction: ltr;
}

.fade-word-enter-active,
.fade-word-leave-active {
  transition: all 0.4s ease;
}

.fade-word-enter-from,
.fade-word-leave-to {
  opacity: 0;
}

.main-page {
  border-radius: 2rem;
  padding: 15px;
  z-index: 100;
  box-shadow: 0 0 16px 0 darken($primary_color, 7%);
}

.game-settings {
  min-height: 38rem;
  background-color: $light;
  border-radius: 2rem;
}

.nav-btn {
  outline: none;
  border: 4px solid darken($primary_color, 20%);
  background-color: $primary_color;
  border-radius: .5rem;
  color: $light;
  font-weight: 900;
  font-size: 24px;
  line-height: 100%;
  height: 4rem;
  min-width: 4rem;
  max-width: 4rem;
  box-shadow: 0 2px 4px 0 darken($light, 10%);
}

.nav-btn:hover {
  box-shadow: 0 4px 6px 0 darken($light, 20%);
}

.nav-btn:active {
  box-shadow: none;
  border: none;
}

.nav-btn.btn-border-tl-none {
  border-top: none;
  border-left: none;
}

.nav-btn.btn-border-tx-none {
  border-top: none;
  border-left: none;
  border-right: none;
}

.nav-btn.btn-border-tr-none {
  border-top: none;
  border-right: none;
}

.nav-btn.nav-btn-warning {
  background-color: darken(#F2C777, 5%);
  border-color: darken(#F2C777, 20%);
}

.nav-btn.nav-btn-danger {
  background-color: darken(#F24B6A, 5%);
  border-color: darken(#F24B6A, 20%);
}

.progress {
  background-color: darken($light, 12%);
  height: 1.5rem;
  box-shadow: 0 6px 8px 0 darken($light, 20%);
}

.warn {
  animation: warn 1s infinite;
}

.fail-container {
  background-color: darken($primary_color, 10%);
}

.alert-body {
  min-height: 30rem;
}

.alert-body .alert-fail {
  background-color: darken(#F24B6A, 5%);
  color: $light;
  border-radius: .5rem;
  box-shadow: 0 4px 4px 0 darken($light, 10%);
  border-bottom: 6px solid darken(#F24B6A, 20%);
}

.alert-body .alert-success {
  background-color: darken(#44A666, 5%);
  color: $light;
  border-radius: .5rem;
  box-shadow: 0 4px 4px 0 darken($light, 10%);
  border-bottom: 6px solid darken(#44A666, 20%);
}

.progress .progress-bar {
  background-color: $primary_color;
  transition: width 1s linear !important;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

.hide.justify-content-center {
  animation: hide .4s ease-in;
}

.fade-enter-active, .fade-leave-active {
  animation: fade .2s ease-in;
}

.fade2-enter-active, .fade2-leave-active {
  animation: fade .2s ease-in;
}

@keyframes hide {
  from {
    margin-left: -webkit-calc(100% - 4rem);
    margin-left: -moz-calc(100% - 4rem);
    margin-left: calc(100% - 4rem);
  }
  to {
    margin-left: 0;
  }
}

@keyframes fade {
  0% {
    transform: scale(.5);
  }
  66% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fade2 {
  0% {
    transform: scale(.5);
  }
  66% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes warn {
  from {
    box-shadow: 0 4px 8px 0 darken($light, 10%);
    opacity: 1;
  }
  50% {
    box-shadow: none;
    opacity: .9;
  }
  to {
    box-shadow: 0 4px 8px 0 darken($light, 10%);
    opacity: 1;
  }
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .main-page {
    border-radius: 2rem;
    box-shadow: none;
  }

  .game-settings {
    border-radius: .5rem;
    min-height: calc(100vh - 30px) !important;
  }

  .alert-body {
    min-height: calc(100vh - 30px - 48px) !important;
  }
}

/* Small devices (portrait tablets and large phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .main-page {
    border-radius: 2rem;
    box-shadow: none;
  }

  .game-settings {
    border-radius: .5rem;
    min-height: calc(100vh - 30px);
  }

  .alert-body {
    min-height: calc(100vh - 30px - 48px) !important;
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