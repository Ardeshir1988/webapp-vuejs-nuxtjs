<template>
  <div>
    <div class="tracking-number">
      {{ this.$route.params.id }} شماره سفارش
    </div>
    <div :class="selectDivider(this.reviewDto.customerFeeling)"></div>
    <div class="review">آیا از نحوه هایپرجت رضایت داشتید؟</div>
    <v-row no-gutters>
      <v-col class="left-col">
        <v-sheet outlined rounded @click="selectFeeling('BAD')">
          <v-img contain class="img-status" :src="require('~/assets/icon/review-bad.svg')"
                 :class="this.reviewDto.customerFeeling === 'BAD' ? '' :'img-disable'" />
          <div class="feeling-name">بد</div>
          <div :class="this.reviewDto.customerFeeling ===  'BAD' ? 'review-status-bad' :'review-status-color'"></div>
        </v-sheet>
      </v-col>
      <v-col class="center-col">
        <v-sheet outlined rounded @click="selectFeeling('GOOD')">
          <v-img contain class="img-status" :src="require('~/assets/icon/review-good.svg')"
                 :class="this.reviewDto.customerFeeling === 'GOOD' ? '' :'img-disable'" />
          <div class="feeling-name">خوب</div>
          <div :class="this.reviewDto.customerFeeling ===  'GOOD' ? 'review-status-good' :'review-status-color'"></div>
        </v-sheet>
      </v-col>
      <v-col class="right-col">
        <v-sheet outlined rounded @click="selectFeeling('PERFECT')">
          <v-img contain class="img-status" :src="require('~/assets/icon/review-perfect.svg')"
                 :class="this.reviewDto.customerFeeling === 'PERFECT' ? '' :'img-disable'" />
          <div class="feeling-name">عالی</div>
          <div
            :class="this.reviewDto.customerFeeling ===  'PERFECT' ? 'review-status-perfect' :'review-status-color'"></div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-textarea
      height="90"
      dir="rtl"
      class="description"
      outlined
      placeholder="توضیحات"
      v-model="reviewDto.reason"
      hide-details
    ></v-textarea>
    <div v-if="isBad">
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="تاخیر در تحویل"
        value="SHIPPING_DELAY"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="نحوه برخورد سفیر"
        value="COURIER_BEHAVIOUR"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="کیفیت اجناس"
        value="PRODUCT_QUALITY"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="پاسخگو نبودن پشتیبان"
        value="POOR_SUPPORT"
      ></v-checkbox>
      <br/>
    </div>
    <div v-else>
      <div class="review">کدام یک از موارد زیر می تواند باعث بهتر شدن هایپر جت شود؟</div>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="بالا بردن سرعت سرویس دهی"
        value="ّIMPROVE_SPEED"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="بیشتر شدن تنوع کالا"
        value="IMPROVE_DIVERSITY"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="بهتر شدن کیفیت و تازگی کالاها"
        value="IMPROVE_QUALITY"
      ></v-checkbox>
      <v-checkbox
        dense
        hide-details
        class="feedback-checkbox"
        v-model="feedback"
        label="موجود کردن کالاهای ارزان تر (با تخفیف بیشتر)"
        value="IMPROVE_CHEAP_BRAND"
      ></v-checkbox>
      <br/>
    </div>
    <div class="btn-container">
      <v-btn :loading="loading" @click="submitReview" class="btn-primary" depressed height="40" color="accent">
        ثبت نظر
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiAlertOutline} from '@mdi/js'

export default {
  name: 'index',
  // middleware: 'auth',
  head:{
    title:'نظر سنجی'
  },
  data() {
    return {
      mdiAlertOutline: mdiAlertOutline,
      loading:false,
      isBad:false,
      feedback:[],
      reviewDto: {
        orderTrackingNumber: this.$route.params.id,
        customerFeeling: 'NOT_SELECTED',
        feedbackCheckPoint: [],
        reason: ''
      }
    }
  },
  async mounted() {
    const needOrderRes = await this.$repositories.order.needOrderReview(this.$route.params.id)
    if (needOrderRes !== false) {

      if (needOrderRes.data.result === false){
        this.$notifier.showMessage({
          content: 'قبلا نظرسنجی برای این سفارش ثبت گردیده است.',
          color: 'info',
          title: 'تکرار نظر سنجی',
          icon: this.mdiAlertOutline
        })
        this.$router.push('/')
      }
    }
  },
  methods: {
    selectFeeling(feeling) {
      if (feeling === 'GOOD'){
        this.isBad = false
        this.reviewDto.customerFeeling = 'GOOD'
      }
      else if (feeling === 'PERFECT'){
        this.isBad = false
        this.reviewDto.customerFeeling = 'PERFECT'
      }
      else{
        this.isBad = true
        this.reviewDto.customerFeeling = 'BAD'
      }
    },
    submitReview() {
      if (this.reviewDto.customerFeeling === 'NOT_SELECTED')
        this.$notifier.showMessage({
          content: 'لطفا یکی از گزینه ها را انتخاب کنید',
          color: 'info',
          title: 'توجه',
          icon: this.mdiAlertOutline
        })
      else {
        this.reviewDto.feedbackCheckPoint = this.feedback
        this.loading = true
        this.$repositories.order.saveOrderReview(this.reviewDto)
          .then(res => {
            if (res !== false) {
              this.$router.push('/')
            }else {
              this.loading = false
            }
          })
      }
    },
    selectDivider(customerFeeling) {
      if (customerFeeling === 'NOT_SELECTED')
        return 'divider-not-selected'
      else if (customerFeeling === 'GOOD')
        return 'divider-good'
      else if (customerFeeling === 'PERFECT')
        return 'divider-perfect'
      else
        return 'divider-bad'
    }
  },

  async asyncData() {

  },
  async fetch({ $repositories, route, redirect, $notifier }) {

  }
}
</script>

<style scoped>
.tracking-number {
  font-family: 'IranSansMobileBold', sans-serif;
  font-size: 1em;
  margin: 3vh auto;
  text-align: center;
}

.divider-not-selected {
  width: 100%;
  height: 0.6vh;
  background-color: #EDEDED;
}

.divider-good {
  width: 100%;
  height: 0.6vh;
  background-color: #FECD55;
}

.divider-bad {
  width: 100%;
  height: 0.6vh;
  background-color: #FF6672;
}

.divider-perfect {
  width: 100%;
  height: 0.6vh;
  background-color: #0BCE83;
}

.review {
  text-align: center;
  font-family: 'IranSansMobileMedium', sans-serif;
  font-size: 0.9em;
  margin: 2vh auto;
}

.img-status {
  height: 16vw;
  margin: 2vw;
}

.img-disable {
  filter: grayscale(0.9) opacity(0.3);
}

.left-col {
  margin-left: 4vw;
}

.right-col {
  margin-right: 4vw;
}

.center-col {
  margin-right: 4vw;
  margin-left: 4vw;
}

.feeling-name {
  text-align: center;
  font-size: 0.9em;
  font-family: 'IranSansMobileMedium', sans-serif;
  margin: 1vw;
}

.review-status-color {
  height: 4px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: #EDEDED;
}

.review-status-perfect {
  height: 4px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: #0BCE83;
}

.review-status-good {
  height: 4px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: #FECD55;
}

.review-status-bad {
  height: 4px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: #FF6672;
}
.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #F2F3F5;
}

.btn-primary {
  margin: 2vh auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}
.description {
  margin: 4vw;
}
.feedback-checkbox{
  direction: rtl;
}
</style>
