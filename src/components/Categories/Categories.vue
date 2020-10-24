<template>
  <div>
    <Category v-for="(cat, index) in categories" :key="index" :cat="cat" :index="cat.id"/>
  </div>
</template>

<script>
import Category from './Category';

import {mapState} from 'vuex';

export default {
  components: {
    Category
  },
  computed: {
    ...mapState([
      'categories',
    ])
  }
}
</script>