<template>
  <v-carousel cycle
              height="auto"
              show-arrows-on-hover
              hide-delimiter-background>

    <v-carousel-item
      v-for="(item,i) in bannersUrl"
      :key="i"
      :src="item"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import { FILES_URL } from '~/constants'
export default {
  name: 'Banner',
  props: { banners: Array },
  computed: {
    bannersUrl: function() {
      return this.banners.map(value => FILES_URL + value)
    }
  }
}
</script>
<style scoped>
</style>
