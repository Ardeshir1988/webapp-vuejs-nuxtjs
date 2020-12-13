<template>
  <v-sheet class="account-option" outlined rounded>
    <v-img class="img-option" :src="op.iconName"></v-img>
    <div class="name-option">{{op.name}}</div>
  </v-sheet>
</template>

<script>
export default {
  name: 'AccountOption',
  props: { op: Object }
}
</script>

<style scoped>
.img-option {
  width: 24px;
  height: 24px;
  margin: 3.5vh auto auto;
}

.name-option {
  font-size: 10pt;
  align-items: center;
  margin-top: 2vh;
}

.account-option {
  text-align: center;
  height: 14vh;
  width: 30vw;
  margin: 1.6vw;
}
</style>
