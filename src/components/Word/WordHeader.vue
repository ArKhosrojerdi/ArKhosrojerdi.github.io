<template>
  <div>
    <h2 class="mb-1 text-muted h-100"><i :class="catIcons[catId]"></i></h2>
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
      'fas fa-box',
      'fas fa-atlas',
      'fas fa-yin-yang',
      'fas fa-landmark',
      'fas fa-microscope',
      'fas fa-cat',
      'fas fa-pizza-slice',
      'fas fa-user-tie',
      'fas fa-hard-hat',
      'fas fa-globe-asia',
      'fas fa-quota-right',
      'fas fa-icons',
      'fas fa-futbol',
      'fas fa-film',
      'fab fa-youtube',
      'fas fa-book',
      'fas fa-baby',
      'fas fa-users',
      'fab fa-itunes-note',
      'fas fa-running'
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
</style>