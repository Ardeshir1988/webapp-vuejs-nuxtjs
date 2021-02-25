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
  flex-direction: row-reverse;
}

.partners_item {
  margin-bottom: 0.5vw;
  margin-right: 0.5vw;
  margin-left: 0.5vw;
}
</style>
