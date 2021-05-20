<template>
  <v-snackbar class="snackbar" v-model="show" :color="color" :timeout="3000" >
    <v-layout align-center pr-4>
      <v-icon class="pl-3" dark large>{{ icon }}</v-icon>
      <v-layout column>
        <div>
          <strong>{{ title }}</strong>
        </div>
        <div>{{ message }}</div>
      </v-layout>
    </v-layout>
  </v-snackbar>
</template>
<script>
export default {
  name: 'Snackbar',
  data () {
    return {
      show: false,
      message: '',
      color: '',
      title: '',
      icon: ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === ('snackbar/showMessage')) {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.title = state.snackbar.title
        this.icon = state.snackbar.icon
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
  text-align: center;
  z-index: 1100;
}
</style>
