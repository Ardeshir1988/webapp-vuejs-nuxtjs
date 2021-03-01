<template>
  <div>
    <RefreshUtil v-if="reload" />
    <div v-if="!reload">
      <div>
        <AddressItem @editAddress="editAddress" @deleteAddress="deleteAddress" @selectAddress="selectAddress"
                     v-for="address in addresses"
                     :address="address" :key="address.id" />
      </div>
      <div class="btn-container">
        <v-btn @click="newAddress" class="btn-primary" depressed height="40" color="accent">
          ثبت آدرس جدید
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import AddressItem from '@/components/address/AddressItem'
import RefreshUtil from '@/components/utils/RefreshUtil'

export default {
  middleware:'auth',
  name: 'index',
  head:{
    title:'آدرس'
  },
  components: { RefreshUtil, AddressItem },
  data() {
    return {
      reload: false,
      addresses: []
    }
  },
  methods: {
    async selectAddress(addressId) {
      this.$repositories.customer.changeSelectedAddress(addressId)
        .then(res => {
          if (res !== false) {
            const index = this.addresses.findIndex(ad => ad.id === addressId)
            this.addresses.forEach(ad => {
              ad.selected = false
            })
            this.addresses[index].selected = true
          }
        })
    },
    newAddress() {
      this.$router.push('/address/new')
    },
    editAddress(addressId) {
      this.$router.push('/address/' + addressId)
    },
    async deleteAddress(addressId) {
      this.$repositories.customer.deleteSelectedAddress(addressId)
        .then(res => {
          if (res !== false) {
            $nuxt.refresh()
          }
        })
    }
  },
  async asyncData({ $repositories }) {
    const res = await $repositories.customer.getAddresses()
    if (res !== false) {
      return { addresses: res.data }
    } else
      return { reload: true }
  },
  activated() {
    $nuxt.refresh()
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
</style>
