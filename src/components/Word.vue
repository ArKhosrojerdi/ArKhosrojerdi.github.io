<template>
  <div class="">
    <transition name="fade-word" mode="out-in">
      <div class="container main-page col-12 col-lg-6 col-sm-9 rounded-sm-0">
        <div class="game-settings">
          <div class="my-4 mx-auto col-lg-6 col-md-9 col-sm-12 col-12 d-flex flex-column flex-1">
            <div v-if="!fail && !success" class="d-flex flex-column flex-1">
<!--              <div>-->
<!--                <h1 class="mb-1 text-muted"><i class="fas fa-microscope"></i></h1>-->
<!--                <h3 class="text-muted">{{ catName }}</h3>-->
<!--                <hr class="m-0">-->
<!--              </div>-->

              <WordHeader :catName="catName" :catId="catId"/>

              <div class="d-flex flex-column flex-1">
                <h1 class="my-auto">
                  <b>{{ word }}</b>
                </h1>
              </div>

              <div>
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
              </div>

              <div v-if="!hasStarted" class="d-flex flex-row"
                   :class="{'justify-content-between': changed === 0, 'justify-content-center hide': changed}">
                <button @click="start" class="nav-btn mt-auto px-2"
                        :class="{'btn-border-tr-none': changed === 0, 'btn-border-tx-none': changed}">
                  <i class="fas fa-play"></i>
                </button>
                <button v-if="changed === 0" @click="changeWord" class="nav-btn mt-auto px-2"
                        :class="{'btn-border-tl-none': changed === 0}">
                  <i class="fas fa-sync-alt"></i>
                </button>

              </div>

              <div v-else class="d-flex align-content-between align-items-between justify-content-between">
                <button class="nav-btn btn-border-tr-none mt-md-0 mt-auto" @click="succeed">
                  <i class="fas fa-check"></i>
                </button>
                <button class="nav-btn btn-border-tx-none mt-md-0 mt-auto" @click="submitFault">
                  <i class="fas fa-exclamation-triangle"></i>
                </button>
                <button class="nav-btn btn-border-tl-none mt-md-0 mt-auto" @click="failed">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <transition name="fade">
              <div v-if="fail" class="alert-body d-flex flex-column flex-1">
                <div class="pt-3 pb-2 mx-auto row alert-fail">
                  <h1 class="mb-md-0 mb-2 d-flex justify-content-center align-items-center col-12">
                    <i class="fas fa-skull"></i>
                  </h1>
                  <h1 class="mb-0 col-12">
                    ریدی!
                  </h1>
                </div>

                <TurnScore :faults="faults" :changed="changed" :savedTime="0" :point="0"/>
                <EndTurnButton :point="point"/>
              </div>
            </transition>

            <transition name="fade2">
              <div v-if="success" class="alert-body d-flex flex-column flex-1">
                <div class="pt-3 pb-2 mx-auto row alert-success">
                  <h1 class="mb-md-0 mb-2 d-flex justify-content-center align-items-center col-12">
                    <i class="fas fa-award"></i>
                  </h1>
                  <h1 class="mb-0 col-12">
                    ایول!
                  </h1>
                </div>

                <TurnScore :faults="faults" :changed="changed" :savedTime="savedTime" :point="point"/>
                <EndTurnButton :point="point"/>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

import EndTurnButton from './Buttons/EndTurnButton.vue';
import TurnScore from './TurnScore.vue';
import WordHeader from './WordHeader.vue';

export default {
  data() {
    return {
      word: '',
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
    EndTurnButton,
    TurnScore,
    WordHeader
  },
  created() {
    this.timer = this.time;
    let word = this.fetchWord();
    this.catId = word.catId;
    this.point = word.point;
    this.word = word.name;
    this.wordId = word.id;
    this.catName = this.getCatName();
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
      this.point -= this.faults;
      if (this.changed === 1)
        this.point--;
      this.addPoint({point: this.point, time: 0});
    },
    succeed() {
      stop();
      this.point -= this.faults;
      if (this.changed === 1)
        this.point--;
      this.savedTime = this.timer;
      console.log(this.point)
      this.addPoint({point: this.point, time: this.timer});
      if (this.point > 0)
        this.success = true;
      else this.fail = true;
      // this.point += parseInt(this.timer / 15);
    },
    volume() {
      return this.timer * 100 / this.time;
    },

    getCatName() {
      return this.getCategoryName();
    },
    changeWord() {
      this.changed = 1;
      this.fetchNewWord().then(response => this.word = response);
    },
    ...mapGetters([
      'fetchWord',
      'getCategoryName'
    ]),
    ...mapActions([
      'addPoint',
      'fetchNewWord'
    ]),
  },
  computed: {
    ...mapState([
      'time',
      'words'
    ]),
  },
}
</script>

<style lang="scss" scoped>
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
  position: relative;
  box-shadow: 0 0 16px 0 darken(#2669BF, 7%);
}

.game-settings {
  min-height: 38rem;
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  align-content: center;
  border-radius: 2rem;
}

.nav-btn {
  outline: none;
  border: 4px solid darken(#F24B6A, 20%);
  background-color: #F24B6A;
  border-radius: .5rem;
  color: #efefef;
  font-weight: 900;
  font-size: 24px;
  line-height: 100%;
  height: 4rem;
  min-width: 4rem;
  box-shadow: 0 4px 4px 0 darken(#EFEFEF, 10%);
}

.justify-content-center.hide {
  animation: hide .2s linear;
}

@keyframes hide {
  0% {
    transform: translateX(calc(+50% - 2rem));
  }

  100% {
    transform: translateX(calc(-50% + 2rem));
    align-self: center;
  }
}

.nav-btn:hover {
  box-shadow: 0 4px 8px 0 darken(#EFEFEF, 20%);
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

.progress {
  background-color: #cfcfcf;
  height: 1.5rem;
  box-shadow: 0 6px 8px 0 darken(#cfcfcf, 10%);
}

.warn {
  animation: warn 1s infinite;
}

.fail-container {
  background-color: darken(#F24B6A, 10%);
}

.alert-body {
  min-height: 30rem;
}

.alert-body .alert-fail {
  background-color: darken(#F24B6A, 10%);
  color: #efefef;
  border-radius: .5rem;
  box-shadow: 0 8px 8px 0 darken(#efefef, 10%);
  border-bottom: 4px solid darken(#F24B6A, 20%);
}

.alert-body .alert-success {
  background-color: darken(#44A666, 10%);
  color: #efefef;
  border-radius: .5rem;
  box-shadow: 0 8px 8px 0 darken(#efefef, 10%);
  border-bottom: 4px solid darken(#44A666, 20%);
}

.progress .progress-bar {
  background-color: #2669BF;
  transition: width 1s linear !important;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

.fade-enter-active, .fade-leave-active {
  animation: fade .2s ease-in;
}

.fade2-enter-active, .fade2-leave-active {
  animation: fade .2s ease-in;
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
    box-shadow: 0 4px 8px 0 darken(#efefef, 10%);
    opacity: 1;
  }
  50% {
    box-shadow: none;
    opacity: .9;
  }
  to {
    box-shadow: 0 4px 8px 0 darken(#efefef, 10%);
    opacity: 1;
  }
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .main-page {
    border-radius: 0;
    box-shadow: none;
    height: 100vh !important;
  }

  .game-settings {
    border-radius: .5rem;
    min-height: 100%;
  }
}

/* Small devices (portrait tablets and large phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  .main-page {
    border-radius: 0;
    box-shadow: none;
    height: 100vh !important;
  }

  .game-settings {
    border-radius: .5rem;
    min-height: 100%;
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