<template>
  <li class="d-flex flex-row align-items-center">
    <div class="round shadow square3 c-light d-flex flex-column align-items-center" :class="color">
      <h5 class="h-100 my-auto"><i class="fas" :class="icon"></i></h5>
    </div>
    <h6 class="text-justify m-0 mr-2">
      {{ text }}
    </h6>
  </li>
</template>

<script>
export default {
  props: ['text', 'color', 'icon']
}
</script>

<style lang="scss" scoped>
$primary_color: #2669BF;
$light: #EFEFEF;
$green: #44A666;
$red: #F24B6A;
$gray: #CFCFCF;
$yellow: #F2C777;

.green {
  background-color: $green;
  border-bottom: 4px solid darken($green, 22%);
}

.red {
  background-color: darken($red, 5%);
  border-bottom: 4px solid darken($red, 20%);
}

.blue {
  background-color: $primary_color;
  border-bottom: 4px solid darken($primary_color, 20%);
}

.gray {
  background-color: $gray;
  border-bottom: 4px solid darken($gray, 20%);
}

.yellow {
  background-color: $yellow;
  border-bottom: 4px solid darken($yellow, 20%);
}

.c-light {
  color: $light;
}

.square3 {
  min-height: 3rem;
  min-width: 3rem;
}

.round {
  border-radius: .5rem;
}

.shadow {
  box-shadow: 0 2px 6px 0 darken($light, 40%);
}
</style>