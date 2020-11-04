<template>
  <div class="d-flex flex-column flex-1 col-xl-10 col-12 mx-auto p-0">
    <ul class="p-0 mb-4">
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 green"></div>
        <h6 class="text-justify m-0 mr-2">
          اگه توی صفحه "جدول تیم‌ها" دور تیمت این رنگی بود
          یعنی نوبتت رو توی اون دور بازی کردی
          اما اگه توی صفحه "رده بندی" دور تیمت این رنگی بود
          یعنی تیمت اول شده.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue"></div>
        <h6 class="text-justify m-0 mr-2">
          اگه دور تیمت این رنگی بود
          یعنی نوبت تیم توعه.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 gray"></div>
        <h6 class="text-justify m-0 mr-2">
          اگه توی صفحه "جدول تیم‌ها" دور تیمت این رنگی بود
          یعنی هنوز نوبت تیمت نشده و باید منتظر بمونی
          اما اگه توی صفحه "رده بندی" دور تیمت این رنگی بود
          یعنی تیمت اول نشده.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 red"></div>
        <h6 class="text-justify m-0 mr-2">
          اگه دور تیمت این رنگی بود
          یعنی تیمت از بازی حذف شده.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 yellow c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-sync-alt"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          با این دکمه می‌تونی
          کلمه‌ای که بازی برات آوردرو عوض کنی.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 yellow c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-exclamation-triangle"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          با این دکمه می‌تونی
          برای تیم حریف خطا ثبت کنی.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-play"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          وقتی آماده بودی و خواستی شروع کنی به اجرای کلمه، این دکمرو میزنی.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-check"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          اگه تیم حریف تونست کلمرو حدس بزنه این دکمرو میزنی تا امتیازش ثبت بشه.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-info-circle"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          اینکه دیگه توضیح نمیخواد! همین دکمرو زدی که اومدی اینجا دیگه.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-list-ul"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          لیست کلماتی که بازی کردید رو توی صفحه آمار میتونی ببینی.
          این کلمه تو رو به صفحه آمار میبره.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-list-ol"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          رتبه‌بندی تیما رو می‌تونی تو صفحه رده‌بندی ببینی.
          با این دکمه به صفحه رده‌بندی میری.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 blue c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-home"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          با این دکمه به صفحه اول بازی برمیگردی.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center mb-2 mb-md-3">
        <div class="round shadow square3 red c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-times"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          اگه حریف نتونست کلمرو حدس بزنه این دکمرو میزنی.
        </h6>
      </li>
      <hr>
      <li class="d-flex flex-row align-items-center">
        <div class="round shadow square3 red c-light d-flex flex-column align-items-center">
          <h5 class="h-100 my-auto"><i class="fas fa-door-open"></i></h5>
        </div>
        <h6 class="text-justify m-0 mr-2">
          اگه خواستی بازیو تموم کنی این دکمرو میزنی.
        </h6>
      </li>
    </ul>

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
$green: #44A666;
$red: #F24B6A;
$gray: #CFCFCF;
$yellow: #F2C777;

ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}

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