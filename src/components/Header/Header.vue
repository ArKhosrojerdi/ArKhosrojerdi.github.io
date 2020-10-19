<template>
  <div class="header-logo d-flex flex-column align-content-center">
    <h1 class="my-auto" v-if="page === 'Configurations'">پانتونون</h1>
    <h1 class="my-auto" v-else-if="page === 'TableBody'">جدول تیم‌ها</h1>
    <h1 class="my-auto" v-else-if="page === 'Categories'">دسته‌بندی‌‌ها</h1>
    <h1 class="my-auto" v-else-if="page === 'Result'">رده‌بندی</h1>
    <h1 class="my-auto" v-else-if="page === 'Info'">قوانین</h1>
  </div>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$route.name;
    }
  }
}
</script>

<style lang="scss" scoped>
$primary_color: #2669bf;
$light: #EFEFEF;

.header-logo {
  height: 8rem;
  background-color: #F24B6A;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0 10px 8px -8px darken($light, 10%);
  z-index: 70;
}

.header-logo h1 {
  width: 100%;
  color: $light;
}
</style>