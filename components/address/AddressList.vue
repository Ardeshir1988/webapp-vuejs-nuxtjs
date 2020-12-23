<template>
  <div>
    <AddressItem v-for="address in addresses" :address="address" :key="address.id" />
  </div>
</template>

<script>
import AddressItem from '@/components/address/AddressItem'

export default {
  name: 'AddressList',
  components: { AddressItem },
  props: { addresses: Array }
}
</script>

<style scoped>

</style>
