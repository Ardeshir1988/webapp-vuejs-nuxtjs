<template>
  <div >
    <client-only>
      <l-map style="height: 93vh" @click="changeMarkerPosition" :zoom=13 :center="map">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="marker"></l-marker>
        <l-geo-json :geojson="geometry" :options-style="myStyle" />

      </l-map>
    </client-only>
        <div class="btn-container">
          <v-btn @click="selectLocation" class="btn-primary" depressed color="accent">
            ثبت موقعیت
          </v-btn>
        </div>
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
      marker: this.markerLoc,
      myStyle: {
        'color': '#8629FD',
        'weight': 1,
        'opacity': 0.55
      },
      reversedPolygon:[[
        [35.788622, 51.4847],
        [35.791146, 51.487034],
        [35.795353, 51.489454],
        [35.797526, 51.490577],
        [35.798648, 51.492652],
        [35.80026, 51.494813],
        [35.801241, 51.495331],
        [35.808602, 51.498097],
        [35.813509, 51.497319],
        [35.818485, 51.491182],
        [35.818906, 51.487293],
        [35.817434, 51.485823],
        [35.819116, 51.482539],
        [35.820728, 51.477266],
        [35.820728, 51.471821],
        [35.819887, 51.468623],
        [35.815051, 51.467413],
        [35.81463, 51.466462],
        [35.81498, 51.463696],
        [35.819396, 51.463523],
        [35.821008, 51.460671],
        [35.819676, 51.456781],
        [35.817854, 51.452892],
        [35.817293, 51.447273],
        [35.818765, 51.440791],
        [35.819466, 51.436296],
        [35.81498, 51.434913],
        [35.811686, 51.433012],
        [35.806639, 51.433876],
        [35.80061, 51.433703],
        [35.794441, 51.434395],
        [35.789113, 51.435691],
        [35.784345, 51.43595],
        [35.783714, 51.43595],
        [35.786238, 51.445545],
        [35.789744, 51.454015],
        [35.793179, 51.459893],
        [35.791917, 51.467067],
        [35.790234, 51.474068],
        [35.790445, 51.479427],
        [35.788622, 51.4847]
      ]],
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [51.4847, 35.788622],
          [51.487034, 35.791146],
          [51.489454, 35.795353],
          [51.490577, 35.797526],
          [51.492652, 35.798648],
          [51.494813, 35.80026],
          [51.495331, 35.801241],
          [51.498097, 35.808602],
          [51.497319, 35.813509],
          [51.491182, 35.818485],
          [51.487293, 35.818906],
          [51.485823, 35.817434],
          [51.482539, 35.819116],
          [51.477266, 35.820728],
          [51.471821, 35.820728],
          [51.468623, 35.819887],
          [51.467413, 35.815051],
          [51.466462, 35.81463],
          [51.463696, 35.81498],
          [51.463523, 35.819396],
          [51.460671, 35.821008],
          [51.456781, 35.819676],
          [51.452892, 35.817854],
          [51.447273, 35.817293],
          [51.440791, 35.818765],
          [51.436296, 35.819466],
          [51.434913, 35.81498],
          [51.433012, 35.811686],
          [51.433876, 35.806639],
          [51.433703, 35.80061],
          [51.434395, 35.794441],
          [51.435691, 35.789113],
          [51.43595, 35.784345],
          [51.43595, 35.783714],
          [51.445545, 35.786238],
          [51.454015, 35.789744],
          [51.459893, 35.793179],
          [51.467067, 35.791917],
          [51.474068, 35.790234],
          [51.479427, 35.790445],
          [51.4847, 35.788622]
        ]]
      }
    }
  },
  methods: {
    changeMarkerPosition(event) {
      if (this.isMarkerInsidePolygon(event, this.reversedPolygon[0])) {
        this.marker = event.latlng
        this.$emit('changelocation', this.marker)
      } else {
        this.$notifier.showMessage({ content: 'این نقطه در محدوده سرویس دهی نیست', color: 'black' })
      }
    },
    selectLocation(){
      this.$emit('selectlocation')
    },
    isMarkerInsidePolygon(marker, poly) {
      let inside = false
      const x = marker.latlng.lat, y = marker.latlng.lng
      for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1]
        const xj = poly[j][0], yj = poly[j][1]
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
      }
      return inside
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
