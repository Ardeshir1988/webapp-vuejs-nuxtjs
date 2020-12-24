<template>
  <div>
    <v-sheet rounded outlined class="new-order">
      <div class="new-order">سفارش شما با موفقیت ثبت گردید</div>
      <div class="tracking-number">شماره سفارش</div>
      <div class="tracking-number">{{ order.trackingNumber }}</div>
      <v-row no-gutters class="order-info">
        <v-col class="left-col">
          {{ order.createdDate.replace('_', ' ') }}
        </v-col>
        <v-col class="right-col">
          زمان ثبت
          <v-icon>mdi-clock-outline</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="order-info">
        <v-col class="left-col">
          {{ getDeliveryType }}
        </v-col>
        <v-col class="right-col">
          نحوه ارسال
          <v-icon>mdi-truck-outline</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="order-info">
        <v-col class="left-col" cols="9">
          {{ order.addressDetails }}
        </v-col>
        <v-col class="right-col" cols="3">
          آدرس
          <v-icon>mdi-map-marker</v-icon>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet rounded outlined class="new-order-operations">
      <v-row no-gutters class="order-info">
        <v-col class="left-col-op">
          {{ engDigitToPersianPrice(order.totalAmount) }}
        </v-col>
        <v-col class="right-col">
          مبلغ سفارش
          <v-icon>mdi-cash</v-icon>
        </v-col>
      </v-row>
      <v-row no-gutters class="order-info">
        <v-col class="left-col-op" :class="getBalanceColor">
          {{ engDigitToPersianPrice(order.customerBalance) }}
        </v-col>
        <v-col class="right-col">
          اعتبار کنونی
          <v-icon>mdi-wallet</v-icon>
        </v-col>
      </v-row>
      <div class="enough-credit" v-if="needCharge">اعتبار کافی, مبلغ سفارش از اعتبار شما کسر میشود</div>
      <div v-else>
        <div class="payment-status"> اعتبار ناکافی</div>
        <v-btn class="btn-primary" height="35" color="accent" style="direction: rtl">
          +
          {{ engDigitToPersianPrice(getChargeAmount) }}
        </v-btn>
      </div>

    </v-sheet>

    <div class="btn-container">
      <v-btn @click="gotoOrderStatus" class="btn-primary" depressed height="40" color="accent">
        وضعیت سفارش
      </v-btn>
    </div>
  </div>

</template>

<script>
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'index',
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    gotoOrderStatus(){
      this.$router.push('/orders/status')
    }
  },
  computed: {
    getDeliveryType() {
      if (this.order.deliveryType === 'EXPRESS') {
        return 'اکسپرس'
      } else
        return 'عادی'
    },
    getBalanceColor() {
      if (this.order.customerBalance > this.order.totalAmount)
        return 'enough-balance'
      else
        return 'warning-balance'
    },
    getChargeAmount() {
      return Math.abs(this.order.customerBalance - this.order.totalAmount)
    },
    needCharge() {
      const amount = this.order.customerBalance - this.order.totalAmount
      return amount >= 0
    }
  },
  async asyncData({ $cookies, redirect }) {
    if ($cookies.get('order') !== undefined) {
      return {
        order: $cookies.get('order')
      }
    } else {
      redirect('/account')
    }
  },
  activated() {
    $nuxt.refresh()
  }
}
</script>

<style scoped>
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

.new-order {
  text-align: center;
  font-size: 1.15em;
  margin: 2vh;
  color: #808080;
}

.warning-balance {
  color: #FF6672;
}

.enough-balance {
  color: #0BCE83;
}

.order-info {
  font-size: 0.9em;
  margin: 1vh;
}

.left-col {
  text-align: left;
  font-size: 0.9em;
}

.right-col-op {
  text-align: right;
  font-size: 0.9em;
}

.left-col-op {
  text-align: left;
  direction: rtl;
  font-size: 0.9em;
}

.right-col {
  font-size: 0.9em;
  text-align: right;
}

.tracking-number {
  text-align: center;
  font-size: 1.1em;
  margin: 2vh;
  color: #0BCE83;
}

.new-order-operations {
  text-align: center;
  font-size: 1.1em;
  margin: 2vh;
}

.payment-status {
  text-align: center;
  font-size: 1em;

  color: #808080;
}
.enough-credit {
  text-align: center;
  font-size: 0.9em;
  color: #808080;
}
</style>
