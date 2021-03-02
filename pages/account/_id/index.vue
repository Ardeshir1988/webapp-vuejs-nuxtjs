<template>
  <div>
<div style="text-align: center">
  <Header class="fix-header" title="مشخصات کاربر" />
  <div class="txt-fields">
    <v-text-field
      dir="rtl"
      outlined
      class="txt-field"
      v-model="name"
      hide-details
      placeholder="نام"
    ></v-text-field>

    <v-text-field
      dir="rtl"
      outlined
      class="txt-field"
      hide-details
      disabled
      :value="mobile"
    ></v-text-field>

    <v-text-field
      dir="rtl"
      outlined
      class="txt-field"
      v-model="tel"
      hide-details
      placeholder="تلفن"
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
          this.$notifier.showMessage({ content: 'اطلاعات ثبت شد', color: 'black' })
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
  margin-top: 1vh;
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
