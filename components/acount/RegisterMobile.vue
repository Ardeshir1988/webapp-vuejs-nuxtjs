<template>
  <v-sheet class="register-mobile" rounded outlined>
    <div class="desc">
      تلفن همراه خود را وارد نمایید
    </div>
    <v-text-field
      class="input-mobile"
      outlined
      type="number"
      placeholder="0912 xxx xx xx"
      v-model="mobile"
      prepend-inner-icon="mdi-phone"/>
    <v-btn @click="sendOtp"  class="primary btn-register">دریافت کد تایید</v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: 'RegisterMobile',
  data(){
    return{
      mobile:''
    }
  },
    methods: {
      sendOtp () {
        this.$emit('regmobile', this.mobile)
      }
  }
}
</script>

<style scoped>
.register-mobile{
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
.input-mobile{
  margin: 1.5vh;
}
.desc{
  font-size: 1em;
  margin: 1.5vh;
}
</style>
