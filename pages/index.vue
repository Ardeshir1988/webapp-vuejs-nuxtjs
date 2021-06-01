<template>

  <div>
    <!--    <RefreshUtil v-if="reload" />-->
    <div>
      <Banner v-if='instructions.topBannerPermission' :banners='topBanners' />
      <SectionSeparator class='section-separator'
                        section-name='حراج'
                        :section-icon="require('~/assets/icon/storefront-24px.svg')"
                        section-link-url='/products/off' />
      <HorizontalProductList :products='homepage.offProducts' />

      <SectionSeparator class='section-separator'
                        section-name='دسته بندی محصولات'
                        :section-icon="require('~/assets/icon/category-24px.svg')"
                        section-link-url='/category' />
      <CategoryList :categories='homepage.categories' />

      <Banner v-if='instructions.bottomBannerPermission' class='section-separator' :banners='bottomBanners' />


      <SectionSeparator class='section-separator'
                        section-name='محصولات جدید'
                        :section-icon="require('~/assets/icon/storefront-24px.svg')"
                        section-link-url='/products/new' />
      <HorizontalProductList :products='homepage.newProducts' />


      <!--      <SectionSeparator v-if="instructions.businessPartnerPermission" class="section-separator"-->
      <!--                        section-name="شرکای تجاری"-->
      <!--                        :section-icon="require('~/assets/icon/partner-24px.svg')"-->
      <!--                        section-link-url="" />-->
      <!--      <BusinessPartnerList v-if="instructions.businessPartnerPermission" :business-partners="homepage.businessPartners" />-->

      <div class='null-div'></div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner/Banner'
import SectionSeparator from '@/components/separator/SectionSeparator'
import HorizontalProductList from '@/components/products/horizontal/HorizontalProductList'
import CategoryList from '@/components/category/CategoryList'
// import BusinessPartnerList from '@/components/partner/BusinessPartnerList'
// import RefreshUtil from '@/components/utils/RefreshUtil'
// import LoadingAnimation from '@/components/utils/LoadingAnimation'

import { mapGetters } from 'vuex'

export default {
  head: {
    title: 'هایپرجت ، هوشمندانه ترین راه خرید نیاز های روزانه شما'
  },
  components: {
    //   RefreshUtil,
    //   BusinessPartnerList,
    CategoryList,
    HorizontalProductList,
    SectionSeparator,
    Banner
    //   LoadingAnimation
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters({
      instructions: 'instruction/getSysInstruction'
    }),
    ...mapGetters({
      homepage: 'instruction/getHomeInstruction'
    }),
    ...mapGetters({
      topBanners: 'instruction/getTopBanners'
    }),
    ...mapGetters({
      bottomBanners: 'instruction/getBottomBanners'
    })
// ,
//     ...mapGetters({
//       ready: 'instruction/getHomeStateReady'
//     })
// ,
//     ...mapGetters({
//       reload: 'instruction/getHomeStateReload'
//     })

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
