<template>
  <div class="header-container">
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
  height: 6vh;
}

.header-name-page {
  grid-column: 1;
  grid-row: 2;
  text-align: center;
  font-size: 1em;
}
</style>
