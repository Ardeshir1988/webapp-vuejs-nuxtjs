<template>
  <v-sheet @click="clickOp" class="account-option" outlined rounded>
    <v-img class="img-option" :class="op.disable === true ? 'img-disable':''" :src="op.iconName"></v-img>
    <div class="name-option">{{ op.name }}</div>
  </v-sheet>
</template>

<script>
export default {
  name: 'AccountOption',
  props: { op: Object },

  methods: {
    clickOp() {
      this.$emit('chooseOp', this.op.id)
    }
  }
}
</script>

<style scoped>
.img-option {
  width: 24px;
  height: 24px;
  margin: 3.5vh auto auto;
}

.img-disable {
  filter: grayscale(0.9) opacity(0.3);
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
