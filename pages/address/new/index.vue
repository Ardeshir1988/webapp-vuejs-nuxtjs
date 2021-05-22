<template>
  <div>
    <v-bottom-sheet v-if='sheet' fullscreen class='bottom-sheet' scrollable v-model='sheet'>
      <div dir='rtl'>
        <div class='btn-close'>
          <v-btn @click='close' icon depressed>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-textarea
          reverse
          label=' آدرس  - لطفا به صورت کامل وارد شود.'
          v-model='addressDetails'
          class='txt-field'
          rows='3'
          filled
        ></v-textarea>

        <v-text-field
          label='عنوان آدرس (اختیاری)'
          reverse
          v-model='addressTitle'
          class='txt-field'
          filled
        ></v-text-field>

        <v-text-field
          label='تلفن (اختیاری)'
          reverse
          v-model='addressNumber'
          class='txt-field'
          filled
        ></v-text-field>
        <v-container class='btn-container'>
          <v-btn @click='saveAddress' class='btn-primary' depressed height='40' color='accent'>
            ثبت آدرس
          </v-btn>
        </v-container>
      </div>
    </v-bottom-sheet>
    <CustomerAddress   v-else @selectLocation='selectLocation' />
  </div>

</template>

<script>
import CustomerAddress from '@/components/address/CustomerAddress'

export default {
  middleware: 'auth',
  name: 'index',
  components: { CustomerAddress },
  head: {
    title: 'آدرس ها'
  },
  data() {
    return {
      sheet: false,
      latLng: { lat: 0, lng: 0 },
      addressId: null,
      addressDetails: '',
      addressNumber: '',
      addressTitle: '',
      checkout: false
    }
  },
  methods: {
    close() {
      this.sheet = false
    },
    selectLocation(location) {
      this.sheet = true
      this.latLng = location
    },
    saveAddress() {
      if (this.latLng.lat !== 0 && this.latLng.lng !== 0) {
        if (this.addressDetails !== '') {
          const ad = {
            id: this.addressId,
            title: this.addressTitle,
            number: this.addressNumber,
            details: this.addressDetails,
            latLong: this.latLng.lat + ',' + this.latLng.lng
          }
          if (ad.id === null)
            this.$repositories.customer
              .saveAddress(ad)
              .then(res => {
                if (res !== false) {
                  if (this.checkout) {
                    this.$repositories.customer.changeSelectedAddress(res.data.id).then(response => {
                      if (response !== false) {
                        this.$router.push('/checkout')
                      }
                    })
                  } else {
                    this.$router.push('/address')
                  }
                }
              })
        } else {
          this.$notifier.showMessage({
            content: 'لطفا آدرس را به صورت کامل وارد کنید.',
            color: 'error',
            title: 'خطا',
            icon: 'mdi-alert-circle-outline'
          })
        }
      }
    },
    async asyncData({ route }) {
        if (route.params.id === 'new_check_out') {
          return {
            checkout:  true
          }
        }
    },
  }

}
</script>

<style scoped>
.btn-container {
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

.txt-field {
  margin-right: 5vw;
  margin-left: 5vw;
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
