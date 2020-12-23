<template>
  <div style="height: 55vh">
    <client-only>
      <l-map @click="changeMarkerPosition" :zoom=15 :center="map">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="marker"></l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>

export default {
  name: 'CustomerAddress',
  props: { center: Object, markerLoc: Object },
  data() {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      map: this.center,
      marker: this.markerLoc
    }
  },
  methods: {
    changeMarkerPosition(event) {
      this.marker = event.latlng
      this.$emit('changelocation', this.marker)
    }
  }
}
</script>

<style scoped>

</style>
