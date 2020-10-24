<template>
  <div class="d-flex flex-column align-items-center justify-content-center flex-1 w-100">
    <ul class="w-100 p-0 m-0">
      <li v-for="(rank, index) in ranks" :key="index"
          class="d-flex flex-row align-items-center justify-content-center team mb-2 round-sharp w-100 m-0"
          :class="{'green': green(index, rank.id), 'yellow': yellow(index, rank.id)}">
        <h4 class="ml-auto mr-4 my-0" :class="index !== 0 && !teams[rank.id].eliminated ? 'text-gray' : 'text-light'">
          {{ teams[rank.id].name }}
        </h4>

        <h6 class="my-0 text-dark-green h-100 d-flex flex-row align-items-center"
            :class="index === 0 && !teams[rank.id].eliminated ? 'text-dark-green' : 'text-dark-yellow'">
          <i class="fas fa-stopwatch ml-2 mt-1"></i>
          <b>{{ toPersian(rank.time) }}</b>
        </h6>
        <h4 class="mr-auto ml-4 my-0 text-gray"
            :class="index === 0 && !teams[rank.id].eliminated ? 'text-light' : 'text-gray'">
          <span class="ltr">{{ toPersian(getTotalPoint(rank.id)) }}</span>
        </h4>
      </li>
    </ul>

    <div class="d-flex flex-row w-100 justify-content-between mt-auto">
      <router-link to="/">
        <button class="nav-btn btn-border-tx-none mt-auto px-2">
          <i class="fas fa-home"></i>
        </button>
      </router-link>

      <router-link to="/log">
        <button class="nav-btn btn-border-tx-none mt-auto px-2">
          <i class="fas fa-list-ul"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
      table: [],
      ranks: [],
    }
  },
  created() {
    this.table = this.getTeamsRounds();
    console.log(this.table)
    for (let i = 0; i < this.table.length; i++) {
      this.ranks.push({id: i, point: this.table[i].point, time: this.table[i].time})
    }
    this.ranks.sort(function (x, y) {
      let n = y.point - x.point;
      if (n !== 0) {
        return n;
      }
      return y.time - x.time;
    });
  },
  methods: {
    getTotalPoint(index) {
      let team = this.table[index];
      return team.point + parseInt(team.time / 30) - (team.faults + team.changed);
    },
    yellow(index, rankId) {
      return index !== 0 && !this.teams[rankId].eliminated;
    },
    green(index, rankId) {
      return index === 0 && !this.teams[rankId].eliminated;
    },
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    ...mapGetters([
      'getTeamsRounds'
    ]),
  },
  computed: {
    ...mapState([
      'teams',
      'turn',
    ])
  },
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

.ltr {
  direction: ltr;
  display: inline-block;
}

.round-sharp {
  border-radius: .5rem;
}

.team {
  width: 100%;
  height: 3.5rem;
  font-size: 24px;
}

.team.turn {
  border-bottom: 4px solid darken($primary_color, 15%);
  background-color: $primary_color;
  box-shadow: 0 4px 8px 0 darken($light, 20%);
}

.text-light {
  color: $light;
}

.text-gray {
  color: #4C4C4C;
}

.team.eliminated {
  background-color: darken(#F24B6A, 10%);
}

.team.eliminated h4 {
  color: lighten(#F24B6A, 20%);
}

.team.green {
  background-color: #44A666;
  border-bottom: 4px solid darken(#44A666, 15%);
}

.text-dark-green {
  color: darken(#44A666, 15%);
}

.team.yellow {
  background-color: #F2C777;
  border-bottom: 4px solid darken(#F2C777, 22%);
}

.text-dark-yellow {
  color: darken(#F2C777, 22%);
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

.nav-btn.btn-border-tr-none {
  border-top: none;
  border-right: none;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .team {
    height: 3.25rem;
  }
}
</style>