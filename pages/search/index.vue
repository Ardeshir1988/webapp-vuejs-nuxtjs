<template>
  <div>
    <div class="search-header">
      <v-row no-gutters>
        <v-col>
          <v-text-field
            class="text-field"
            placeholder="جستجو کنید"
            hide-details
            single-line
            filled
            dense
            rounded
            v-model="keyword"
            @keydown.enter="getProductsByKeyword()"
          >
          </v-text-field>
        </v-col>
        <v-col class="search-btn">
          <v-btn icon @click="getProductsByKeyword()">
            <v-icon color="primary">{{mdiMagnify}}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
        <VerticalProductList class="product-list" :products="products" />
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import VerticalProductList from '@/components/products/vertical/VerticalProductList'

export default {
  name: 'index.vue',
  head:{
    title:'جستجو'
  },
  components: { VerticalProductList },
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
  methods: {
    handleScroll() {
      if (window.scrollY - this.scrollPosition > 1500) {
        this.scrollPosition = window.scrollY
        this.loadMoreProducts()
      }
    },
    loadMoreProducts() {
      if (this.keyword!=="" && this.keyword.length !== 0 && this.keyword){
      this.$repositories.product.searchProducts(this.keyword, 30, this.page)
        .then((response) => {
          if (response.data.length > 1) {
            response.data.forEach((item) => this.products.push(item))
            this.page++
          } else {

          }
        }).catch((err) => {

      })
      }
    },
    getProductsByKeyword() {
      if (this.keyword!=="" && this.keyword.length !== 0 && this.keyword){
      this.products = []
      this.page = 0
      this.scrollPosition= 0
      this.$repositories.product.searchProducts(this.keyword, 30, this.page)
        .then((response) => {
          if (response.data.length > 1) {
            response.data.forEach((item) => this.products.push(item))
            this.page++
          } else {

          }
        }).catch((err) => {

      })
      }
    }
  },
  data() {
    return {
      mdiMagnify: mdiMagnify,
      products: [],
      page: 0,
      scrollPosition: 0,
      keyword: ''
    }
  }
}
</script>

<style scoped>
.search-header {
  position: fixed;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  direction: rtl;
}

.text-field {
  width: 80vw;
  max-width: 89vw;
  padding: 0;
  margin: 1.5vh;
}

.search-btn {
  margin: auto;
  text-align: center;
}
.product-list{
  margin-top: 9.5vh;
}
</style>
