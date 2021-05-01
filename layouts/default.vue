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
      style="z-index: 1015"
      horizontal
      app
      grow>
      <v-btn min-width="55" icon :disabled="isDisable" @click="back">
        <v-icon style="margin: auto">mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/account">
        <v-icon style="margin: auto">mdi-menu</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/cart">
        <v-badge
          v-if="cartCount>0"
          bordered
          overlap
          color="pink"
          :content="engDigitToPersianDigit(cartCount)">
          <v-icon style="margin: auto">mdi-cart</v-icon>
        </v-badge>
        <v-icon style="margin: auto" v-if="cartCount<=0">mdi-cart</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/search">
        <v-icon style="margin: auto">mdi-magnify</v-icon>
      </v-btn>
      <v-btn min-width="55" icon to="/">
        <v-icon style="margin: auto">mdi-home</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>

</template>

<script>
import { mapGetters } from 'vuex'
import PersianUtil from '@/utils/PersianUtil'
import Snackbar from '@/components/snackbar/Snackbar'
import Pushe from "pushe-webpush";

export default {
  components: { Snackbar },

  async beforeCreate() {

  },
  created() {
    this.isDisable = this.isRootURL()
  },
  data() {
    return {
      isDisable: true
    }
  },
  async mounted() {
    await this.$store.dispatch('cart/init_cart')

    if (this.$storage.getCookie('token') === undefined ) {
      if (this.$storage.getUniversal('token') !== null && this.$storage.getUniversal('token') !== undefined) {
        this.$storage.setCookie('token', this.$storage.getLocalStorage('token'), { maxAge: 60 * 60 * 24 * 100} )
        this.$storage.setCookie('mobile', this.$storage.getLocalStorage('mobile'), { maxAge: 60 * 60 * 24 * 100} )
      }
    }

    Pushe.init("6g0372xq3q71lo3g");
    Pushe.subscribe();
    Pushe.addEventListener(Pushe.EVENTS.NOTIFICATION_RECEIVED, function(data) {
      console.log("listener")
      console.log(data);
    });

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
