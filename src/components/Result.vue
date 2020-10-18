<template>
  <div class="">
    <div class="container main-page d-flex flex-column col-12 col-lg-6 col-sm-9 rounded-sm-0">
      <div class="header-logo">
        <h1 class="my-auto">رده بندی</h1>
      </div>
      <div class="game-settings">
        <div class="mx-auto col-lg-6 col-md-9 col-sm-12 col-12 py-4 d-flex flex-column flex-1">

          <Ranked/>

          <div class="mt-auto">
            <router-link to="/">
              <button class="nav-btn btn-border-tx-none mt-auto px-2">
                <i class="fas fa-home"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

import Ranked from './Table/Ranked.vue';

export default {
  data() {
    return {
      teams: []
    }
  },
  components: {
    Ranked
  },
  created() {
    this.table = this.getTable();
  },
  methods: {
    initGame() {
      this.initGame();
    },
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    getTable() {
      let table = this.getTeamsPoints();
      return table;
    },
    ...mapGetters([
      'getTeamsPoints'
    ]),
    ...mapActions([
      'initGame'
    ])
  },
  computed: {
    ...mapState([
      'gameName',
      'teams',
      'turn',
      'totalRounds',
      'round'
    ])
  }
}
</script>

<style lang="scss" scoped>

.main-page {
  border-radius: 2rem;
  padding: 15px;
  z-index: 100;
  position: relative;
  box-shadow: 0 0 16px 0 darken(#2669BF, 7%);
}

.header-logo {
  height: 8rem;
  background-color: #F24B6A;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  box-shadow: 0 10px 8px -8px darken(#EFEFEF, 10%);
  position: relative;
  z-index: 70;
}

.header-logo h1 {
  width: 100%;
  color: #EFEFEF;
  margin: 0;
}

.game-settings {
  min-height: 30rem;
  background-color: #EFEFEF;
  display: flex;
  flex-direction: column;
  align-content: center;
  border-radius: 0 0 2rem 2rem;
  //position: relative;
}

.round-hrem {
  border-radius: .5rem;
}

.team {
  width: 100%;
  height: 3.5rem;
  font-size: 24px;
}

.team.turn {
  border-bottom: 4px solid darken(#2669BF, 15%);
  background-color: #2669BF;
  box-shadow: 0 4px 8px 0 darken(#EFEFEF, 20%);
}

.team.turn h4 {
  color: #efefef;
}

.team.wait {
  background-color: #cfcfcf;
}

.team.wait h4 {
  color: #808080;
}

.team.eliminated {
  background-color: darken(#F24B6A, 10%);
}

.team.eliminated h4 {
  color: lighten(#F24B6A, 20%);
}

.team.pass {
  background-color: #44A666;
}

.team.pass h4 {
  color: #efefef;
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
  width: 4rem;
  box-shadow: 0 0 8px 0 darken(#EFEFEF, 10%);
}

.nav-btn:hover {
  box-shadow: 0 2px 10px 0 darken(#EFEFEF, 20%);
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

.wink {
  animation: wink 1s infinite;
}

.text-gray {
  color: #606060;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

@keyframes wink {
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  to {
    transform: scale(1);
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
    border-radius: 0 0 .5rem .5rem;
    min-height: calc(100% - 6rem);
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
    height: 100vh !important;
  }

  .game-settings {
    border-radius: 0 0 .5rem .5rem;
    min-height: calc(100% - 8rem);
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