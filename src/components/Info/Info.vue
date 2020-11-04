<template>
  <div class="d-flex flex-column flex-1 col-xl-10 col-12 mx-auto p-0">
    <ul class="p-0 mb-4">
      <InfoItem :icon="''" :color="'green'"
                :text=" 'اگه توی صفحه جدول تیم‌ها دور تیمت این رنگی بود یعنی نوبتت رو توی اون دور بازی کردی اما اگه توی صفحه رده بندی دور تیمت این رنگی بود یعنی تیمت اول شده.' "/>

      <hr>
      <InfoItem :icon="''" :color="'blue'" :text="'اگه دور تیمت این رنگی بود یعنی نوبت تیم توعه.'"/>
      <hr>
      <InfoItem :icon="''" :color="'gray'"
                :text="'اگه توی صفحه جدول تیم‌ها دور تیمت این رنگی بود یعنی هنوز نوبت تیمت نشده و باید منتظر بمونی اما اگه توی صفحه رده بندی دور تیمت این رنگی بود یعنی تیمت اول نشده.'"/>
      <hr>
      <InfoItem :icon="''" :color="'red'" :text="'اگه دور تیمت این رنگی بود یعنی تیمت از بازی حذف شده.'"/>
      <hr>
      <InfoItem :icon="'fa-play'" :color="'blue'"
                :text="'وقتی آماده بودی و خواستی شروع کنی به اجرای کلمه، این دکمرو میزنی.'"/>
      <hr>
      <InfoItem :icon="'fa-check'" :color="'blue'"
                :text="'اگه تیم حریف تونست کلمرو حدس بزنه این دکمرو میزنی تا امتیازش ثبت بشه.'"/>
      <hr>
      <InfoItem :icon="'fa-info-circle'" :color="'blue'"
                :text="'اینکه دیگه توضیح نمیخواد! همین دکمرو زدی که اومدی اینجا دیگه.'"/>
      <hr>
      <InfoItem :icon="'fa-list-ul'" :color="'blue'"
                :text="'لیست کلماتی که بازی کردید رو توی صفحه آمار میتونی ببینی. این کلمه تو رو به صفحه آمار میبره.'"/>
      <hr>
      <InfoItem :icon="'fa-list-ol'" :color="'blue'"
                :text="'رتبه‌بندی تیما رو می‌تونی تو صفحه رده‌بندی ببینی. با این دکمه به صفحه رده‌بندی میری.'"/>
      <hr>
      <InfoItem :icon="'fa-home'" :color="'blue'" :text="'با این دکمه به صفحه اول بازی برمیگردی.'"/>
      <hr>
      <InfoItem :icon="'fa-sync-alt'" :color="'yellow'"
                :text="'با این دکمه می‌تونی کلمه‌ای که بازی برات آوردرو عوض کنی.'"/>
      <hr>
      <InfoItem :icon="'fa-exclamation-triangle'" :color="'yellow'"
                :text="'با این دکمه می‌تونی برای تیم حریف خطا ثبت کنی.'"/>
      <hr>
      <InfoItem :icon="'fa-times'" :color="'red'" :text="'اگه حریف نتونست کلمرو حدس بزنه این دکمرو میزنی.'"/>
      <hr>
      <InfoItem :icon="'fa-door-open'" :color="'red'" :text="'اگه خواستی بازیو تموم کنی این دکمرو میزنی.'"/>
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
import InfoItem from "@/components/Info/InfoItem";

export default {
  components: {
    InfoItem
  }
}
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
</style>