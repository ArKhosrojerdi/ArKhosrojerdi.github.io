<template>
  <div class="d-flex flex-column align-items-center justify-content-center flex-1">
    <div class="w-100">
      <ul class="d-flex flex-column justify-content-center align-content-center p-0 mb-0">
        <li class="d-flex align-items-center justify-content-center mb-2 green">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b><span v-if="point > 0">+</span>{{ toPersian(point) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i class="fas fa-star text-dark-green"></i>
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
                <b><span v-if="point > 0">+</span>{{ toPersian(parseInt(savedTime / 15)) }}</b>
              </h4>
            </div>
            <div class="col-4 px-0">
              <h6 class="m-0">
                <b class="rtl text-dark-green">
                  {{ toPersian(savedTime) }}
                  ثانیه
                </b>
              </h6>
            </div>
            <div class="col-4">
              <i class="fas fa-stopwatch text-dark-green"></i>
            </div>
          </div>
        </li>
        <li class="d-flex align-items-center justify-content-center mb-2 red">
          <div class="d-flex flex-row align-items-center justify-content-between h-100 w-100">
            <div class="col-4">
              <h4 class="m-0">
                <b>{{ toPersian(-faults) }}</b>
              </h4>
            </div>
            <div class="col-4">
              <i class="fas fa-exclamation-triangle text-dark-red"></i>
            </div>
          </div>
        </li>
      </ul>

      <div class="d-flex flex-row align-items-center justify-content-end h-100 w-100">
        <div class="col-4">
          <h2 class="m-0">
            <b>
              <span v-if="totalPoint > 0">+</span>
              {{ toPersian(totalPoint) }}
            </b>
          </h2>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalPoint() {
      return this.point + parseInt(this.savedTime / 15) - this.changed - this.faults;
    }
  },
  props: [
    'faults',
    'changed',
    'savedTime',
    'point'
  ],
  methods: {
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
  }
}
</script>

<style lang="scss" scoped>
h5, h6, i {
  color: #CFCFCF;
}

h4 {
  color: #EFEFEF;
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
  height: 4rem;
  width: 100%;
  direction: ltr;
  display: inline-block;
  box-shadow: 0 2px 4px darken(#EFEFEF, 20%);
}

.rtl {
  direction: rtl;
  display: block;
}

.green {
  background-color: #44A666;
  border-bottom: 4px solid darken(#44A666, 15%);
}

.text-dark-green {
  color: darken(#44A666, 15%);
}

.red {
  background-color: #F24B6A;
  border-bottom: 4px solid darken(#F24B6A, 22%);
}

.text-dark-red {
  color: darken(#F24B6A, 22%);
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  ul li {
    height: 3rem;
  }
}

/* Small devices (portrait tablets and large phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  ul li {
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