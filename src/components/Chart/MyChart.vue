<template>
  <div class="container main-page d-flex flex-column col-12 col-lg-6 col-sm-9 rounded-sm-0">
    <div class="game-settings d-flex flex-column flex-1">
      <div class="mx-auto col-lg-12 col-md-12 col-sm-12 col-12 py-4 d-flex flex-column flex-1">
        <BarChart/>
<!--        hi-->
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Chart/BarChart";

export default {
  name: "MyChart",
  components: {
    BarChart
  },
  data() {
    return {
      chartData: {
        Books: 24,
        Magazine: 30,
        Newspapers: 10
      }
    };
  }
}
</script>

<style scoped>

</style>