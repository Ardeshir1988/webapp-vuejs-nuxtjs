<template>
  <v-sheet class="verify-otp" rounded outlined>
    <div class="desc">
      کد تایید به شماره {{ this.mobile }} ارسال شد
    </div>
    <v-text-field type="number" v-model="otp" class="centered-input otp" />
    <v-btn :loading="getLocalLoading" @click="sendOtp" class="primary btn">ورود</v-btn>
    <v-row no-gutters>
      <v-col>
        <v-btn @click="resendOtp" v-if="timer===0" rounded depressed class="btn-resend">
          ارسال مجدد
        </v-btn>
        <v-btn v-else rounded depressed class="btn-resend">
          {{  timer | minutesAndSeconds }}
        </v-btn>
      </v-col>
      <v-col>
        <v-btn @click="editNumber" rounded depressed class="btn-resend">
          تصحیح شماره
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: 'VerifyOtp',
  data() {
    return {
      otp: '',
      timer: 119
    }
  },
  props: { mobile: String, loading: Boolean },
  computed: {
    getLocalLoading() {
      return this.loading
    }
  },
  methods: {
    sendOtp() {
      this.$emit('sendotp', this.otp)
    },
    editNumber() {
      this.$emit('changemobile')
    },
    resendOtp(){
      this.$repositories.register.resendOtp()
      .then(res=>{
        if (res !== false) {
          this.timer = 119
        } else {

        }
      })
    }
  },
  filters: {
    minutesAndSeconds (value) {
      var minutes = Math.floor(parseInt(value, 10) / 60)
      var seconds = parseInt(value, 10) - minutes * 60
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return `${minutes}:${seconds}`
    }
  },
  mounted() {
    setInterval(() => {
      if (this.timer>0)
      this.timer -= 1
    }, 1000)
  }
}
</script>

<style scoped>
.verify-otp {
  margin: 1.6vw;
  text-align: center;
  height: 36vh;
}

.desc {
  margin: 1.6vh;
  font-size: 0.9em;
}

.otp {
  width: 25vw;
  margin: auto;
  text-align: center;
  font-size: 1.2em;
}

.btn {
  margin: 1.6vh;
  width: 25vw;
}

.btn-resend {
  text-align: center;
  background-color: #E6E6E6;
  border-radius: 5px;
  font-size: 0.9em;
  color: #808080;
  height: 5vh;
  vertical-align: center;
  width: 33vw;
}

.centered-input >>> input {
  text-align: center
}
</style>
