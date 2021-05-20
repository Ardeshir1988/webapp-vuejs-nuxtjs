<template>
  <div>
    <v-sheet class="address-item-sheet" rounded outlined>
      <div v-if="existAddress">
        <div class="address-item-details"> {{ address.title }}</div>
        <div class="address-item-details">آدرس: {{ address.details }}</div>
        <div class="address-item-details">تلفن: {{ address.number }}</div>
      </div>
      <div v-else class="address-item-empty">هیج آدرسی ثبت نشده است</div>
    </v-sheet>
    <nuxt-link style="text-decoration: none; color: inherit;" to="/address">
      <v-btn rounded depressed class="btn-edit-address">انتخاب آدرس
        <v-icon right dark>mdi-map-marker</v-icon>
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CheckoutAddress',
  props: { address: Object },
  computed: {
    existAddress() {
      return this.address.details !== undefined
    }
  },
}
</script>

<style scoped>
.address-item-sheet {
  margin: 2vw;
  direction: rtl;
}

.address-item-details {
  font-size: 0.9em;
  direction: rtl;
  margin: 2vw 3vw 2vw 2vw;
  color: #8E8E8E;
  width: 80vw;
}

.address-item-empty {
  font-size: 0.9em;
  text-align: center;
  color: #808080;
  padding: 3vh;
}

.btn-edit-address {
  margin-left: 2vw;
  text-align: center;
  background-color: #E6E6E6;
  border-radius: 5px;
  font-size: 0.85em;
  color: #808080;
  height: 5vh;
  vertical-align: center;

}

</style>
