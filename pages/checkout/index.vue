<template>
  <div>
    <Header class="fix-header" title="نهایی سازی سفارش" />
    <v-sheet class="address-item-sheet" rounded outlined>
      <div class="address-item-details"> {{ address.title }}</div>
      <div class="address-item-details">آدرس: {{ address.details }}</div>
      <div class="address-item-details">تلفن: {{ address.number }}</div>
    </v-sheet>
    <nuxt-link style="text-decoration: none; color: inherit;" to="/address">
      <v-btn rounded depressed class="btn-edit-address">ویرایش آدرس
        <v-icon right dark>mdi-map-marker</v-icon>
      </v-btn>
    </nuxt-link>

    <v-radio-group
      dense
      v-model="deliveryType"
      hide-details
      class="delivery-type"
      row>
      <v-sheet class="delivery-type-item" rounded outlined>
        <v-radio
          style="margin-right: 0"
          label="عادی"
          color="accent"
          class="radio"
          value="0"
        ></v-radio>
        <div class="delivery-type-item-msg">
          تحویل حداکثر ۹۰ دقیقه
        </div>
      </v-sheet>
      <v-spacer />
      <v-sheet class="delivery-type-item" rounded outlined>
        <v-radio
          style="margin-right: 0"
          label="اکسپرس"
          color="accent"
          class="radio"
          value="1"
        ></v-radio>
        <div class="delivery-type-item-msg">
          تحویل حداکثر ۴۵ دقیقه
        </div>
      </v-sheet>
    </v-radio-group>

    <v-sheet class="checkout-data">
      <v-row no-gutters dense>
        <v-col class="credit">
          تعداد اجناس
        </v-col>
        <v-col class="balance">
          {{ getBalance }}
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          مجموع خرید
        </v-col>
        <v-col class="balance">
          {{ getBalance }}
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          هزینه ارسال
        </v-col>
        <v-col class="balance">
          {{ getBalance }}
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          قابل پرداخت
        </v-col>
        <v-col class="balance">
          {{ getBalance }}
        </v-col>
      </v-row>
    </v-sheet>

    <v-radio-group
      dense
      v-model="paymentType"
      hide-details
      class="delivery-type"
      row>
      <v-sheet class="delivery-type-item" rounded outlined>
        <v-radio
          style="margin-right: 0"
          label="پرداخت آنلاین"
          class="radio"
          color="accent"
          value="0"
        ></v-radio>
      </v-sheet>
      <v-spacer />
      <v-sheet class="delivery-type-item" rounded outlined>
        <v-radio
          style="margin-right: 0"
          class="radio"
          label="پرداخت نقدی"
          color="accent"
          value="1"
        ></v-radio>
      </v-sheet>
    </v-radio-group>

    <v-sheet class="payment-status" rounded outlined>
      <v-row no-gutters dense>
        <v-col class="credit">
          اعتبار کنونی
        </v-col>
        <v-col class="balance">
          {{ getBalance }}
        </v-col>
      </v-row>
      <div class="payment-status-msg">اعتبار شما فقط در صورت پرداخت آنلاین محاسبه میگردد</div>
    </v-sheet>

    <div class="btn-container">
      <v-btn @click="checkout" class="btn-primary" depressed height="40" color="accent">
        ثبت سفارش
      </v-btn>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import CustomerAddress from '@/components/address/CustomerAddress'
import AddressItem from '@/components/address/AddressItem'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'index',
  components: { AddressItem, CustomerAddress, Header },
  data() {
    return {
      address: { title: 'خانه', details: 'آدرس', number: '09122877481' },
      deliveryType: '0',
      paymentType: '0',
      balance: 0
    }
  },
  computed: {
    getBalance() {
      return PersianUtil.makePersianPrice(this.balance)
    }
  },
  methods: {
    checkout() {

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

.address-item-sheet {
  margin: 2vw;
  direction: rtl;
}

.address-item-details {
  font-size: 0.9em;
  direction: rtl;
  margin: 2vw 3vw 2vw 2vw;
  color: #8E8E8E;
  width: 80vw;
}

.btn-edit-address {
  margin-left: 2vw;
  text-align: center;
  background-color: #E6E6E6;
  border-radius: 5px;
  font-size: 0.85em;
  color: #808080;
  height: 5vh;
  vertical-align: center;
  width: 35vw;
}

.delivery-type-item {
  margin: 2vw;
  direction: rtl;
  width: 40vw;
  font-size: 0.9em;
}

.delivery-type-item-msg {
  direction: rtl;
  font-size: 0.85em;
  color: #808080;
  margin: 1vh;
  width: 90%;
  text-align: right;
}

.delivery-type {
  direction: rtl;
  margin: 0;
}

.payment-status {
  direction: rtl;
  margin: 2vw;
}

.credit {
  margin: 2vw;
  font-size: 0.9em;
}

.balance {
  margin: 2vw;
  text-align: left;
  font-size: 0.9em;
}

.radio {
  padding: 1vh;
}

.payment-status-msg {
  text-align: center;
  font-size: 0.9em;
  margin: 2vw;
}

.checkout-data {
  direction: rtl;
  font-size: 0.9em;
  margin: 2vw;
}
</style>
