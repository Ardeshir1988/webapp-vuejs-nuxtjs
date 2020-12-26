<template>
  <div>
    <Header class="fix-header" title="وضعیت سفارش" />
    <div style="margin-bottom: 24vh">
      <OrderStatus v-for="order in orders" :order="order" :key="order.id" />
    </div>
    <div class="btn-container">
      <div class="payment-segment">
        <v-row no-gutters>
          <v-col class="amount" cols="6">{{ getPersianPrice(totalOrdersAmount) }}</v-col>
          <v-col class="titles" cols="6">مجموع سفارشات</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">{{ getPersianPrice(balance) }}</v-col>
          <v-col class="titles" cols="6">اعتبار کنونی</v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="amount" cols="6">{{ getPersianPrice(getPayableAmount) }}</v-col>
          <v-col class="titles" cols="6">قابل پرداخت</v-col>
        </v-row>
      </div>
      <div class="divider"></div>
      <v-btn @click="pay" class="btn-primary" depressed height="40" color="accent">
        +{{ getPersianDigit(getPayableAmount) }}
        افزایش اعتبار
      </v-btn>
    </div>
  </div>
</template>

<script>
import OrderStatus from '@/components/order/OrderStatus'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'index',
  components: { OrderStatus },
  data() {
    return {
      orders: [],
      totalOrdersAmount:0,
      balance:0
    }
  },
  computed: {
    getPayableAmount() {
      return Math.abs(this.balance - this.totalOrdersAmount)
    }
  },
  methods: {
    pay() {

    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val){
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  },
  async asyncData({ $repositories }) {
    const ordersRes = await $repositories.order.getCurrentOrders()
    const profile = await $repositories.customer.getCustomerProfile()
    if (ordersRes !== false && profile !== false) {
      const total = ordersRes.data.map(order => order.amount).reduce((previousValue, currentValue) => previousValue + currentValue)
      return {
        totalOrdersAmount: total,
        orders: ordersRes.data,
        balance: profile.data.balance
      }
    }
  }
}
</script>

<style scoped>
.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  flex-flow: column;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #F2F3F5;
}

.divider {
  background-color: #a3a3a3;
  width: 100%;
  opacity: 0.5;
  height: 1px;
}

.btn-primary {
  margin: 2vh auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}

.payment-segment {
  font-size: 0.9em;
  color: #8E8E8E;
  width: 94%;
  margin: 1vw;
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
</style>
