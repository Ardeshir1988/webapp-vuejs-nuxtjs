<template>
  <div>
    <div class="products-container">
      <VerticalProductList :products="products" />
    </div>
    <div class="types-container">
      <HorizontalTypeList :type-list="types" />
    </div>
  </div>
</template>

<script>
import VerticalProductList from '@/components/products/vertical/VerticalProductList'
import HorizontalTypeList from '@/components/type/HorizontalTypeList'

export default {
  name: 'index.vue',
  components: { HorizontalTypeList, VerticalProductList },
  data() {
    return {
      products: [],
      types: [],
      selectedType: { id: 'ALL', name: 'همه' }
    }
  },
  async fetch() {
    const productList = await this.$repositories.product.getProductsByCategoryIdAndTypeId(this.$route.query.id, this.selectedType.id)
    const typeList = await this.$repositories.product.getTypesByCategoryId(this.$route.query.id)
    if (productList.status === 200 && productList.data) {
      this.products = productList.data
    } else {
      // Handle error here
    }
    if (typeList.status === 200 && typeList.data) {
      typeList.data.unshift(this.selectedType)
      this.types = typeList.data
    } else {
      // Handle error here
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
  justify-content: center;
  align-items: center;
  background-color: white;
}

.products-container {
  margin-bottom: 6vh;
}
</style>
