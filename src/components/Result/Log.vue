<template>
  <div>
    <ul>
      <li v-for="(team, index) in teams" :key="index">
        {{team.name}} , {{team.log}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      teams: []
    }
  },
  created() {
    this.teams = this.getTeams();
    },
  methods: {
    ...mapGetters([
      'getTeams'
    ])
  }

}
</script>

<style scoped>

</style>