<template>
  <v-sheet class="product-item" rounded outlined>
    <v-row no-gutters>
      <v-col>
        <div class="product-quantity">x{{ getPersianDigit(productItem.quantity) }}</div>
        <div class="product-price">{{ getPersianPrice(productItem.price) }}</div>
      </v-col>
      <v-col class="product-name">{{ productItem.name }}</v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'OrderProductItem',
  props: { productItem: Object },
  methods: {
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    }
  }
}
</script>

<style scoped>
.product-name {
  font-size: 0.85em;
  text-align: right;
  direction: rtl;
  margin: 1vw;
}

.product-price {
  font-size: 0.9em;
  text-align: left;
  direction: rtl;
  margin: 1vw;
}

.product-item {
  margin: 2vw;
}

.product-quantity {
  font-size: 0.9em;
  text-align: left;
  direction: rtl;
  margin: 1vw;
}

</style>
