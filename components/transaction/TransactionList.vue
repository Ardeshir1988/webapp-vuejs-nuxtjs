<template>
  <div>
    <div v-for="item in transactions">
      <OrderTransaction @click="getDetails" v-if="item.type === 'ORDER' && item.transactionDirection === 'WITHDRAW'" :transaction="item" :key="item.id" />
      <ReturnedOrderTransaction @click="getDetails" v-if="item.type === 'ORDER' && item.transactionDirection === 'DEPOSIT'" :transaction="item" :key="item.id" />
      <ReturnProductTransaction @click="getDetails" v-if="item.type === 'PRODUCT'" :transaction="item" :key="item.id" />
      <RefundTransaction v-if="item.type === 'REFUND'" :transaction="item" :key="item.id" />
      <PaymentTransaction v-if="item.type === 'PAYMENT'" :transaction="item" :key="item.id" />
    </div>
  </div>
</template>

<script>
import OrderTransaction from '@/components/transaction/OrderTransaction'
import ReturnProductTransaction from '@/components/transaction/ReturnProductTransaction'
import RefundTransaction from '@/components/transaction/RefundTransaction'
import PaymentTransaction from '@/components/transaction/PaymentTransaction'

export default {
  name: 'TransactionList',
  components: { PaymentTransaction, RefundTransaction, ReturnProductTransaction, OrderTransaction },
  props: { transactions: Array },
  methods: {
    async getDetails() {
      this.$repositories.order.getCurrentOrderDetail(this.order.reference)
        .then(res => {
          if (res.data !== false) {
            this.orderDetails = res.data
            this.sheet = true
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
