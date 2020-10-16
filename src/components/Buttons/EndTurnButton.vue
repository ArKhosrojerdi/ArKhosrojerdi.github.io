<template>
  <div>
    <router-link to="/result" v-if="lastTurn">
      <button class="nav-btn btn-border-tx-none mt-auto px-2">
        <!--                    <i class="fa fa-angle-double-right"></i>-->
        باشه
      </button>
    </router-link>
    <router-link to="/table" v-else>
      <button class="nav-btn btn-border-tx-none mt-auto px-2" @click="nextTurn()">
        <!--                    <i class="fa fa-angle-double-right"></i>-->
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
    this.lastTurn = this.isLastTurn();
    this.addPoint({point: this.points, time: this.savedTime});
  },
  methods: {
    isLastTurn() {
      return this.getIsLastTurn();
    },
    nextTurn() {
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
.nav-btn {
  border: 4px solid darken(#F24B6A, 20%);
  background-color: #F24B6A;
  border-radius: .5rem;
  color: #efefef;
  font-weight: 900;
  font-size: 24px;
  line-height: 100%;
  height: 4rem;
  width: 4rem;
  box-shadow: 0 4px 4px 0 darken(#EFEFEF, 10%);
}

.nav-btn:hover {
  box-shadow: 0 4px 8px 0 darken(#EFEFEF, 20%);
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