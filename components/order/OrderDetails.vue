<template>
  <div class="sheet-container">

    <div class="btn-close">
      <v-btn @click="close" icon depressed>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="item-list">
      <OrderProductItem v-for="item in this.orderDetails.products" :product-item="item" :key="item.name" />
    </div>

    <div class="btn-container">
      <div class="payment-segment">
        <v-row no-gutters>
          <v-col class="amount" cols="6">
            {{ getPersianDigit(this.orderDetails.productsCount) }}
            عدد
          </v-col>
          <v-col class="titles" cols="6">تعداد اجناس</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">{{ getPersianPrice(this.orderDetails.totalAmount) }}</v-col>
          <v-col class="titles" cols="6">مجموع خرید</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">
            {{ getPersianPrice(this.orderDetails.totalDiscountAmount) }}
          </v-col>
          <v-col class="titles" cols="6">مجموع تخفیف</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">{{ getPersianPrice(this.orderDetails.deliveryCost) }}</v-col>
          <v-col class="titles" cols="6">هزینه ارسال</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">
            {{ getPersianPrice(this.orderDetails.totalAmount + this.orderDetails.deliveryCost) }}
          </v-col>
          <v-col class="titles" cols="6">قابل پرداخت</v-col>
        </v-row>
      </div>
    </div>
  </div>

</template>

<script>
import OrderProductItem from '@/components/order/OrderProductItem'
import Header from '@/components/header/Header'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'OrderDetails',
  props: { orderDetails: Object },
  components: { Header, OrderProductItem },
  methods: {
    close() {
      this.$emit('close')
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  }
}
</script>

<style scoped>
.sheet-container {
  background-color: white;
}

.btn-close {
  text-align: right;
  margin-right: 2vw;
}

.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 0;
  display: flex;
  flex-flow: column;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  background-color: #F2F3F5;
}

.amount {
  text-align: left;
  direction: rtl;
  padding: 1vw;
}

.titles {
  text-align: right;
  direction: rtl;
  padding: 1vw;
}

.item-list {
  margin-bottom: 22vh;
}

.payment-segment {
  font-size: 0.9em;
  color: #8E8E8E;
  width: 94%;
  margin: 1vw;
}
</style>
