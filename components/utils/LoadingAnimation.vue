<template>
  <div class="refresh-page">
    <div class="refresh-content">
<!--      <lottie-animation-->
<!--        ref="anim"-->
<!--        :animationData="require('@/assets/hyperjet-loading.json')"-->
<!--        :loop="true"-->
<!--        :autoPlay="true"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
// import LottieAnimation from 'lottie-web-vue'

export default {
  // components: {
  //   LottieAnimation
  // },
  name: 'LoadingAnimation',
  layout: 'empty',
  methods: {
    refresh() {
      window.location.reload(true)
    }
  },
// mounted() {
//   this.$refs.anim.play()
// },
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
  margin-right: 13vh;
  margin-left: 13vh;
  margin-top: 38vh;
}
</style>
