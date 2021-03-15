<template>
  <div>
  <v-bottom-sheet v-if="sheet" fullscreen class="bottom-sheet" scrollable v-model="sheet">
    <div class="address-data">
      <div class="btn-close">
        <v-btn @click="close" icon depressed>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-textarea
        label="جزییات آدرس"
        outlined
        reverse
        dense
        color="accent"
        v-model="addressDetails"
        placeholder="خیابان لواسانی ... پلاک ۲ واحد ۵"
      ></v-textarea>

      <v-text-field
        label="عنوان آدرس (اختیاری)"
        placeholder=" مانند: خانه, شرکت"
        outlined
        dense
        color="accent"
        v-model="addressTitle"
        reverse
      ></v-text-field>

      <v-text-field
        label="تلفن (اختیاری)"
        color="accent"
        dense
        outlined
        v-model="addressNumber"
        reverse
      ></v-text-field>
    </div>
    <div class="btn-container">
      <v-btn @click="saveAddress" class="btn-primary" depressed height="40" color="accent">
        ثبت آدرس
      </v-btn>
    </div>
  </v-bottom-sheet>
    <CustomerAddress v-else :marker-loc="latLng" :center="center" @changelocation="changeLatLng" @selectlocation="selectLocation" />
  </div>
</template>

<script>
import CustomerAddress from '@/components/address/CustomerAddress'

export default {
  middleware:'auth',
  name: 'index',
  components: { CustomerAddress },
  head:{
    title:'آدرس ها'
  },
  data() {
    return {
      sheet:false,
      center: { lat: 35.8011681, lng: 51.4643361 },
      latLng: { lat: 0, lng: 0 },
      addressId: null,
      addressDetails: '',
      addressNumber: '',
      addressTitle: ''
    }
  },
  methods: {
    close(){
      this.sheet = false
    },
    selectLocation(){
      if (this.latLng==={ lat: 0, lng: 0 }){
        this.$notifier.showMessage({ content: 'موقعیت مکانی را انتخاب کنید', color: 'black' })
      }else {
        this.sheet = true
      }
    },
    changeLatLng(latlng) {
      this.latLng = latlng
    },
    saveAddress() {
      if (this.latLng.lat !== 0 && this.latLng.lng !== 0) {
        if (this.addressDetails !== '') {
          const ad = {
            id: this.addressId,
            title: this.addressTitle,
            number: this.addressNumber,
            details: this.addressDetails,
            latLong: this.latLng.lat + ',' + this.latLng.lng,
          }

          if (ad.id === null)
            this.$repositories.customer
              .saveAddress(ad)
              .then(res => {
                if (res !== false) {
                  this.$router.push('/address')
                }
              })
          else
            // this.$repositories.customer
            //   .updateAddress(ad)
            //   .then(res => {
            //     if (res !== false) {
            //       this.$router.push('/address')
            //     }
            //   })
            this.$notifier.showMessage({ content: 'ویرایش آدرس امکانپذیر نیست, لطفا آدرس جدید ثبت کنید', color: 'black' })
        } else {
          console.log(this.latLng)
          this.$notifier.showMessage({ content: 'جزییات آدرس را وارد کنید', color: 'black' })
        }
      } else {
        this.$notifier.showMessage({ content: 'آدرس را روی نقشه مشخص کنید', color: 'black' })
      }
    }
  },
  async asyncData({ $repositories, route }) {
    if (route.params.id !== 'new') {
      const res = await $repositories.customer.getAddressById(route.params.id)
      if (res !== false) {
        const latlng = {
          lat: parseFloat(res.data.latLong.split(',')[0]),
          lng: parseFloat(res.data.latLong.split(',')[1])
        }
        return {
          center: latlng,
          latLng: latlng,
          addressId: res.data.id,
          addressDetails: res.data.details,
          addressNumber: res.data.number,
          addressTitle: res.data.title
        }
      }
    }else {
      return {
        sheet:false,
        center: { lat: 35.8011681, lng: 51.4643361 },
        latLng: { lat: 0, lng: 0 },
        addressId: null,
        addressDetails: '',
        addressNumber: '',
        addressTitle: ''
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

.address-data {
  margin: 3vh 2vh 2vh;
  direction: rtl;
}
.btn-close {
  text-align: left;
  margin-right: 0;
  margin-bottom: 2vh;
}
.bottom-sheet {
  height: 100%;
}
</style>
