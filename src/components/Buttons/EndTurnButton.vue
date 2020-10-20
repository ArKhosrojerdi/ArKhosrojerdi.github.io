<template>
  <div>
    <router-link v-bind:to="lastTurn ? '/result' : '/table'">
      <button class="nav-btn btn-border-tx-none mt-auto px-2" @click="go">
        باشه
      </button>
    </router-link>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
  data() {
    return {
      lastTurn: false
    }
  },
  props: [
    'points',
    'savedTime'
  ],
  created() {
    this.lastTurn = this.getIsLastTurn();
    console.log(this.points);
    this.addPoint({
      success: this.points.success,
      point: this.points.point,
      time: this.savedTime,
      faults: this.points.faults,
      changed: this.points.changed
    });
  },
  methods: {
    go() {
      if (!this.lastTurn)
        this.nextTurn();
    },
    ...mapActions([
      'addPoint'
    ]),
    ...mapGetters([
      'getIsLastTurn'
    ]),
    ...mapMutations([
      'nextTurn'
    ])
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

.nav-btn {
  border: 4px solid darken($primary_color, 20%);
  background-color: $primary_color;
  border-radius: .5rem;
  color: $light;
  font-weight: 900;
  font-size: 24px;
  line-height: 100%;
  height: 4rem;
  width: 4rem;
  box-shadow: 0 4px 4px 0 darken($light, 10%);
}

.nav-btn:hover {
  box-shadow: 0 4px 8px 0 darken($light, 20%);
}

.nav-btn:active {
  box-shadow: none;
  border: none;
}

.nav-btn.btn-border-tx-none {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>