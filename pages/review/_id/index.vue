<template>
  <div>
    <div class="tracking-number">
      {{ this.$route.params.id }} شماره سفارش
    </div>
    <div :class="selectDivider(this.reviewDto.customerFeeling)"></div>
    <div class="review">آیا از نحوه سرویس دهی ما رضایت داشتید؟</div>
    <v-row no-gutters>
      <v-col class="left-col">
        <v-sheet outlined rounded>
          <v-img contain class="img-status" src="/review-bad.svg"
                 :class="this.reviewDto.customerFeeling === 'BAD' ? '' :'img-disable'" />
          <div class="review-status-color"></div>
        </v-sheet>
      </v-col>
      <v-col class="center-col">
        <v-sheet outlined rounded>
          <v-img contain class="img-status" src="/review-good.svg"
                 :class="this.reviewDto.customerFeeling === 'GOOD' ? '' :'img-disable'" />
          <div class="review-status-color"></div>
        </v-sheet>
      </v-col>
      <v-col class="right-col">
        <v-sheet outlined rounded>
          <v-img contain class="img-status" src="/review-perfect.svg"
                 :class="this.reviewDto.customerFeeling === 'PERFECT' ? '' :'img-disable'" />
          <div class="review-status-color"></div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  middleware: 'auth',
  data() {
    return {
      reviewDto: { orderTrackingNumber: this.$route.params.id, customerFeeling: 'NOT_SELECTED', feedbackCheckPoint: [], reason: '' }
    }
  },
  methods: {
    saveReview() {
      this.$repositories.order.saveOrderReview(this.reviewDto)
        .then(res => {
          if (res !== false) {
            this.redirect('/')
          }
        })
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
    },
  },
  async asyncData({ $repositories, route, redirect }) {
    const needOrderRes = await $repositories.order.needOrderReview(route.params.id)
    if (needOrderRes !== false) {
      if (needOrderRes.data.result === false)
        redirect('/')
    }
  }
}
</script>

<style scoped>
.tracking-number{
  font-family: 'IranSansMobileBold', sans-serif;
  font-size: 1em;
  margin: 5vh auto;
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
.review{
  text-align: center;
  font-family:'IranSansMobileMedium', sans-serif;
  font-size: 0.9em;
  margin: 3vh auto;
}
.img-status {
  height: 16vw;
  margin: 2vw;
}
.img-disable {
  filter: grayscale(0.9) opacity(0.3);
}
.left-col{
  margin-left: 4vw;
}
.right-col{
  margin-right: 4vw;
}
.center-col{
  margin-right: 4vw;
  margin-left: 4vw;
}

.review-status-color {
  height: 4px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  background-color: #EDEDED;
}
</style>
