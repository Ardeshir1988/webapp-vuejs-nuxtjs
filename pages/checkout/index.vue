<template>
  <div>
    <Header class="fix-header" title="نهایی سازی سفارش" />
    <CheckoutAddress :address="getSelectedAddress" />
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
          :value="normalDelivery"
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
          :value="expressDelivery"
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
          {{ getPersianDigit(cartCount) }}
          عدد
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          مجموع خرید
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(cartAmount) }}
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          هزینه ارسال
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(deliveryType) }}
        </v-col>
      </v-row>
      <v-row no-gutters dense>
        <v-col class="credit">
          قابل پرداخت
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(deliveryType + cartAmount) }}
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
          value="online"
        ></v-radio>
      </v-sheet>
      <v-spacer />
      <v-sheet class="delivery-type-item" rounded outlined>
        <v-radio
          style="margin-right: 0"
          class="radio"
          label="پرداخت نقدی"
          color="accent"
          value="cash"
        ></v-radio>
      </v-sheet>
    </v-radio-group>

    <v-sheet class="payment-status" rounded outlined>
      <v-row no-gutters dense v-if="isOnline">
        <v-col class="credit">
          اعتبار کنونی
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(balance) }}
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
import CheckoutAddress from '@/components/address/CheckoutAddress'
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: { CheckoutAddress, AddressItem, CustomerAddress, Header },
  activated() {
    $nuxt.refresh()
  },
  data() {
    return {
      addresses: [],
      addressId: '',
      deliveryType: 0,
      normalDelivery: 0,
      expressDelivery: 0,
      paymentType: 'online',
      balance: 0,
      checkoutOrderPermission: false,
      reasonCheckoutOrder: ''
    }
  },
  computed: {
    ...mapGetters({
      cartCount: 'cart/cartProductsCount',
      cartAmount: 'cart/getCartTotalAmount',
      cart: 'cart/getCartProducts'
    }),
    isOnline() {
      return this.paymentType === 'online'
    },
    getSelectedAddress() {
      const index = this.addresses.findIndex(ad => ad.selected === true)
      if (index !== -1)
        return this.addresses[index]
      else return {}
    }
  },
  methods: {
    checkout() {
      if (this.$cookies.get('token') === undefined) {
        this.$notifier.showMessage({ content: 'لطفا قبل از ثبت سفارش وارد شوید', color: 'black' })
        this.$router.push('/account')
      } else {
        let deliveryType = ''
        if (this.deliveryType === this.expressDelivery)
          deliveryType = 'EXPRESS'
        else
          deliveryType = 'SCHEDULED'
        const order = {
          customerAddressId: this.getSelectedAddress.id,
          deliveryType: deliveryType,
          products: this.cart
        }
        this.$repositories.order.checkoutOrder(order)
          .then(orderRes => {
            if (orderRes !== false) {
              if (orderRes.data.success) {
                this.$cookies.set('order', orderRes.data, { maxAge: 60 * 15 })
                this.$router.push('/checkout/done')
              } else {
                this.$notifier.showMessage({ content: orderRes.data.reason, color: 'black' })
                this.$router.push('/cart')
              }
            }
          })
      }
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  },
  async asyncData({ $repositories, $cookies }) {
    const info = await $repositories.product.getSystemInfo()
    if ($cookies.get('token') !== undefined) {
      const profile = await $repositories.customer.getCustomerProfile()
      const addressesRes = await $repositories.customer.getAddresses()
      if (addressesRes !== false && info !== false && profile !== false) {
        return {
          addresses: addressesRes.data,
          balance: profile.data.balance,
          deliveryType: info.data.normalDeliveryCost,
          normalDelivery: info.data.normalDeliveryCost,
          expressDelivery: info.data.expressDeliveryCost,
          reasonCheckoutOrder: info.data.reasonCheckoutOrder,
          checkoutOrderPermission: info.data.checkoutOrderPermission
        }
      } else if (info !== false) {
        return {
          deliveryType: info.data.normalDeliveryCost,
          normalDelivery: info.data.normalDeliveryCost,
          expressDelivery: info.data.expressDeliveryCost,
          reasonCheckoutOrder: info.data.reasonCheckoutOrder,
          checkoutOrderPermission: info.data.checkoutOrderPermission
        }
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
  margin: 2vw 2vw 13vh;
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
