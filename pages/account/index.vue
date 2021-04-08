<template>
  <div>
    <Header class="header" title="حساب کاربری" />
    <Register :login="login" v-if="register" class="register-container" />
    <RegisterMobile :loading="loading" v-if="registerMobile" @regmobile="sendMobileDto" />
    <VerifyOtp v-if="otp" @changemobile="changeMobile" @sendotp="verifyOtp" :mobile="mobile" />
    <RegisteredCustomer :customer-info="customer" v-if="isCustomer" />
    <AccountGridOptions :registered="isCustomer" class="account-grid-options" :support-tel="supportTel"/>
  </div>
</template>

<script>

import AccountGridOptions from '@/components/account/AccountGridOptions'
import Register from '@/components/account/Register'
import Header from '@/components/header/Header'
import RegisterMobile from '@/components/account/RegisterMobile'
import VerifyOtp from '@/components/account/VerifyOtp'
import RegisteredCustomer from '@/components/account/RegisteredCustomer'
import Pushe from 'pushe-webpush'

export default {
  name: 'index.vue',
  components: { RegisteredCustomer, VerifyOtp, RegisterMobile, Header, Register, AccountGridOptions },
  head:{
    title:'حساب کاربری'
  },
  data() {
    return {
      register: true,
      registerMobile: false,
      otp: false,
      isCustomer: false,
      loading: false,
      mobile: '',
      customer: {},
      supportTel:''
    }
  },
  methods: {
    login() {
      this.register = false
      this.registerMobile = true

      this.$cookies.set('test', 'whyyyyy' )
    },
    async verifyOtp(otp) {
      this.loading = true
      const res = await this.$repositories.register.sendOtp({ otp: otp })
      if (res !== false) {



        this.$cookies.set('token', res.data.token, { maxAge: 60 * 60 * 24 * 90 })
        this.$cookies.set('mobile', this.mobile, { maxAge: 60 * 60 * 24 * 90 })




        this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        const resCustomer = await this.$repositories.customer.getCustomerProfile()
        if (resCustomer !== false) {
          Pushe.setCustomId(resCustomer.data.pushId)
          this.customer = resCustomer.data
          this.loading = false
          this.otp = false
          this.isCustomer = true
        }
      }
    },
    async sendMobileDto(mobile) {
      this.loading = true
      this.mobile = mobile
      const res = await this.$repositories.register.registerMobile({
        mobile: mobile,
        device: this.$ua.deviceType() + '-' + this.$ua.browser(),
        version: '1',
        customerChannel:'WEB'
      })
      if (res !== false) {
        this.$axios.setHeader('Authorization', 'Bearer ' + res.data.token)
        this.registerMobile = false
        this.otp = true
        this.loading = false
      } else {
        this.loading = false
      }
    },
    changeMobile() {
      this.registerMobile = true
      this.otp = false
    }
  },
  async asyncData({ $repositories, $cookies }) {
    if ($cookies.get('token') !== undefined) {
      let responseData = await $repositories.customer.getCustomerProfile()
      let resSystemIns = await $repositories.product.getInstructions()
      if (responseData !== false && resSystemIns !==false){
        Pushe.setCustomId(responseData.data.pushId)
        return {
          customer: {
            name: responseData.data.name,
            mobile: responseData.data.mobile,
            balance: responseData.data.balance
          },
          otp: false,
          registerMobile: false,
          register: false,
          isCustomer: true,
          supportTel: resSystemIns.data.supportTel
        }
      }
      else
        return {}
    } else {
      return {
        customer: {},
        otp: false,
        registerMobile: false,
        register: true,
        isCustomer: false
      }
    }
  },
  activated() {
    $nuxt.refresh()
  }
}
</script>

<style scoped>
.header {
  width: 100%;
}

.account-grid-options {

}

.register-container {
  margin-top: 2vh;
}
</style>
