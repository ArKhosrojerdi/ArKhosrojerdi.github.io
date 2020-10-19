<template>
  <div class="d-flex flex-column flex-1 col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 mx-auto p-0">
    <div>
      <h4 class="text-gray m-0 mb-2">
        {{ toPersian(totalRounds) }}
        <span class="mx-4">/</span>
        {{ toPersian(round) }}
      </h4>
      <hr class="m-0 mb-2 mb-md-3">
    </div>

    <Table/>

    <div class="d-flex flex-column flex-1">
      <div class="mt-auto d-flex justify-content-between">
        <router-link to="/categories">
          <button class="nav-btn btn-border-tr-none wink px-2">
            <i class="fa fa-angle-double-right"></i>
          </button>
        </router-link>
        <router-link to="/info">
          <button class="nav-btn btn-border-tx-none px-2">
            <i class="fas fa-info-circle"></i>
          </button>
        </router-link>
        <router-link to="/">
          <button class="nav-btn nav-btn-danger btn-border-tl-none px-2" @click="initGame">
            <i class="fas fa-door-open"></i>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Table from './Table.vue';
import {mapState} from "vuex";
import {mapActions} from "vuex";

export default {
  components: {
    Table
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    ...mapActions([
      'initGame'
    ]),
  },
  computed: {
    ...mapState([
      'totalRounds',
      'round'
    ])
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

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

.nav-btn.nav-btn-danger {
  background-color: darken(#F24B6A, 5%);
  border-color: darken(#F24B6A, 20%);
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

@keyframes wink {
  from {
    transform: scale(1);
    box-shadow: 0 2px 2px darken($light, 5%);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 3px 8px 1px darken($light, 20%);
  }
  to {
    transform: scale(1);
    box-shadow: 0 2px 2px darken($light, 5%);
  }
}
</style>