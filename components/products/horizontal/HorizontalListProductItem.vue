<template>
  <v-sheet class="product" width="115" outlined rounded>
    <div class="measureAndImg">
      <p class="measure">{{ product.measure }}</p>
      <v-img class="img-product" contain height="100" :src="imageUrl" />
    </div>
    <div class="productName">{{ product.name }}</div>
    <div class="productPrice">{{ this.engDigitToPersianPrice(product.price) }}</div>
    <v-divider></v-divider>
    <div class="cart-operation">
      <v-btn class="btn-add-product"
             color="white"
             depressed

        v-on:click="addProduct($props.product)">
      <v-img class="cart-icon"
             contain
             src="/cart_grocery_store_green-24px.svg"
             alt="" />
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { FILES_URL } from '@/constants'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'HorizontalProductItem',
  props: { product: Object },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.product.pictures[0]
    }
  },
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    addProduct: async function(product) {
      await this.$store.dispatch('cart/increase_product', product)
    },
    quantity:function(){
      return this.$store.getters['cart/getProductCartQuantity'](this.product.id)
    }
  }
}
</script>

<style scoped>
.img-product {
  margin: 0.5vh;
  grid-column: 1;
  grid-row: 2;
}

.product {
  margin: 0.5vh;
}

.measure {
  grid-column: 1;
  grid-row: 1;
  direction: rtl;
  z-index: 1;
  color: #808080;
  max-lines: 1;
  overflow: hidden;
  background-color: #EDEDED;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: 11.9vw;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 2px;
  height: max-content;
  font-size: 8pt;
}

.measureAndImg {
  display: grid;
  grid-template-rows: 0 2fr;
  grid-template-columns: 1fr
}

.cart-operation {

}

.cart-icon {
  margin-left: auto;
  margin-right: auto;
  height: 24px;
  max-height: 24px;
  width: 24px;
  max-width: 24px;
  margin-top: 0.2vh;
  margin-bottom: 0.2vh;
}

.productName {
  direction: rtl;
  color: #808080;
  font-size: 9pt;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-right: 0.5vh;
  margin-left: 0.5vh;
}

.productPrice {
  direction: rtl;
  color: #808080;
  font-size: 9pt;
  overflow: hidden;
  display: -webkit-box;
  text-align: left;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-right: 0.5vh;
  margin-left: 0.5vh;
}
.btn-add-product{
  max-height: 30px;
  width: 100%;
}
</style>
