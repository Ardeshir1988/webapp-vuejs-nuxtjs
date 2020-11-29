<template>
  <div>
    <Banner :banners="homepage.banners" />
    <SectionSeparator class="section-separator"
                      section-name="محصولات جدید"
                      section-icon="storefront-24px.svg"
                      section-link-url="" />
    <HorizontalProductList :products="homepage.newProducts" />
    <SectionSeparator class="section-separator"
                      section-name="دسته بندی محصولات"
                      section-icon="category-24px.svg"
                      section-link-url="" />
    <CategoryList :categories="homepage.categories" />
    <Banner class="section-separator" :banners="homepage.banners" />

    <SectionSeparator class="section-separator"
                      section-name="شرکای تجاری"
                      section-icon="partner-24px.svg"
                      section-link-url="" />

    <BusinessPartnerList :business-partners="homepage.businessPartners" />
    <SectionSeparator class="section-separator"
                      section-name="حراج"
                      section-icon="storefront-24px.svg"
                      section-link-url="" />
    <HorizontalProductList :products="homepage.offProducts" />
    <div class="null-div"></div>
  </div>

</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import Banner from '@/components/banner/Banner'
import SectionSeparator from '@/components/separator/SectionSeparator'
import { mapState } from 'vuex'
import HorizontalProductItem from '@/components/products/horizontal/HorizontalListProductItem'
import HorizontalProductList from '@/components/products/horizontal/HorizontalProductList'
import CategoryList from '@/components/category/CategoryList'
import BusinessPartnerList from '@/components/partner/BusinessPartnerList'

export default {
  components: {
    BusinessPartnerList,
    CategoryList,
    HorizontalProductList,
    HorizontalProductItem,
    SectionSeparator,
    Banner,
    Logo,
    VuetifyLogo
  },
  async fetch({ store }) {
    await store.dispatch('product/get_home_page')
  },
  computed: {
    ...mapState({
      homepage: (state) => {
        return state.product.homePage
      }
    })
  }
}
</script>
<style scoped>
.section-separator {
  margin-top: 1vh;
  margin-bottom: 1vh;
}
.null-div{
  height: 1vh;
}
</style>
