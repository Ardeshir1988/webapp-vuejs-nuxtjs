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
    // const workbox = await window.$workbox;
    // if (workbox) {
    //   this.$notifier.showMessage({ content: 'اپلیکشن شما به روز رسانی شد.', color: 'success', title: 'بروز رسانی' , icon: 'mdi-check-circle-outline' })
    //
    //   workbox.addEventListener('installed', (event) => {
    //     // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
    //     if (event.isUpdate) {
    //       this.$notifier.showMessage({ content: 'اپلیکشن شما به روز رسانی شد.', color: 'success', title: 'بروز رسانی' , icon: 'mdi-check-circle-outline' })
    //       // whatever logic you want to use to notify the user that they need to refresh the page.
    //       caches.keys().then(function(names) {
    //         for (let name of names) caches.delete(name)
    //       })
    //       window.location.reload(true)
    //     }
    //   })
    // }
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
