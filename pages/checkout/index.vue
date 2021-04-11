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
          جمع کل
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(deliveryType + cartAmount) }}
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="payment-status" rounded outlined>
      <v-row no-gutters dense>
        <v-col class="credit">
          اعتبار کنونی
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice(balance) }}
        </v-col>
      </v-row>
      <div class="payment-status-msg" v-if="needPay">اعتبار کافی است, جمع کل از اعتبار شما کسر خواهد شد</div>
      <v-row no-gutters dense v-else>
        <v-col class="credit">
          قابل پرداخت
        </v-col>
        <v-col class="balance">
          {{ getPersianPrice((deliveryType + cartAmount) - this.balance) }}
        </v-col>
      </v-row>
    </v-sheet>

    <div class="btn-container">
      <v-btn v-if="needPay" @click="checkout" class="btn-primary" depressed height="40" color="accent">
        ثبت سفارش
      </v-btn>
      <v-btn v-else @click="getPaymentToken" class="btn-primary" depressed height="40" color="accent">
        پرداخت
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
  head: {
    title: 'ثبت سفارش'
  },
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
      balance: 0,
      checkoutOrderPermission: false,
      reasonCheckoutOrder: '',
      paymentUrl: ''
    }
  },
  computed: {
    ...mapGetters({
      cartCount: 'cart/cartProductsCount',
      cartAmount: 'cart/getCartTotalAmount',
      cart: 'cart/getCartProducts'
    }),
    needPay() {
      return this.balance >= (this.cartAmount + this.deliveryType)
    },
    getSelectedAddress() {
      const index = this.addresses.findIndex(ad => ad.selected === true)
      if (index !== -1)
        return this.addresses[index]
      else return {}
    }
  },
  methods: {
    getPaymentToken() {
      if (this.$storage.getCookie('token') === undefined) {
        this.$notifier.showMessage({ content: 'لطفا قبل از پرداخت وارد شوید', color: 'black' })
        this.$router.push('/account')
      } else {
        let deliveryType = ''
        if (this.deliveryType === this.expressDelivery)
          deliveryType = 'EXPRESS'
        else
          deliveryType = 'SCHEDULED'

        if (this.addresses === undefined || this.addresses.length === 0) {
          this.$notifier.showMessage({ content: 'لطفا آدرس سفارش را انتخاب کنید', color: 'black' })
        } else {
          this.$repositories.order.getPaymentToken((this.cartAmount + this.deliveryType) - this.balance, 'ORDER')
            .then(paymentTokenRes => {
              if (paymentTokenRes !== false) {
                const order = {
                  customerAddressId: this.getSelectedAddress.id,
                  deliveryType: deliveryType,
                  products: this.cart,
                  resNum: paymentTokenRes.data.msg
                }
                this.$repositories.order.saveUnpaidOrder(order)
                  .then(saveUnpaidOrder => {
                    if (saveUnpaidOrder !== false){
                      if(saveUnpaidOrder.data.success)
                      window.location.replace(this.paymentUrl + paymentTokenRes.data.msg)
                      else {
                        this.$notifier.showMessage({ content: saveUnpaidOrder.data.reason, color: 'black' })
                        this.$router.push('/cart')
                      }
                    }
                  })
              }
            })
        }
      }
    },
    checkout() {
      if (this.$storage.getCookie('token') === undefined) {
        this.$notifier.showMessage({ content: 'لطفا قبل از ثبت سفارش وارد شوید', color: 'black' })
        this.$router.push('/account')
      } else {
        let deliveryType = ''
        if (this.deliveryType === this.expressDelivery)
          deliveryType = 'EXPRESS'
        else
          deliveryType = 'SCHEDULED'

        if (this.addresses === undefined || this.addresses.length === 0) {
          this.$notifier.showMessage({ content: 'لطفا آدرس سفارش را انتخاب کنید', color: 'black' })
        } else {
          const order = {
            customerAddressId: this.getSelectedAddress.id,
            deliveryType: deliveryType,
            products: this.cart
          }
          this.$repositories.order.checkoutOrder(order)
            .then(orderRes => {
              if (orderRes !== false) {
                if (orderRes.data.success) {
                  this.$storage.setCookie('order', orderRes.data, { maxAge: 60 * 15 })
                  this.$storage.setCookie('address', this.getSelectedAddress, { maxAge: 60 * 15 })
                  this.$router.push('/checkout/done')
                } else {
                  this.$notifier.showMessage({ content: orderRes.data.reason, color: 'black' })
                  this.$router.push('/cart')
                }
              }
            })
        }
      }
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    }
  },
  async asyncData({ $repositories, redirect, route, app }) {
    const info = await $repositories.product.getInstructions()
    if (app.$storage.getCookie('token') !== undefined) {
      const profile = await $repositories.customer.getCustomerProfile()
      const addressesRes = await $repositories.customer.getAddresses()
      if (addressesRes !== false && info !== false && profile !== false) {
        if (route.query.autoCheckout) {
          const checkedOutOrder = await $repositories.order.getCheckedOutOrder(route.query.orderId)
          if (checkedOutOrder !== false) {
            await app.$storage.setCookie('order', checkedOutOrder.data, { maxAge: 60 * 15 })
            const index = addressesRes.data.findIndex(ad => ad.selected === true)
            await app.$storage.setCookie('address', addressesRes.data[index], { maxAge: 60 * 15 })
            redirect('/checkout/done')
          }
        }
        return {
          addresses: addressesRes.data,
          balance: profile.data.balance,
          paymentUrl: info.data.paymentUrl,
          deliveryType: info.data.normalDeliveryCost,
          normalDelivery: info.data.normalDeliveryCost,
          expressDelivery: info.data.expressDeliveryCost,
          reasonCheckoutOrder: info.data.reasonCheckoutOrder,
          checkoutOrderPermission: info.data.checkoutOrderPermission
        }
      } else if (info !== false) {
        return {
          paymentUrl: info.data.paymentUrl,
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
