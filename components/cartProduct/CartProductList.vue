<template>
  <div>
    <div v-for="cartProduct in cartProducts">
      <CartProductItem :cart-product="cartProduct" :key="cartProduct.id" />
    </div>
  </div>
</template>

<script>
import CartProductItem from '@/components/cartProduct/CartProductItem'

export default {
  name: 'CartProductList',
  components: { CartProductItem },
  props: { cartProducts: Array }
}
</script>

<style scoped>

</style>
