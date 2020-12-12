<template>
  <v-snackbar class="snackbar" v-model="show" :color="color">
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === ('snackbar/showMessage')) {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>
.snackbar{
  width: 100vw;
  direction: rtl;
}
</style>
