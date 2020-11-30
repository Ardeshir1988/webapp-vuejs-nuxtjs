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
      <v-btn :disabled="isDisable" icon @click="back">
        <v-icon size="24">mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn to="/account">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-btn to="/cart">
        <v-badge
          v-if="cartCount>0"
          bordered
          overlap
          color="pink"
          :content="engDigitToPersianDigit(cartCount)">
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
import PersianUtil from '@/utils/PersianUtil'

export default {
  data() {
    return {
      isDisable: true
    }
  },
  async mounted() {
    await this.$store.dispatch('cart/init_cart')
  },
  computed: {
    ...mapGetters({ cartCount: 'cart/cartProductsCount' })
  },
  methods: {
    engDigitToPersianDigit: function(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    back() {
      this.$router.go(-1)
    }
  },
  watch:{
    '$route' (to, from){
      this.isDisable =
        !(this.$route.path !== '/' &&
        this.$route.path !== '/cart' &&
        this.$route.path !== '/search' &&
        this.$route.path !== '/account')
    }
  }
}
</script>
<style>
.container {
  padding: 0;
}

div, p {
  font-family: 'IranSansMobileMedium', sans-serif;
}
</style>
