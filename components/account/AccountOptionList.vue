<template>
  <v-sheet style="margin: 1vh" rounded outlined @click="clickOp">
  <v-row no-gutters style="height: 8vh">
    <v-col cols="10" sm="6">
      <div class="name-option">{{ op.name }}</div>
    </v-col>
    <v-col class="list-icon" cols="2" sm="2">
      <v-img class="img-option" :class="op.disable === true ? 'img-disable':''" :src="op.iconName"></v-img>
    </v-col>
  </v-row>
  </v-sheet>
</template>

<script>
import { FILES_URL } from '@/constants'

export default {
  name: 'AccountOptionList',
  props: { op: Object },
  computed: {
    imageUrl: function() {
      return require(this.op.iconName)
    }
  },
  methods:{
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
  margin: auto;
}

.img-disable {
  filter: grayscale(0.9) opacity(0.3);
}

.name-option {
  font-size: 10pt;
  text-align: right;
  margin: 2.5vh;
}

.account-option {
  text-align: center;
  height: 14vh;
  width: 30vw;
  margin: 1.6vw;
}
.list-icon{
  margin: auto;
}
</style>
