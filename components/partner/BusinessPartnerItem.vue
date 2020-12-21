<template>
  <v-sheet @click="gotoCategoryProduct" class="businessPartner" outlined rounded>
    <v-img class="img-businessPartner" height="119" :src="imageUrl">
    </v-img>
  </v-sheet>
</template>

<script>
import { FILES_URL } from '@/constants'

export default {
  name: 'BusinessPartnerItem',
  props: { partner: Object },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.partner.picture
    }
  },
  methods: {
    gotoCategoryProduct() {
      this.$router.push('/partner/' + this.partner.name + '?id=' + this.partner.id+'&businessid='+this.partner.businessPartnerId)
    }
  }
}
</script>

<style scoped>
.img-businessPartner {
  display: flex;
  align-items: baseline;
  text-align: center;
}

.businessPartner {
  text-align: center;
  width: 32vw;
}

.name-businessPartner {
  font-size: 10pt;
  align-items: center;
}
</style>
