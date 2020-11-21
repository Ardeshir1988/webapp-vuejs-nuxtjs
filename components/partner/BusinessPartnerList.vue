<template>
  <div class="partners">
    <div v-for="businessPartner in businessPartners" class="partners_item">
      <BusinessPartnerItem :partner="businessPartner" :key="businessPartner.id" />
    </div>
  </div>
</template>

<script>
import BusinessPartnerItem from '@/components/partner/BusinessPartnerItem'
export default {
  name: 'BusinessPartnerList',
  components: { BusinessPartnerItem },
  props: { businessPartners: Array }
}
</script>

<style scoped>
.partners {
  display: flex;
  flex-wrap: wrap;
}

.partners_item {
  margin-bottom: 2vh;
  margin-right: auto;
  margin-left: auto;
}
</style>
