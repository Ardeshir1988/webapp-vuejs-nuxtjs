<template>
  <div class='v-main__wrap' style='padding: 0px;'>
  <div dir='rtl'  >
    <Header class="fix-header" title="آدرس "  />
    <v-textarea
      style='padding-top:5vw;'
      reverse
      label=' آدرس  - لطفا به صورت کامل وارد شود.'
      v-model='addressDetails'
      class='txt-field'
      rows='2'
      readonly
      filled
    ></v-textarea>
    <v-text-field
      label='عنوان آدرس (اختیاری)'
      reverse
      v-model='addressTitle'
      class='txt-field'
      readonly
      filled
    ></v-text-field>
    <v-text-field
      label='تلفن (اختیاری)'
      reverse
      v-model='addressNumber'
      class='txt-field'
      readonly
      filled
    ></v-text-field>
    <mapbox
      id='map'
      style='height: 36vh'
      :access-token='accessToken'
      :map-options='mapOptions'
      @map-init='mapInit'
    />
    <v-icon id='coordinates' class='coordinates'>{{mdiMapMarker}}</v-icon>
    <div class='mt-auto '></div>


  </div>
    <div class='btn-container mt-auto'>
      <v-btn @click='close' class='btn-primary' depressed height='40' color='accent'>
        بستن
      </v-btn>
    </div>
  </div>
</template>
<script>

import Mapbox from 'mapbox-gl-vue'
import { mdiMapMarker } from '@mdi/js'


export default {

  components: { Mapbox },
  // middleware: 'auth',
  name: 'index',

  head: {
    title: 'آدرس',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css'
      }
    ]

  },
  data() {
    return {
      mdiMapMarker: mdiMapMarker,
      addressId: null,
      addressDetails: '',
      addressNumber: '',
      addressTitle: '',
      accessToken: 'pk.eyJ1IjoibWF4YXNhZGkiLCJhIjoiY2tsOTlmaHp6MzhlNzJvcW9kNDZteXU0MiJ9.g3otWgJ_s9jL8HZhiAD48Q',
      mapOptions: {
        style: 'mapbox://styles/maxasadi/ckl99m0bc0bl517jxsh5d6lcq',
        center: [51.4643361, 35.8011681],
        zoom: 16,
        maxBounds: [
          [51.35994940453976, 35.654004054394755], // Southwest coordinates
          [51.57013030718764, 35.877585830317105] // Northeast coordinates
        ]
      }
    }
  },
  methods: {
    mapInit: function(map) {
      this.map = map
      if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
        mapboxgl.setRTLTextPlugin(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
          null,
          true // Lazy load the plugin
        )}
    },
    close() {
      this.sheet = false
    },

  },

  async fetch() {
    const res = await this.$repositories.customer.getAddressById(this.$route.params.id)
    if (res !== false) {
      const lngLat = [parseFloat(res.data.latLong.split(',')[1]),
        parseFloat(res.data.latLong.split(',')[0])]

      new mapboxgl.Marker().setLngLat(lngLat).addTo(this.map)
      this.map.setCenter(lngLat)
      this.addressId = res.data.id
      this.addressDetails = res.data.details
      this.addressNumber = res.data.number
      this.addressTitle = res.data.title
    }
  }


}
</script>

<style scoped>

.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #F2F3F5;
}

.btn-primary {
  margin: 2vh auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}

.txt-field {
  margin-right: 5vw;
  margin-left: 5vw;
}

.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  border-radius: 3px;
  display: none;
}
</style>
