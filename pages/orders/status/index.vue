<template>
  <div>
    <Header class="fix-header" title="وضعیت سفارش" />
    <div v-if="currentOrdersIsEmpty" class="container">
      <div class="msg-center">
        <p class="empty-msg">هیج سفارشی وجود ندارد</p>
      </div>
    </div>
    <div v-else>
      <div style="margin-bottom: 21vh">
        <OrderStatus v-for="order in orders" :order="order" :key="order.id" />
      </div>
      <div class="btn-container" v-if="totalOrdersAmount>0 && this.balance<totalOrdersAmount">
        <div class="payment-segment">
          <v-row no-gutters>
            <v-col class="amount" cols="6">{{ getPersianPrice(totalOrdersAmount) }}</v-col>
            <v-col class="titles" cols="6">مجموع سفارشات</v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="amount" cols="6">{{ getPersianPrice(balance) }}</v-col>
            <v-col class="titles" cols="6">اعتبار شما</v-col>
          </v-row>
        </div>
        <div class="divider"></div>
        <v-btn @click="pay" class="btn-primary" depressed height="40" color="accent">
          {{ getPersianPrice(getPayableAmount) }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatus from '@/components/order/OrderStatus'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'index',
  // middleware: 'auth',
  components: { OrderStatus },
  head:{
    title:'وضعبت سفارش'
  },
  data() {
    return {
      orders: [],
      totalOrdersAmount: 0,
      balance: 0,
      paymentUrl:''
    }
  },
  computed: {
    getPayableAmount() {
      return Math.abs(this.balance - this.totalOrdersAmount)
    },
    currentOrdersIsEmpty() {
      return this.orders.length === 0
    }
  },
  methods: {
    pay() {
      this.$repositories.order.getPaymentToken(this.getPayableAmount, 'CREDIT')
        .then(paymentTokenRes => {
          if (paymentTokenRes !== false) {
            window.location.replace(this.paymentUrl+paymentTokenRes.data.msg)
          }
        })
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  },
  async asyncData({ $repositories }) {
    const ordersRes = await $repositories.order.getCurrentOrders()
    const profile = await $repositories.customer.getCustomerProfile()
      const info = await $repositories.product.getInstructions()
    if (ordersRes !== false && profile !== false && info !==false) {
      let total = 0
      let credit = profile.data.balance
      if (ordersRes.data.length > 0) {
        for (var i = ordersRes.data.length - 1; i > -1; i--) {
          if (ordersRes.data[i].orderStates.find(state => state.type === 'SHIPPING') === undefined) {
            total = ordersRes.data.filter(order => order.orderStates.find(state => state.type === 'SHIPPING') === undefined).map(order => order.amount).reduce((previousValue, currentValue) => previousValue + currentValue)
            if (credit > ordersRes.data[i].amount || credit === ordersRes.data[i].amount) {
              credit = credit - ordersRes.data[i].amount
              ordersRes.data[i].paymentStatus = 'ENOUGH_CREDIT'
            } else {
              ordersRes.data[i].paymentStatus = 'NOT_ENOUGH_CREDIT'
            }
          } else ordersRes.data[i].paymentStatus = 'PAID'
        }
      }
      return {
        totalOrdersAmount: total,
        orders: ordersRes.data,
        balance: profile.data.balance,
        paymentUrl:info.data.paymentUrl
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
  direction: rtl;
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

.empty-msg {
  font-family: 'IranSansMobileBold', sans-serif;
  color: #808080;
  font-size: 0.8em;
  text-align: center;
  margin-top: auto;
}

.container {
  height: 85vh;
  position: relative;
  text-align: center;
}

.msg-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
