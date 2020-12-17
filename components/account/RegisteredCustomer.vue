<template>
  <v-sheet class="customer-container" rounded outlined>
    <v-row class="row" no-gutters>
      <v-col>
        <v-img class="account-card" src="/account-card.png" />
      </v-col>
      <v-col>
        <div style="direction: rtl;margin: 1vw">
          <div class="customer-info">{{ name }}</div>
          <div class="customer-info">{{ engDigitToPersianDigit(customerInfo.mobile) }}</div>
          <v-btn rounded depressed class="btn">
            <v-icon size="24" class="icon-btn" color="secondary">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-sheet style="margin: 4vh 1.5vh 1.5vh;" rounded outlined>
      <v-row no-gutters class="row-customer-balance">
        <v-col cols="1">
          <v-icon>mdi-wallet</v-icon>
        </v-col>
        <v-col>
          اعتبار کاربر
        </v-col>
        <v-col style="text-align: left">
          {{ engDigitToPersianPrice(customerInfo.balance) }}
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'RegisteredCustomer',
  props: { customerInfo: Object },
  data() {
    return {
      name: this.customerInfo.name == null ? '' : this.customerInfo.name
    }
  },
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    engDigitToPersianDigit: function(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  }
}
</script>

<style scoped>
.row {
  margin: 1.5vh;
}

.account-card {

}

.customer-container {
  height: 32vh;
  margin: 2vh 1.6vw 1.6vw;
}

.btn {
  background-color: #E6E6E6;
}

.customer-info {
  margin: 1vh;
  font-size: 1em;
}

.row-customer-balance {
  direction: rtl;
}
</style>
