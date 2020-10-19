<template>
  <div v-for="(team, index) in teams" :key="index"
       class="d-flex flex-row align-items-center justify-content-center team mb-2 round-sharp"
       :class="{'turn': team.id === turn, 'eliminated': team.eliminated, 'wait': !team.eliminated && team.id > turn, 'pass': !team.eliminated && team.id < turn}">
    <h4 class="ml-auto mr-4 my-0">{{ team.name }}</h4>
    <h4 class="mr-auto ml-4 my-0">
      <span class="ltr">{{ toPersian(table[index].point + parseInt(table[index].sec / 15)) }}</span>
      <span class="mr-4">امتیاز</span>
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
    this.table = this.getTeamsPoints();
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
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
  box-shadow: 0 4px 8px 0 darken($light, 20%);
}

.team.turn h4 {
  color: $light;
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
}
</style>