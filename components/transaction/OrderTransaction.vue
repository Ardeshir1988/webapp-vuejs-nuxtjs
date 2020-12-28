<template>
  <div>
    <v-row style="margin: 1vw" no-gutters>
      <v-col cols="11">
        <v-sheet class="sheet-order-transaction" rounded outlined>
          <v-btn @click="getOrderDetails" depressed icon class="transaction-icon">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <div class="content">
            <v-row no-gutters style="margin-top: 1vh">
              <v-col class="left-col" cols="6">{{ transaction.reference }}</v-col>
              <v-col class="right-col" cols="5">سفارش</v-col>
            </v-row>
            <v-row no-gutters style="margin-top: 2vh;margin-bottom: 1vh;color: #808080">
              <v-col class="left-col" cols="6">{{ getPersianPrice(transaction.amount) }}</v-col>
              <v-col class="right-col" cols="5">{{ getPersianDigit(transaction.createdDate) }}</v-col>
            </v-row>
          </div>
          <div class="item-indicator"></div>
        </v-sheet>
      </v-col>

      <v-col cols="1" class="transaction-icon">
        <v-icon color="accent">mdi-cart</v-icon>
      </v-col>
    </v-row>
    <v-bottom-sheet fullscreen class="bottom-sheet" scrollable v-model="sheet">
      <OrderDetails @close="closeSheet" class="order-details" :order-details="transactionDetail" />
    </v-bottom-sheet>
  </div>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'
import OrderDetails from '@/components/order/OrderDetails'

export default {
  name: 'OrderTransaction',
  components: { OrderDetails },
  props: { transaction: Object },
  data() {
    return {
      sheet: false,
      transactionDetail: {}
    }
  },
  methods: {
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    closeSheet() {
      this.sheet = false
    },
    async getOrderDetails() {
      this.$repositories.order.getTransactionDetails(this.transaction.id)
        .then(res => {
          if (res.data !== false) {
            this.transactionDetail = res.data
            this.sheet = true
          }
        })
    }
  }
}
</script>

<style scoped>
.sheet-order-transaction {
  margin: 2vw;
  font-size: 0.9em;
  display: flex;
  flex-flow: row;
}

.transaction-icon {
  margin: auto;
  text-align: center;
  min-height: 100%;
}

.content {
  display: inline;
  width: 99vw;
}

.item-indicator {
  background-color: #0BCE83;
  width: 1.25vw;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}

.left-col {
  text-align: left;
  direction: rtl;
  margin: auto;
  padding-left: 1vw;
  font-size: 1em;
}

.right-col {
  text-align: right;
  margin: auto;
  padding-right: 1vw;
  font-size: 1em;
}
</style>
