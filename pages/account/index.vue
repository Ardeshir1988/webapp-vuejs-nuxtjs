<template>
  <div>
    <Header class="header" title="حساب کاربری" />
    <Register :login="login" v-if="register" class="register-container" />
    <RegisterMobile v-if="registerMobile" @regmobile="sendOtpMobile" />
    <VerifyOtp v-if="otp" @sendotp="verifyOtp" />
    <RegisteredCustomer v-if="customer" />
    <AccountGridOptions class="account-grid-options" />
  </div>
</template>

<script>
import AccountGridOptions from '@/components/acount/AccountGridOptions'
import Register from '@/components/acount/Register'
import Header from '@/components/header/Header'
import RegisterMobile from '@/components/acount/RegisterMobile'
import VerifyOtp from '@/components/acount/VerifyOtp'
import RegisteredCustomer from '@/components/acount/RegisteredCustomer'

export default {
  name: 'index.vue',
  components: { RegisteredCustomer, VerifyOtp, RegisterMobile, Header, Register, AccountGridOptions },
  data() {
    return {
      register: true,
      registerMobile: false,
      otp: false,
      customer: false
    }
  },
  methods: {
    login() {
      this.register = false
      this.registerMobile = true
    },
    sendOtpMobile(mobile) {
      this.registerMobile = false
      this.otp = true
      console.log(mobile)
    },
    verifyOtp(otp) {
      this.otp = false
      this.customer = true
      console.log(otp)
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
}

.account-grid-options {
  bottom: 10vh;
  position: fixed;
}

.register-container {
  margin-top: 2vh;
}
</style>
