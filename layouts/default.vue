<template>
  <v-app>
    <v-main>
      <v-container class="container">
        <nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      color="primary"
      app
      grow>
      <v-btn to="/account">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-btn to="/cart">
        <v-badge
          bordered
          overlap
          color="pink"
          content="6">

        <v-icon>mdi-cart</v-icon>

        </v-badge>
      </v-btn>

      <v-btn to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {


}
</script>
<style>
.container{
  padding: 0;
}
</style>
