<template>
  <v-sheet class="register" rounded outlined>
    <v-btn @click="login" outlined depressed class="primary btn-register">ورود</v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: 'Register',
  props: ['login']
}
</script>

<style scoped>
.register {
  margin: 1.6vw;
  text-align: center;
}

.btn-register {
  margin: 5vh;
  color: white;
  font-size: 1em;
  width: 33vw;
}
</style>
