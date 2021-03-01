<template>
  <div>
    <v-img contain :src="banner">
      <div class="partner-info">
        <div class="info-bar">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img class="business-avatar" contain :src="picture" />
            </v-col>
            <v-col>
              <div class="partner-working-hours">
                ساعت کاری
              </div>
              <div class="partner-working-hours">
                {{info.inStockPeriod}}
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-img>
    <div class="products-container">
      <VerticalProductList :products="products" />
    </div>
    <div class="types-container">
      <div class="horizontal-type-list">
        <div v-for="type in types">
          <v-btn outlined depressed :class="changeActivation(type.id)" :value="type.id"
                 @click="changeSelectedType(type.id)">{{ type.name }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalProductList from '@/components/products/vertical/VerticalProductList'
import HorizontalTypeList from '@/components/type/HorizontalTypeList'
import { FILES_URL } from '@/constants'

export default {
  name: 'index.vue',
  components: { HorizontalTypeList, VerticalProductList },
  head:{
    title:this.info.name
  },
  created() {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  data() {
    return {
      products: [],
      types: [],
      selectedType: { id: 'ALL' },
      page: 0,
      scrollPosition: 0,
      info: {}
    }
  },
  computed: {
    banner: function() {
      return FILES_URL + this.info.banner
    },
    picture: function() {
      return FILES_URL + this.info.picture
    }
  },
  watch: {
    selectedType: '$fetch'
  },
  async fetch() {
    const productList = await this.$repositories.product.getProductsByCategoryIdAndTypeId(this.$route.query.id, this.selectedType.id, this.page)
    const typeList = await this.$repositories.product.getTypesByCategoryId(this.$route.query.id)
    const partnerInfo = await this.$repositories.product.getBusinessPartnerInfo(this.$route.query.businessid)
    if (productList !== false) {
      this.products = productList.data
    } else {

    }
    if (typeList !== false) {
      typeList.data.unshift({ id: 'ALL', name: 'همه' })
      this.types = typeList.data
    } else {

    }
    if (partnerInfo !== false) {
      this.info = partnerInfo.data
    } else {

    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY - this.scrollPosition > 1500) {
        this.scrollPosition = window.scrollY
        this.getDataPage()
      }
    },
    getDataPage() {
      this.page++
      this.$repositories.product.getProductsByCategoryIdAndTypeId(this.$route.query.id, this.selectedType.id, this.page)
        .then((response) => {
          if (response.data.length > 1) {
            response.data.forEach((item) => this.products.push(item))

          } else {

          }
        }).catch((err) => {
        console.log(err)
      })
    },
    changeActivation(typeId) {
      if (typeId === this.selectedType.id)
        return 'btn-active'
      else
        return 'btn-type'
    },
    changeSelectedType(typeId) {
      this.page = 0
      this.scrollPosition = 0
      scrollTo(0, 0)
      if (process.client) {
        window.addEventListener('scroll', this.handleScroll)
      }
      this.selectedType = { id: typeId }
    }
  }
}
</script>

<style scoped>
.types-container {
  position: fixed;
  position: -ms-device-fixed;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: flex-end;
  background-color: white;
  padding-top: 3px;
}

.products-container {
  margin-bottom: 6vh;
}

.horizontal-type-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.horizontal-type-list {
  flex-direction: row-reverse;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: flex;
  overflow-x: auto;
}

.btn-type {
  margin: 0.25vh 0.5vh 0.25vh 0.5vh;
  border-color: gainsboro;

}

.btn-active {
  margin: 0.25vh 0.5vh 0.25vh 0.5vh;
  border-color: #8629FD;
  color: #8629FD;
}

.business-avatar {
  width: 25vw;
  height: 25vw;
  margin-right: 5vw;
}

.info-bar {
  backdrop-filter: brightness(0.50) ;
  width: 100vw;
  vertical-align: center;
  height: 20vw;
}

.business-avatar-container {
  width: 25vw;
  height: 25vw;
  margin-right: 5vw;
}

.partner-info {
  direction: rtl;
  margin-top: 10vw;
  width: 100vw;
  height: 25vw;
}
.partner-working-hours{
  color: white;
  margin-top: 2vw;
  font-size: 0.9em;
}
</style>
