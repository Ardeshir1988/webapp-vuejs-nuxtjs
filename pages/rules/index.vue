<template>
<div>
    <Header class="fix-header" title="قوانین" />
  <div class="rules-container">
    <v-expansion-panels multiple dir="rtl">
      <v-expansion-panel>
        <v-expansion-panel-header>ثبت سفارش</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            الف- قبل از ارسال سفارش ،پرداخت مبلغ سفارش مربوطه الزامی است و در صورت عدم پرداخت، سفارش ثبت نمیگردد.
          </div>
          <div>
            ب- در صورت تغییر در لیست سفارش،می بایستی ابتدا  مبلغ سفارش کامل پرداخت شود سپس سفارش ثبت گردیده و ارسال میشود.
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>ثبت آدرس</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            الف- تغییر آدرس پس از ثبت سفارش غیر قابل تغییر میباشد؛در صورت نیاز به تغییر آدرس می بایستی قبل از ارسال با پشتیبانی تماس حاصل فرمائید.
            <p>
              • لازم به ذکر است که در صورت تغییر آدرس،بایستی سفارش مربوطه ابتدا کنسل شود و پس از ثبت آدرس جدید مجددا سفارش ثبت گردد.
            </p>
          </div>
          <div>
            ب- هزینه ارسال در صورت عدم تحویل کالا،از کاربرکسر میگردد.
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>بازه زمانی ارسال سفارش</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>الف- در صورت انتخاب ارسال سریع،بازه زمانی بین 15 الی 45 دقیقه پس از ثبت سفارش و در صورت انتخاب ارسال معمولی،بازه زمانی بین 35 الی 90 دقیقه می باشد.</div>
          <div>ب- مدت زمان انتظار سفیر درب محل تحویل سفارش 10 دقیقه می باشد،برگشت به دلیل عدم تحویل،سفارش مربوطه کنسل و هزینه ارسال آن از کاربرکسر میگردد.</div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>مرجوع کالا</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            الف- در صورتی امکان مرجوع کردن کالا وجود دارد که به دلیل تاریخ مصرف آن باشد و همچنین در صورت شکستگی و خرابی کالا در زمان بسته بندی و حمل آن تا قبل از تحویل کالا به وجود آمده باشد.
          </div>
          <div>
            ب- کالاهایی از قبیل مواد خوراکی ، آرایشی و بهداشتی به دلیل پروتکل های وزارت بهداشت غیر قابل مرجوع کردن میباشند و همچنین کلیه میوه های که از لحاظ ظاهری سالم میباشند قابل مرجوع نمی باشند( داخل میوه مانند آناناس، هندوانه ، آووکادو و... که غیر قابل تشخیص است) قابل مرجوع نمی باشد.
          </div>
          <p>لازم به ذکر است که در صورت مرجوع کردن کالا  با توجه به موارد ذکر شده تا یک ساعت پس از تحویل کالا بایستی با پشتیبانی تماس حاصل گردیده در غیر این صورت امکان مرجوع کالا وجود ندارد.</p>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>مالی</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div>
            الف- در صورت  مرجوع کل سفارش،هزینه ارسال از کاربر کسر می گردد.
          </div>
            <div>
            ب- مبلغ برگشت کالا و یا عدم موجودی کالا در اعتبار کاربر باقی می ماند.
          </div>
          <p>
             در صورت پرداخت مبلغ ذکر شده به کاربر به روش کارت به کارت(عودت اعتبار کاربر) مشتری بایستی با پشتیبانی تماس حاصل فرماید و مبلغ طی 24 ساعت کاری به کاربر عودت داده میشود.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>

  </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  head:{
    title:'قوانین استفاده'
  },
  data: () => ({
    // panel: [0, 1]
  }),
}
</script>

<style scoped>
.rules-container{
  margin-top: 12vw;
  margin-left: 2vw;
  margin-right: 2vw;
}
.fix-header {
  position: fixed;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  elevation: higher;
}
.details{
  font-family: 'IranSansMobileMedium', sans-serif;
  font-size: 0.8em;
}
.title{
  font-family: 'IranSansMobileMedium', sans-serif;
  font-size: 0.2em;
}
</style>
