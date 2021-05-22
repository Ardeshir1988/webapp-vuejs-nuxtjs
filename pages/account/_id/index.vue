<template>
  <div>
<div style="text-align: center">
  <Header class="fix-header" title="مشخصات کاربر" />
  <div style='padding-top: 4vh;'>
    <v-text-field
      reverse
      filled
      class="txt-field"
      v-model="name"
      label="نام و نام خانوادگی"
    ></v-text-field>
    <v-text-field
      reverse
      filled
      class="txt-field"
      readonly
      :value="mobile"
      label='شماره همراه'
    ></v-text-field>
    <v-text-field
      reverse
      filled
      class="txt-field"
      v-model="tel"
      label="تلفن"
    ></v-text-field>
  </div>
</div>
    <div class="btn-container">
      <v-btn :loading="loading" @click="saveCustomerData" class="btn-primary" depressed height="40" color="accent">
        ذخیره
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  head:{
    title:'مشخصات کاربری'
  },
  data(){
    return{
      loading:false
    }
  },
  methods:{
    saveCustomerData(){
      this.$repositories.customer.updateProfile({name:this.name,number:this.tel})
      .then(res=>{
        if (res !== false){
          this.$notifier.showMessage({ content: 'اطلاعات شما ثبت گردید.',
            color: 'success', title: 'موفقیت آمیز' , icon: 'mdi-check-circle-outline' })
          this.$router.push('/account')
        }
      })
    }
  },
  async asyncData({ $repositories }) {
    let responseData = await $repositories.customer.getCustomerProfile()
    if (responseData !== false) {
      return{
        mobile:responseData.data.mobile,
        tel:responseData.data.number,
        name:responseData.data.name

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
.txt-field{
  margin-right: 5vw;
  margin-left: 5vw;
}
.fix-header {
  position: fixed;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  elevation: higher;
}
.txt-fields{
  margin-top: 10vh;
}
</style>
