<template>
  <ul class="p-0 m-0">
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
        <span class="ltr">{{ toPersian(table[rank.id].point + parseInt(table[rank.id].sec / 15)) }}</span>
      </h4>
    </li>
  </ul>
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
    this.table = this.getTable();
    for (let i = 0; i < this.table.length; i++) {
      this.ranks.push({id: i, point: this.table[i].point, time: this.table[i].sec})
    }
    this.ranks.sort(function (x, y) {
      let n = y.point - x.point;
      if (n !== 0) {
        return n;
      }
      return y.time - x.time;
    });
  },
  mounted() {
    this.show = true;
  },
  methods: {
    yellow(index, rankId) {
      return index !== 0 && !this.teams[rankId].eliminated;
    },
    // red(rankId) {
    //   return this.teams[rankId].eliminated;
    // },
    green(index, rankId) {
      return index === 0 && !this.teams[rankId].eliminated;
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