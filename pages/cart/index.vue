<template>
  <CartProductList :cart-products="this.$store.getters['cart/getCartProducts']"/>
</template>

<script>
import CartProductList from '@/components/cartProduct/CartProductList'
export default {
  name: 'index.vue',
  components: { CartProductList },
}
</script>

<style scoped>

</style>
