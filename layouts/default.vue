<template>
  <v-app>
    <v-main>
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      color="primary"
      app
      grow>
      <v-btn to="/account">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-btn to="/cart">
        <v-badge
          v-if="cartCount>0"
          bordered
          overlap
          color="pink"
          :content="cartCount">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
        <v-icon v-if="cartCount<=0">mdi-cart</v-icon>
      </v-btn>

      <v-btn to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    await this.$store.dispatch('cart/init_cart')
  },
  computed: {
    ...mapGetters({ cartCount: 'cart/cartProductsCount' }),
  }
}
</script>
<style>
.container {
  padding: 0;
}
</style>
