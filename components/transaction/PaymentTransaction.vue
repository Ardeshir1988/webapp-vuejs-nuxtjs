<template>
  <div>
    <v-row style="margin: 1vw" no-gutters>
      <v-col cols="11">
        <v-sheet class="sheet-order-transaction" rounded outlined>
          <v-btn disabled depressed icon class="transaction-icon">
            <v-icon>{{mdiDotsHorizontal}}</v-icon>
          </v-btn>
          <div class="content">
            <v-row no-gutters style="margin-top: 1vh">
              <v-col class="left-col" cols="6">{{getPaymentType}}</v-col>
              <v-col class="right-col" cols="5">پرداخت وجه</v-col>
            </v-row>
            <v-row no-gutters style="margin-top: 2vh;margin-bottom: 1vh;color: #808080">
              <v-col class="left-col" cols="6">{{getPersianPrice(transaction.amount)}}</v-col>
              <v-col class="right-col" cols="5">{{getPersianDigit(transaction.createdDate)}}</v-col>
            </v-row>
          </div>
          <div class="item-indicator"></div>
        </v-sheet>
      </v-col>

      <v-col cols="1" class="transaction-icon">
        <v-icon color="accent">{{mdiCash}}</v-icon>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'
import { mdiDotsHorizontal, mdiCash } from '@mdi/js'

export default {
  name: 'PaymentTransaction',
  props: { transaction: Object },
  data() {
    return {
      mdiCash: mdiCash,
      mdiDotsHorizontal: mdiDotsHorizontal
    }
  },
  computed: {
    getPaymentType() {
      switch (this.transaction.paymentType) {
        case 'ONLINE': {
          return 'آنلاین'
        }
        case 'CASH': {
          return 'نقدی'
        }
        case 'POS': {
          return 'کارت خوان'
        }
        case 'CART': {
          return 'کارت به کارت'
        }
      }
    }
  },
  methods: {
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
