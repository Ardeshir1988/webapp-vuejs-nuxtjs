<template>
  <v-sheet class="register-mobile" rounded outlined min-height='190'>
    <div class="desc">
      تلفن همراه خود را وارد نمایید
    </div>
    <v-text-field
      class="input-mobile"
      outlined
      type="number"
      placeholder="0912 XXX XX XX"
      v-model="mobile"
      :prepend-inner-icon="mdiPhone" />
    <v-btn :loading="getLocalLoading" @click="sendOtp" class="primary btn-register">دریافت کد تایید</v-btn>
  </v-sheet>
</template>

<script>
import {mdiPhone } from '@mdi/js'

export default {
  name: 'RegisterMobile',
  props: { loading: Boolean },
  data() {
    return {
      mdiPhone: mdiPhone,
      mobile: '',
    }
  },
  computed:{
    getLocalLoading(){
      return this.loading
    }
  },
  methods: {
    sendOtp() {
      this.$emit('regmobile', this.mobile)
    }
  }
}
</script>

<style scoped>
.register-mobile {
  margin: 1.6vw;
  text-align: center;
  height: 36vh;
}

.btn-register {
  margin: 1vh;
  color: white;
  font-size: 0.9em;
  width: 38vw;
}

.input-mobile {
  margin: 1.5vw 10.5vw;
}

.desc {
  font-size: 1em;
  margin: 1.5vh;
}
</style>
