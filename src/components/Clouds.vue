<template>
  <div class="w-100">
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloud: ''
    }
  },
  setup() {
    let cloudsCount = parseInt(window.innerHeight / 52);
    let body = document.createElement("div");
    body.style.cssText = "width: 100%; position: relative";
    document.body.appendChild(body);
    for (let i = 0; i < cloudsCount; i++) {
      let pos = Math.floor(Math.random() * window.innerWidth + 100);
      let cloud = document.createElement("div");
      let top = (i + 1) * 52 + (i * 8);
      cloud.setAttribute("id", "cloud" + i);
      cloud.style.cssText = "height: 8px;\n" +
          "  width: 64px;\n" +
          "  background-color: #FFFFFF;\n" +
          "  box-shadow: 0 0 1px 0 #000;\n" +
          "  opacity: .75;\n" +
          "  border-radius: 10px;\n" +
          "  position: fixed;\n" +
          "  animation: cloud 20s infinite;\n" +
          "  animation-timing-function: linear;\n" +
          "  top: " + top + "px;\n" +
          "  right: " + pos + "px\n" +
          "  border: none;";
      body.appendChild(cloud);
    }

    for (let i = 0; i < cloudsCount; i++) {
      let start, end;
      let pos = Math.floor(Math.random() * window.innerWidth + 100);

      if (i % 2 === 1) {
        start = {transform: 'initial'};
        end = {transform: 'translateX(' + (window.innerWidth + 64) + 'px)'};
      } else {
        start = {transform: 'translateX(' + (window.innerWidth + 64) + 'px)'};
        end = {transform: 'initial'};
      }
      document.getElementById("cloud" + i).animate([
        start, end
      ], {
        duration: window.innerWidth / pos * 10000,
        iterations: Infinity,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>