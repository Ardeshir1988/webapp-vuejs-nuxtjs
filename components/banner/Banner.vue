<template>
  <v-img
    :src='imageUrl + this.banners[0]'
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
          v-for='(item,i) in this.banners'
          :key='i'
          :src='imageUrl + item'
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
  props: { banners: {} },
  computed: {
    imageUrl: function() {
      return FILES_URL
    }
  }
  // computed: {
  //   bannersUrl: function() {
  //     if(this.props.banners !== undefined )
  //     return this.props.banners.map(value => FILES_URL + value)
  //   }
  // }
}
</script>
<style scoped>
</style>
