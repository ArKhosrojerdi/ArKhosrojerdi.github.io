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
                    @click="setCurrentCat({id: cat.id, name: cat.name, point: pt})">
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
import {mapGetters} from 'vuex';
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
      if (catId === 9 || catId === 10 || catId === 11 || catId === 15 || catId === 16)
        return true;

      let team = this.teams[this.turn];
      for (let i = 0; i < team.log.length; i++) {
        let word = this.words[team.log[i].catId].filter(function (word) {
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
    setCurrentCat(cat) {
      this.setCurrentCat({id: cat.id, name: cat.name, point: cat.point})
    },
    ...mapGetters([
      'getCategoryId'
    ]),
    ...mapActions([
      'setCurrentCat'
    ])
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;

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
  border: 4px solid darken($primary_color, 10%);
  background-color: $primary_color;
  color: $light;
  border-radius: .5rem;
  font-weight: 700;
  font-size: 24px;
  box-shadow: 0 0 3px 0 darken($light, 15%);
  outline: none;
}

.btn-point.btn-border-tl-none:disabled {
  box-shadow: none;
  cursor: not-allowed;
  border: 4px solid $primary_color;
  border-right: none;
  border-bottom: none;
  background-color: lighten($primary_color, 5%);
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