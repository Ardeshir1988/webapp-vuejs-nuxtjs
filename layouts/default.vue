<template>
  <v-app>
    <v-main>
      <v-container class="container">
        <nuxt keep-alive :keep-alive-props="{ exclude: ['modal'],max: '3' }" />
      </v-container>
    </v-main>
    <Snackbar> </Snackbar>
    <v-bottom-navigation
      color="primary"
      style="z-index: 10"
      horizontal
      app
      grow>
      <v-btn min-width="55" icon :disabled="isDisable" @click="back">
        <v-icon style="margin: auto">{{ mdiArrowLeft }}</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/account">
        <v-icon style="margin: auto">{{ mdiMenu }}</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/cart">
        <v-badge
          v-if="cartCount>0"
          bordered
          overlap
          color="pink"
          :content="engDigitToPersianDigit(cartCount)">
          <v-icon style="margin: auto">{{ mdiCart }}</v-icon>
        </v-badge>
        <v-icon style="margin: auto" v-if="cartCount<=0">{{ mdiCart }}</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/search">
        <v-icon style="margin: auto">{{ mdiMagnify }}</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/">
        <v-icon style="margin: auto">{{mdiHome}}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>

</template>

<script>
import { mapGetters } from 'vuex'
import PersianUtil from '@/utils/PersianUtil'
import Snackbar from '@/components/snackbar/Snackbar'
import { mdiHome, mdiMagnify, mdiCart  ,mdiMenu, mdiArrowLeft } from '@mdi/js'

export default {
  components: { Snackbar },
  async beforeCreate() {

  },
   created() {
    this.isDisable = this.isRootURL()

  },
  data() {
    return {
      mdiHome: mdiHome,
      mdiMagnify: mdiMagnify,
      mdiCart: mdiCart,
      mdiMenu: mdiMenu,
      mdiArrowLeft: mdiArrowLeft,
      isDisable: true
    }
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
    },
    isRootURL() {
      return !(this.$route.path !== '/' &&
        this.$route.path !== '/cart' &&
        this.$route.path !== '/search' &&
        this.$route.path !== '/account')
    }
  },
  watch: {
    '$route'(to, from) {
      this.isDisable = this.isRootURL()
    }
  },
  async fetch(ctx) {
    await this.$store.dispatch('cart/init_cart')

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1)
    })
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
