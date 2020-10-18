<template>
  <div>
    <h2 class="mb-1 text-muted h-100"><i class="fas" :class="'fa-' + catIcons[catId]"></i></h2>
    <h4 class="text-muted">{{ catName }}</h4>
    <hr class="m-0">
  </div>
</template>

<script>
export default {
  data() {
    return {
      catIcons: []
    }
  },
  created() {
    this.catIcons = [
      'box',
      'atlas',
      'yin-young',
      'landmark',
      'microscope',
      'cat',
      'pizza-slice',
      'user-tie',
      'hard-hat',
      'globe-asia',
      'quota-right',
      'icons',
      'futbol',
      'film',
      'youtube',
      'book',
      'baby',
      'users-crown',
      'itunes-note',
      'running'
    ];
  },
  props: [
    'catId',
    'catName',
    'word'
  ]
}
</script>

<style lang="scss" scoped>
.d-flex.flex-column.flex-1 {
  flex: 1;
}

.fa-box-alt {
  background-color: red !important;
}
</style>