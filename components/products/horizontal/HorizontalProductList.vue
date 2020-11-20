<template>
  <div class="horizontal-list">
    <div v-for="product in newProducts">
      <HorizontalProductItem :product="product" :key="product.id" />
    </div>
  </div>
</template>
<script>
import HorizontalProductItem from '@/components/products/horizontal/HorizontalListProductItem'

export default {
  name: 'HorizontalProductList',
  components: { HorizontalProductItem },
  props: { newProducts: Array }
}
</script>

<style scoped>

.horizontal-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.horizontal-list {
  flex-direction: row-reverse;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: flex;
  overflow-x: auto;
}
</style>
