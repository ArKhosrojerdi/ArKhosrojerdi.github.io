<template>
  <div class="d-flex flex-column flex-grow-1">
    <ul class="m-0 mb-4 p-0">
      <li v-for="(log, index) in logs" :key="index"
          class="m-0 w-100 d-flex flex-column align-items-center w-100 list-item mb-3" :class="{'bb': active[index][1]}">
        <div v-if="log !== false" class="w-100 h-100">
          <div class="row m-0 w-100 header text-white py-1 py-md-2"
               :class="[log.round.success ? 'bg-green' : 'bg-red', {'rh': !active[index][1]}]"
               @click="toggle(index)">

            <div class="col-3 p-0 py-2 d-flex flex-column justify-content-center text-right pr-2 pr-md-4">
              <h6 class="h-100">
                <b class="h-100 my-auto w-100 d-inline-block text-right text-truncate">
                  {{ teams[index % teams.length].name }}
                </b>
              </h6>
            </div>

            <div class="col-6 p-0 d-flex flex-column justify-content-center">
              <h6 class="h-100 text-center">
                <b class="h-100 w-100 d-inline-block text-truncate" style="line-height: normal">
                  {{ getWordById(log.catId, log.wordId) }}
                </b>
              </h6>
            </div>

            <div class="col-3 p-0 py-2 d-flex flex-column justify-content-center text-left pl-2 pl-md-4">
              <h6 class="ltr">
                <i v-if="log.round.success" class="mr-2 fas fa-star"></i>
                <i v-else class="mr-2 fas fa-skull-crossbones"></i>
                <b v-if="log.round.success">
                  {{
                    toPersian(log.round.point + parseInt(log.round.time / 30) - (log.round.faults + log.round.changed))
                  }}
                </b>
                <b v-else>
                  {{ toPersian(-(log.round.faults + log.round.changed)) }}
                </b>
              </h6>
            </div>

          </div>

          <transition name="fade" mode="out-in">
            <div v-if="active[index][0]">
              <div class="d-flex flex-row align-items-center justify-content-between w-100 p-2 px-md-4 py-md-3">

                <div class="d-flex flex-row">
                  <h6 v-if="log.round.changedWordId !== -1" class="text-muted">
                    {{ getWordById(log.catId, log.round.changedWordId) }}
                    <i class="fas fa-exchange-alt mx-4"></i>
                  </h6>

                  <h6>{{ getWordById(log.catId, log.wordId) }}</h6>
                </div>

                <div>
                  <h6>
                    <b>
                      {{ getCatNameById(log.catId) }}
                    </b>
                  </h6>
                </div>

              </div>

              <hr class="m-0 w-100">

              <div class="row w-100 ltr px-2 px-md-4 m-0 mt-2">
                <div class="col-6 mb-2 p-0" :class="log.round.success ? 'text-dark-green' : 'text-dark-red'">
                  <div class="d-flex flex-row justify-content-start">
                    <h6 class="text-left w-25">
                      <i class="fas fa-stopwatch"></i>
                    </h6>
                    <h6 class="text-left">
                      <b>{{ toPersian(log.round.time) }}</b>
                    </h6>
                  </div>
                </div>

                <div class="col-6 mb-2 p-0" :class="log.round.success ? 'text-dark-green' : 'text-dark-red'">
                  <div class="d-flex flex-row justify-content-end">
                    <h6 class="text-left">
                      <b :style="!log.round.success ? 'text-decoration: line-through' : ''">
                        {{ toPersian(log.round.point) }}
                      </b>
                    </h6>
                    <h6 class="text-right w-25">
                      <i v-if="log.round.success" class="fas fa-check"></i>
                      <i v-else class="fas fa-times"></i>
                    </h6>
                  </div>
                </div>

                <div class="col-6 mb-2 p-0 text-dark-red">
                  <div class="d-flex flex-row justify-content-start">
                    <h6 class="text-left w-25">
                      <i class="fas fa-exclamation-circle"></i>
                    </h6>
                    <h6 class="text-left">
                      <b>{{ toPersian(-log.round.faults) }}</b>
                    </h6>
                  </div>
                </div>

                <div class="col-6 mb-2 p-0 text-dark-red">
                  <div class="d-flex flex-row justify-content-end">
                    <h6 class="text-left">
                      <b>{{ toPersian(-log.round.changed) }}</b>
                    </h6>
                    <h6 class="text-right w-25">
                      <i class="fas fa-sync-alt"></i>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </li>
    </ul>

    <div class="d-flex flex-row w-100 justify-content-between mt-auto">
      <router-link to="/">
        <button class="nav-btn btn-border-tx-none mt-auto px-2">
          <i class="fas fa-home"></i>
        </button>
      </router-link>

      <router-link to="/result">
        <button class="nav-btn btn-border-tx-none mt-auto px-2">
          <i class="fas fa-list-ol"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      teams: [],
      logs: [],
      active: []
    }
  },
  mounted() {
    this.teams = this.getTeams();

    for (let i = 0; i < this.teams[0].log.length; i++) {
      for (let j = 0; j < this.teams.length; j++) {
        if (this.teams[j].log[i] !== undefined) {
          this.logs.push(this.teams[j].log[i]);
          this.active.push([false, false])
        } else this.logs.push(false)
      }
    }

    // console.log(this.teams)
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    getCatNameById(id) {
      return this.$store.getters.getCategoryNameById(id);
    },
    getWordById(catId, wordId) {
      return this.$store.getters.getWordNameById(catId, wordId);
    },
    toggle(index) {
      this.active[index][0] = !this.active[index][0];
      if (this.active[index][1] === true) {
        setTimeout(() => {
          this.active[index][1] = false;
        }, 200);
      }  else {
        this.active[index][1] = true;
      }
    },
    ...mapGetters([
      'getTeams'
    ]),
  }

}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;
$green: #44A666;
$red: #F24B6A;

