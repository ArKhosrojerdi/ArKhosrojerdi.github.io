<template>
  <div>
    <ul class="categories-list d-flex flex-column justify-content-center align-content-center p-0 mb-0">
      <li class="categories-item d-flex align-items-center justify-content-center"
          :class="{'mb-2': index !== categories.length - 1}">
        <h5 class="m-0 mr-2 w-100 text-right text-gray"><b>{{ cat.name }}</b></h5>
        <div class="h-100 w-100 d-flex flex-row align-items-center">
          <router-link to="/word" v-for="(pt, ind) in pts" :key="ind" :class="{'mr-auto': ind === 0}"
                       class="ml-2">
            <button class="btn-point btn-border-tl-none px-2" :disabled="checkPoint(index, pt)"
                    @click="pushCategory({catId: cat.id, point: pt})">
              {{ toPersian(pt) }}
            </button>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';

export default {
  props: [
    'cat',
    'index'
  ],
  computed: {
    ...mapState([
      'turn',
      'categories',
      'words',
      'pts',
      'teams'
    ])
  },
  methods: {
    checkPoint(catId, point) {
      let team = this.teams[this.turn];
      for (let i = 0; i < team.log.length; i++) {
        let word = this.words.filter(function (word) {
          if (team.log[i].wordId === word.id) {
            if (word.cat.catId === catId && word.cat.point === point) {
              return true;
            }
          }
        });
        if (word.length !== 0)
          return true;
      }
    },
    toPersian(n) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return n.toString().replace(/\d/g, x => farsiDigits[x]);
    },
    pushCategory(cat) {
      this.pushCategory({catId: cat.catId, point: cat.point})
    },
    ...mapActions([
      'pushCategory'
    ])
  }
}
</script>

<style lang="scss" scoped>
.categories-list {
  text-decoration: none;
}

.categories-item {
  list-style: none;
  background-color: #CFCFCF;
  height: 3.5rem;
  border-radius: .5rem;
}

.btn-point {
  height: 3rem;
  width: 3rem;
  border: 4px solid darken(#2669BF, 10%);
  background-color: #2669BF;
  color: #EFEFEF;
  border-radius: .5rem;
  font-weight: 700;
  font-size: 24px;
  box-shadow: 0 0 4px 0 darken(#CFCFCF, 10%);
  outline: none;
}

.btn-point.btn-border-tl-none:disabled {
  box-shadow: none;
  cursor: not-allowed;
  border: 4px solid #2669BF;
  border-right: none;
  border-bottom: none;
  background-color: lighten(#2669BF, 5%);
  color: #AFAFAF;
}

.btn-point:active:enabled {
  border: none;
  box-shadow: none;
}

.btn-point:hover:enabled {
  box-shadow: 0 0 4px 0 darken(#CFCFCF, 25%);
  transform: scale(1.025);
}

.btn-point.btn-border-tl-none {
  border-top: none;
  border-left: none;
}

.text-gray {
  color: #373D3F;
}

/* Extra small devices (phones, 576px and down) */
@media only screen and (max-width: 575.98px) {
  .btn-point {
    width: 2.5rem;
    height: 2.5rem;
  }
}

</style>