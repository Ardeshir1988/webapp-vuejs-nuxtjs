<template>
  <div class="vertical-product-list">
    <div v-for="product in products" class="vertical-product_item">
      <VerticalListProductItem :product="product" :key="product.id" />
    </div>
  </div>
</template>

<script>
import VerticalListProductItem from '@/components/products/vertical/VerticalListProductItem'

export default {
  name: 'VerticalProductList',
  components: { VerticalListProductItem },
  props: { products: Array }
}
</script>

<style scoped>
.vertical-product-list {
  display: flex;
  flex-wrap: wrap;
}

.vertical-product_item {
  margin-right: auto;
  margin-left: auto;
}
</style>
