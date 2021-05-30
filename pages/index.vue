<template>

  <div>
    <loading-animation v-if="!ready"/>
    <RefreshUtil v-if="reload" />
    <div v-if="!reload && ready">
      <Banner v-if="instructions.topBannerPermission" :banners="homepage.topBanners"/>
      <SectionSeparator class="section-separator"
                        section-name="محصولات جدید"
                        :section-icon="require('~/assets/icon/storefront-24px.svg')"
                        section-link-url="/products/new" />
      <HorizontalProductList :products="homepage.newProducts" />
      <SectionSeparator class="section-separator"
                        section-name="دسته بندی محصولات"
                        :section-icon="require('~/assets/icon/category-24px.svg')"
                        section-link-url="/category" />
      <CategoryList :categories="homepage.categories" />
      <Banner v-if="instructions.bottomBannerPermission" class="section-separator" :banners="homepage.bottomBanners" />

      <SectionSeparator v-if="instructions.businessPartnerPermission" class="section-separator"
                        section-name="شرکای تجاری"
                        :section-icon="require('~/assets/icon/partner-24px.svg')"
                        section-link-url="" />

      <BusinessPartnerList v-if="instructions.businessPartnerPermission" :business-partners="homepage.businessPartners" />
      <SectionSeparator class="section-separator"
                        section-name="حراج"
                        :section-icon="require('~/assets/icon/storefront-24px.svg')"
                        section-link-url="/products/off" />
      <HorizontalProductList :products="homepage.offProducts" />
      <div class="null-div"></div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner/Banner'
import SectionSeparator from '@/components/separator/SectionSeparator'
import HorizontalProductItem from '@/components/products/horizontal/HorizontalListProductItem'
import HorizontalProductList from '@/components/products/horizontal/HorizontalProductList'
import CategoryList from '@/components/category/CategoryList'
import BusinessPartnerList from '@/components/partner/BusinessPartnerList'
import RefreshUtil from '@/components/utils/RefreshUtil'
import LoadingAnimation from '@/components/utils/LoadingAnimation'

export default {
  head:{
    title:'هایپرجت ، هوشمندانه ترین راه خرید نیاز های روزانه شما'
  },
  components: {
    RefreshUtil,
    BusinessPartnerList,
    CategoryList,
    HorizontalProductList,
    HorizontalProductItem,
    SectionSeparator,
    Banner,
    LoadingAnimation
  },
  data() {
    return {
      homepage: {},
      instructions: {},
      reload: false,
      ready: false
    }
  },
  async beforeCreate() {
    console.log('beforeCreate index')
    let responseData =  await this.$repositories.product.homepage()
    let resInstruction = await this.$repositories.product.getInstructions()
    if (responseData === false || resInstruction === false){
       this.reload = true
      this.ready = true
    }
    else {
      this.homepage = responseData.data
      this.instructions = resInstruction.data
      await this.$store.dispatch('instruction/load_home_instruction', responseData.data)
      await this.$store.dispatch('instruction/load_sys_instruction', resInstruction.data)
      this.ready = true
    }
    // window.location.reload(true)
  },

  async asyncData({ $repositories, app, store}) {


  }
}
</script>
<style scoped>
.section-separator {
  margin-top: 1vh;
  margin-bottom: 1vh;
}

.null-div {
  height: 1vh;
}
</style>
