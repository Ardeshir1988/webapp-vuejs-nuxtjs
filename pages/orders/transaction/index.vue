<template>
  <div>
    <Header class="fix-header" title="سفارش ها و تراکنش ها" />
    <TransactionList :transactions="transactions" />
  </div>
</template>

<script>
import OrderTransaction from '@/components/transaction/OrderTransaction'
import PaymentTransaction from '@/components/transaction/PaymentTransaction'
import RefundTransaction from '@/components/transaction/RefundTransaction'
import ReturnProductTransaction from '@/components/transaction/ReturnProductTransaction'
import TransactionList from '@/components/transaction/TransactionList'

export default {
  name: 'index',
  middleware:'auth',
  head:{
    title:'سفارش ها و تراکنش ها'
  },
  components: { TransactionList, ReturnProductTransaction, RefundTransaction, PaymentTransaction, OrderTransaction },
  async asyncData({ $repositories }) {
    const transactionList =await $repositories.order.getTransactions()
    if (transactionList !== false) {
      return {
        transactions: transactionList.data
      }
    } else {
      return {
        reload: true
      }
    }
  }
}
</script>

<style scoped>

</style>
