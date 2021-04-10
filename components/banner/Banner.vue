<template>
  <v-img
    :src='bannersUrl[0]'
    style='margin: 3vw'
  >
    <v-card
      elevation='0'
      height='100%'
    >
      <v-carousel cycle
                  show-arrows-on-hover
                  hide-delimiters
                  height='100%'
      >
        <v-carousel-item
          v-for='(item,i) in bannersUrl'
          :key='i'
          :src='item'
        >
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-img>
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
