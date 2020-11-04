<template>
  <div class="d-flex flex-column align-items-center justify-content-center flex-1 w-100">
    <div class="d-flex flex-column justify-content-center align-content-center my-auto w-100">
      <ul class="w-100 p-0 mb-0">
        <li class="d-flex align-items-center justify-content-center mb-2 green">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b v-if="!success">۰</b>
                <b v-else><span v-if="point > 0">+</span>{{ toPersian(point) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i v-if="succeed" class="fas fa-check text-dark-green"></i>
              <i v-else class="fas fa-times text-dark-green"></i>
            </div>
          </div>
        </li>
        <li class="d-flex align-items-center justify-content-center mb-2 red">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b>{{ toPersian(-changed) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i class="fas fa-sync-alt text-dark-red"></i>
            </div>
          </div>
        </li>
        <li class="d-flex align-items-center justify-content-center mb-2 green">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b><span v-if="parseInt(savedTime / 30) > 0">+</span>{{ toPersian(parseInt(savedTime / 30)) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i class="fas fa-clock text-dark-green"></i>
            </div>
          </div>
        </li>
        <li class="d-flex align-items-center justify-content-center red">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b>{{ toPersian(-faults) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i class="fas fa-exclamation text-dark-red"></i>
            </div>
          </div>
        </li>
      </ul>

      <div class="w-100 mt-3 mt-sm-4 row px-0 mx-0 justify-content-between total-body"
           :class="succeed ? 'green' : 'red'">
        <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
          <div class="col-4">
            <b v-if="succeed">
              <i class="fas fa-star text-dark-green"></i>
            </b>
            <b v-else>
              <i class="fas fa-skull-crossbones text-dark-red"></i>
            </b>
          </div>

          <div class="col-4">
            <h4 class="m-0 d-inline-block ltr">
              <b><span v-if="total > 0">+</span>{{ toPersian(total) }}</b>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div>
      <EndTurnButton :points="points" :savedTime="savedTime"/>
    </div>
  </div>
</template>

<script>
import EndTurnButton from '../Buttons/EndTurnButton.vue';

export default {
  data() {
    return {
      points: {},
      succeed: false,
      total: 0
    }
  },
  components: {
    EndTurnButton
  },
  props: [
    'faults',
    'changed',
    'savedTime',
    'point',
    'success'
  ],
  created() {
    this.points = {success: this.success, point: this.point, changed: this.changed, faults: this.faults};
    this.totalPoint() > 0 ? this.succeed = true : this.succeed = false;
    this.total = this.totalPoint();
  },
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    totalPoint() {
      if (this.success === true)
        return this.point + parseInt(this.savedTime / 30) - (this.changed + this.faults);
      return -(this.changed + this.faults);
    }
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

h5, h6, i {
  color: #CFCFCF;
}

h4 {
  color: $light;
}

h2 {
  direction: ltr;
  display: inline-block;
}

ul li {
  text-decoration: none;
  list-style: none;
  background-color: #CFCFCF;
  border-radius: .5rem;
  height: 3.5rem;
  width: 100%;
  direction: ltr;
  display: inline-block;
  box-shadow: 0 2px 6px darken($light, 40%);
}

.total-body {
  height: 3.5rem;
  border-radius: .5rem;
  box-shadow: 0 2px 6px darken($light, 40%);
}

.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}

.green {
  background-color: #44A666;
  border-bottom: 4px solid darken(#44A666, 15%);
}

.text-dark-green {
  color: darken(#44A666, 15%);
}

.text-green {
  color: #44A666;
}

.red {
  background-color: #F24B6A;
  border-bottom: 4px solid darken(#F24B6A, 22%);
}

.text-dark-red {
  color: darken(#F24B6A, 22%);
}

.text-red {
  color: #F24B6A;
}

.bh {
  border-radius: .5rem;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  ul li {
    height: 3rem;
  }

  .total-body {
    height: 3rem;
  }
}

/* Small devices (portrait tablets and large phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  ul li {
    height: 3rem;
  }

  .total-body {
    height: 3rem;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (laptops/desktops, 992px and up) */
//@media only screen and (min-width: 992px) and (max-width: 1199.98px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
//@media only screen and (min-width: 1200px) {...}
</style>