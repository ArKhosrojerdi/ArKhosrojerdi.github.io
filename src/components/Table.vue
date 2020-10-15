<template>
  <div class="col-lg-6 col-md-9 col-sm-12 col-12 d-flex flex-column flex-1 mx-auto">
    <div>
      <h2 class="text-gray m-0 mb-2">
        {{ toPersian(totalRounds) }}
        <span class="mx-4">/</span>
        {{ toPersian(round) }}
      </h2>
      <hr class="m-0 mb-3">
    </div>

    <div v-for="(team, index) in teams" :key="index"
         class="d-flex flex-row align-items-center justify-content-center team mb-3 round-hrem"
         :class="{'turn': team.id === turn, 'eliminated': team.eliminated, 'wait': !team.eliminated && team.id > turn, 'pass': !team.eliminated && team.id < turn}">
      <h4 class="ml-auto mr-4 my-0">{{ team.name }}</h4>
      <h4 class="mr-auto ml-4 my-0">
        <span class="ltr">{{ toPersian(table[index].point + parseInt(table[index].sec / 15)) }}</span>
        <span class="mr-4">امتیاز</span>
      </h4>

    </div>

    <div class="d-flex flex-column flex-1">
      <div class="mt-auto d-flex justify-content-between">
        <router-link to="/categories">
          <button class="nav-btn btn-border-tr-none wink">
            <i class="fa fa-angle-double-right"></i>
          </button>
        </router-link>
        <router-link to="/info">
          <button class="nav-btn btn-border-tx-none">
            <i class="fas fa-info-circle"></i>
          </button>
        </router-link>
        <router-link to="/">
          <button class="nav-btn btn-border-tl-none" @click="initGame">
            <i class="fa fa-power-off"></i>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      table: []
    }
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
      return this.getTeamsPoints();
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
.ltr {
  direction: ltr;
  display: inline-block;
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
  color: #2c3e50;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

.fill {
  display: flex;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
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
</style>