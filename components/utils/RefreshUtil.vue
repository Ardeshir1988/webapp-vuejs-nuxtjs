<template>
  <div class="refresh-page">
    <div class="refresh-content">
      <p>خطا در برقراری ارتباط</p>
      <v-btn @click="refresh" class="warning">تلاش دوباره</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefreshUtil',
  layout: 'empty',
  methods: {
    refresh() {
      window.location.reload(true)
    }
  }
}
</script>

<style scoped>
.refresh-page {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: center;
}

.refresh-content {
  margin-top: 40vh;
}
</style>