.ltr {
  direction: ltr;
}

.rtl {
  direction: rtl;
}

ul {
  list-style: none;
}

.fade-enter-active {
  transition: all .2s ease;
  transform: translateY(-1rem);
  opacity: 0;
  height: 0;
}

.fade-leave-active {
  transition: all .2s ease;
  transform: translateY(0);
  height: 7.125rem;
  opacity: 1;
}

.fade-enter-to {
  transform: translateY(0);
  height: 7.125rem;
  opacity: 1;
}

.fade-leave-to {
  transform: translateY(-1rem);
  opacity: 0;
  height: 0;
}

.list-item {
  //transition: all .2s ease;
  border-radius: .5rem;
  background-color: #DFDFDF;
  box-shadow: 0 2px 4px 2px darken($light, 20%);
}

.list-item .bb {
  border-bottom: 4px solid darken($light, 30%) !important;
}

h4, h5, h6 {
  margin: 0;
}

.bg-green {
  background-color: $green;
}

.bg-red {
  background-color: darken($red, 5%);
}

.text-dark-green {
  color: darken(#44A666, 15%);
}

.text-dark-red {
  color: darken(#F24B6A, 22%);
}

.text-white {
  color: $light;
}

.header {
  transition: all .2s ease;
  border-radius: .5rem .5rem 0 0;
  cursor: pointer;
}

.rh {
  border-radius: .5rem !important;
  //transition: all .2s ease;
  //border-bottom: 4px solid darken($green, 5%);
}

.lined {
  text-decoration: line-through;
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
  width: 4rem;
  box-shadow: 0 0 8px 0 darken($light, 10%);
}

.nav-btn:hover {
  box-shadow: 0 2px 10px 0 darken($light, 20%);
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

.d-inline-block {
  vertical-align: middle;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
  }

  h6 {
    font-size: 14px;
  }

  .fade-enter-to {
    height: 5.5625rem !important;
  }

  .fade-leave-active {
    height: 5.5625rem !important;
  }
}
</style>