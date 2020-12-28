<template>
  <div>
    <v-row style="margin: 1vw" no-gutters>
      <v-col cols="11">
        <v-sheet class="sheet-order-transaction" rounded outlined>
          <v-btn depressed icon class="transaction-icon">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
          <div class="content">
            <v-row no-gutters style="margin-top: 1vh">
              <v-col class="left-col" cols="6">سفارش c12546</v-col>
              <v-col class="right-col" cols="5">بازگشت کالا</v-col>
            </v-row>
            <v-row no-gutters style="margin-top: 2vh;margin-bottom: 1vh;color: #808080">
              <v-col class="left-col" cols="6">180000 تومان</v-col>
              <v-col class="right-col" cols="5">1399/02/22 22:15</v-col>
            </v-row>
          </div>
          <div class="item-indicator"></div>
        </v-sheet>
      </v-col>

      <v-col cols="1" class="transaction-icon">
        <v-icon color="warning">mdi-compare-horizontal</v-icon>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'ReturnProductTransaction',
  props: { transaction: Object },
  methods: {
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    }
  }
}
</script>

<style scoped>
.sheet-order-transaction {
  margin: 2vw;
  font-size: 0.9em;
  display: flex;
  flex-flow: row;
}

.transaction-icon {
  margin: auto;
  text-align: center;
  min-height: 100%;
}

.content {
  display: inline;
  width: 99vw;
}

.item-indicator {
  background-color: #FF6672;
  width: 1.25vw;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}

.left-col {
  text-align: left;
  direction: rtl;
  margin: auto;
  padding-left: 1vw;
  font-size: 1em;
}

.right-col {
  text-align: right;
  direction: rtl;
  margin: auto;
  padding-right: 1vw;
  font-size: 1em;
}
</style>
