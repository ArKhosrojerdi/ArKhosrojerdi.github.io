<template>
  <div v-for="(team, index) in teams" :key="index"
       class="d-flex flex-row align-items-center justify-content-center team mb-2 round-sharp"
       :class="{'turn': team.id === turn, 'eliminated': team.eliminated, 'wait': !team.eliminated && team.id > turn, 'pass': !team.eliminated && team.id < turn}">
    <h4 class="ml-auto mr-3 mr-md-3 my-0">{{ team.name }}</h4>
    <h4 class="mr-auto ml-3 ml-md-3 my-0">
      <b class="ltr">{{ toPersian(totalPoints(index)) }}</b>
      <i class="fas fa-star mr-2"></i>
    </h4>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  data() {
    return {
      table: []
    }
  },
  created() {
    this.table = this.getTeamsRounds();
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    totalPoints(index) {
      let round = this.table[index];
      return round.point + parseInt(round.time / 30) - (round.faults + round.changed);
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
  }
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
  transition: all 1s;
}

.team.turn {
  border-bottom: 4px solid darken($primary_color, 15%);
  background-color: $primary_color;
  box-shadow: 0 2px 6px 0 darken($light, 40%);
}

.team.turn h4 {
  color: $light;
}

.team.wait {
  background-color: #cfcfcf;
  border-bottom: 4px solid darken(#cfcfcf, 15%);
  box-shadow: 0 2px 6px 0 darken($light, 40%);
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
  border-bottom: 4px solid darken(#44A666, 15%);
  background-color: #44A666;
  box-shadow: 0 2px 4px 0 darken($light, 40%);
}

.team.pass h4 {
  color: $light;
}

.d-flex.flex-column.flex-1 {
  flex: 1;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .team {
    height: 3.25rem;
  }

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
  }

  h6 {
    font-size: 14px;
  }
}
</style>