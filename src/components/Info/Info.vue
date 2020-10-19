<template>
  <div class="d-flex flex-column flex-1 col-xl-6 col-lg-9 col-md-9 col-sm-12 col-12 mx-auto p-0">
    <div>
      <ul>
        <li>
          اطلاعات بازی
        </li>
      </ul>
    </div>

    <div class="d-flex flex-column flex-grow-1 justify-content-end">
      <router-link to="/table">
        <button class="nav-btn btn-border-tx-none">
          <i class="fas fa-angle-double-left"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
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

.nav-btn.btn-border-tx-none {
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>