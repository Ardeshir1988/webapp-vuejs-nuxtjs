<template>
  <div>
    <Header class="fix-header" title="محصولات جدید" />
    <VerticalProductList class="product-list" :products="products" />
  </div>
</template>

<script>
import Header from '~/components/header/Header'
import VerticalProductList from '~/components/products/vertical/VerticalProductList'

export default {
  name: 'index',
  components: { VerticalProductList, Header },
  head:{
    title:'محصولات جدید'
  },
  data() {
    return {
      products: [],
      page: 0,
      scrollPosition: 0
    }
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
  methods: {
    handleScroll() {
      if (window.scrollY - this.scrollPosition > 1500) {
        this.scrollPosition = window.scrollY
        this.getDataPage()
      }
    },
    getDataPage() {
      this.page++
      this.$repositories.product.getNewProducts(30, this.page)
        .then((response) => {
          if (response.data.length > 1) {
            response.data.forEach((item) => this.products.push(item))

          } else {

          }
        }).catch((err) => {
        console.log(err)
      })
    }
  },
  async fetch() {
    const productList = await this.$repositories.product.getNewProducts(30, 0)
    if (productList.status === 200 && productList.data) {
      this.products = productList.data
    } else {
      // Handle error here
    }
  }
}
</script>

<style scoped>
.fix-header {
  position: fixed;
  position: -webkit-sticky;
  top: 0;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  elevation: higher;
}

.product-list {
  margin-top: 6.5vh;
}
</style>
