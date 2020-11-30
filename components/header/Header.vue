<template>
  <div class="header-container">
    <div class="header-btn-back" @click="back">
      <v-btn
        class="btn-back"
        icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div class="header-name-page">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: { title: String },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.header-container {
  display: grid;
  grid-template-rows: 0 2fr;
  grid-template-columns: 1fr;
  margin: 0.5vh;
  height: 30px;
}

.header-name-page {
  margin: 0.5vh;
  grid-column: 1;
  grid-row: 2;
  text-align: center;
  font-size: 1em;
}

.header-btn-back {
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
  max-lines: 1;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  vertical-align: center;
}

.btn-back {
  background-color: white;
  height: 24px;
  width: 24px;
  margin: 0.5vh 0.5vh 1vh;
}
</style>
