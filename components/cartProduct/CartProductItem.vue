<template>
  <v-sheet class="product-cart-sheet" rounded outlined>
    <div class="cart-product-info">
      <div class="cart-product-img">
        <div class="measureAndImg">
          <p class="measure">{{cartProduct.measure}}</p>
          <v-img class="product-img" contain :src="imageUrl" />
        </div>
        <v-sheet class="in-stock-status">
          موجود
        </v-sheet>
      </div>
      <div class="cart-product-data">
        <div class="product-name">
          {{cartProduct.name}}
        </div>
        <v-chip
          class="ma-1" small :color="showChip" text-color="white">
          %{{cartProduct.discountPercent}}
        </v-chip>
        <div :class="showPrice">
          {{this.engDigitToPersianPrice(cartProduct.price)}}
        </div>
        <div class="discount-price">
          {{this.engDigitToPersianPrice(cartProduct.discountPrice)}}
        </div>
      </div>
    </div>
    <v-divider vertical></v-divider>
    <div class="cart-operation">
      <v-btn v-on:click="decreaseProduct($props.cartProduct)" class="btn-decrease"  block small depressed color="white">
        <v-icon size="20" color="black">
          mdi-minus
        </v-icon>
      </v-btn>
      <v-divider></v-divider>
      <div class="cart-quantity">
        {{quantity()}}
      </div>
      <v-divider></v-divider>
      <v-btn v-on:click="increaseProduct($props.cartProduct)" class="btn-increase" block small depressed color="white">
        <v-icon size="20" color="black">
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <div class="cart-status-color"></div>
  </v-sheet>
</template>

<script>
import { FILES_URL } from '@/constants'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'CartProductItem',
  props: { cartProduct: Object },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.cartProduct.picture
    },
    showPrice:function(){
      if (this.cartProduct.discountPercent>0)
        return 'price';
      else return 'inactive-price'
    },
    showChip:function(){
      if (this.cartProduct.discountPercent>0)
        return 'warning';
      else return 'white'
    }
  },
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    increaseProduct: async function(cartProduct) {
      await this.$store.dispatch('cart/increase_product', cartProduct)
    },
    decreaseProduct:async function(cartProduct){
      await this.$store.dispatch('cart/decrease_product', cartProduct)
    },
    quantity: function() {
      return this.$store.getters['cart/getProductCartQuantity'](this.cartProduct.id)
    }
  }
}
</script>

<style scoped>
.cart-status-color {
  background-color: greenyellow;
  width: 8px;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}

.cart-operation {
  background-color: white;
  width: 45px;
  max-width: 45px;
  margin: 1px;
  display: flex;
  flex-flow: column-reverse;
}

.cart-product-info {
  margin: 1px;
  background-color: white;
  display: flex;
  flex-flow: row;
  width: 100%;
}

.product-cart-sheet {
  margin: 5px;
  height: 145px;
  max-height: 145px;
  display: flex;
  flex-flow: row;
}

.btn-increase {
  margin: auto;
}

.btn-decrease {
  margin: auto;
}

.cart-quantity {
  margin: auto;
  padding-top: 8px;
  padding-bottom: 8px;
}

.cart-product-data {
  width: 65%;
  direction: rtl;
}

.cart-product-img {
  width: 35%;
  text-align: center;
}

.product-img {
  margin: 5px;
  height: 98px;
  grid-column: 1;
  grid-row: 2;
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
  max-width: 9.9vw;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 5px;
  height: max-content;
  font-size: 8pt;
}

.measureAndImg {
  display: grid;
  grid-template-rows: 0 2fr;
  grid-template-columns: 1fr
}

.product-name {
  direction: rtl;
  font-size: 1em;
  line-height: 1.5em;
  max-height: 2.5rem;
  min-height: 2.5rem;
  margin-top: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  max-lines: 2;
}

.price {
  text-decoration: line-through;
  font-size: 1em;
  line-height: 1.25em;
  margin-top: 5px;
  margin-right: 3px;
}
.inactive-price {
  text-decoration: line-through;
  font-size: 1em;
  color: white;
  line-height: 1.25em;
  margin-top: 5px;
  margin-right: 3px;
}
.discount-price {
  margin-top: 7px;
  margin-right: 3px;
  font-size: 1.1em;
  line-height: 1.25em;
}
.in-stock-status{
  margin: auto;
  color: white;
  border-radius:5px;
  width: 80%;
  background-color: #00c853;
}
</style>
