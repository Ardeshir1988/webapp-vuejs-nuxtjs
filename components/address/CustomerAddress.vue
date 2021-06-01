<template>
  <div>
    <mapbox
      id='map'
      style='height: 93vh'
      :access-token='accessToken'
      :map-options='mapOptions'
      :geolocate-control="{
        show: true,
        position: 'bottom-right',
      }"
      @map-load='mapLoad'
    />
    <v-icon id='coordinates' class='coordinates'>{{ mdiMapMarker }}</v-icon>
    <div class='btn-container'>
      <v-btn @click='selectLocation' class='btn-primary' depressed color='accent'>
        ثبت مکان منتخب
      </v-btn>
    </div>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl-vue'
import { mdiMapMarker } from '@mdi/js'
export default {
  components: { Mapbox },
  name: 'CustomerAddress',
  props: { },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css'
      }
    ],
    script:[
      {src:'https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'}
    ]
  },
  data() {
    return {
      mdiMapMarker: mdiMapMarker,
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
    mapLoad: function(map) {
      this.map = map
      if (mapboxgl.getRTLTextPluginStatus() !== 'loaded') {
      mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
        null,
        true // Lazy load the plugin
      )}
      const marker = new mapboxgl.Marker()
        .setLngLat([51.4643361, 35.8011681]).addTo(map)
      map.on('move', function(e) {
        marker.setLngLat(map.getCenter())
      })
    },
    selectLocation() {
      let pixel = this.map.project(this.map.getCenter())
      let features = this.map.queryRenderedFeatures(pixel, {
        layers: ['servicezone']
      })

      if (features.length === 0) {
        this.$notifier.showMessage({
          content: 'مکان انتخاب شده خارج از محدوده سرویس دهی هایپر جت می باشد.',
          color: 'primary',
          title: 'متاسفانه',
          icon: 'alert-outline'
        })
      } else {
        this.$emit('selectLocation', this.map.getCenter())
      }
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
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

.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 1007;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  margin: 2vh auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}


</style>
