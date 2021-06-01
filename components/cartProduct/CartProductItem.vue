<template>
  <div>
    <v-sheet class="product-cart-sheet" rounded outlined>
      <div class="cart-product-info">
        <div class="cart-product-img">
          <div class="measureAndImg">
            <p class="measure">{{ engDigitToPersianDigit(cartProduct.measure) }}</p>
            <v-img class="product-img" contain :src="imageUrl" />
          </div>
          <v-sheet class="in-stock-status" :color="productStatus.color">
            {{ engDigitToPersianDigit(productStatus.stockMsg) }}
          </v-sheet>
        </div>
        <div class="cart-product-data">
          <div class="product-name">
            {{ cartProduct.name }}
          </div>
          <v-chip v-if="productStatus.remove"
                  class="ma-1" small :color="showChip" text-color="white">
            %{{ engDigitToPersianDigit(cartProduct.discountPercent) }}
          </v-chip>
          <div :class="showPrice" v-if="productStatus.remove">
            {{ this.engDigitToPersianPrice(cartProduct.price) }}
          </div>
          <div class="discount-price" v-if="productStatus.remove">
            {{ this.engDigitToPersianPrice(cartProduct.discountPrice) }}
          </div>
          <div class="period-stock" v-if="productStatus.period">
            ساعت مجاز سفارش این محصول
          </div>
        </div>
      </div>
      <v-divider vertical></v-divider>
      <div class="cart-operation">
        <v-btn icon :disabled="productStatus.minus" v-on:click="decreaseProduct($props.cartProduct)"
               class="btn-decrease" block small depressed
               color="white">
          <v-icon size="22" color="black">
            {{mdiMinus}}
          </v-icon>
        </v-btn>
        <v-divider></v-divider>
        <div v-if="productStatus.remove" class="cart-quantity">
          {{ engDigitToPersianDigit(quantity()) }}
        </div>
        <div v-if="!productStatus.remove" class="cart-quantity">
          <v-btn icon v-on:click="deleteProduct($props.cartProduct)" class="btn-increase" block small depressed
                 color="white">
            <v-icon size="24" color="warning">
              {{mdiDeleteSweep}}
            </v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <v-btn icon :disabled="productStatus.plus" v-on:click="increaseProduct($props.cartProduct)" class="btn-increase"
               block small depressed
               color="white">
          <v-icon size="22" color="black">
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </div>
      <div class="cart-status-color" :class="productStatus.color"></div>
    </v-sheet>
    <nuxt-link style="text-decoration: none; color: inherit;" :to="'/products/similar/'+cartProduct.id">
      <v-btn v-if="cartProduct.quantity > cartProduct.stock && productStatus.period"
             rounded depressed class="btn-similar-products">محصولات مشابه
      </v-btn>
    </nuxt-link>
  </div>
</template>

<script>
import { FILES_URL } from '@/constants'
import PersianUtil from '@/utils/PersianUtil'
import { mdiMinus, mdiDeleteSweep, mdiPlus } from '@mdi/js'
export default {
  name: 'CartProductItem',
  props: { cartProduct: Object },
  data() {
    return {
      mdiMinus: mdiMinus,
      mdiDeleteSweep: mdiDeleteSweep,
      mdiPlus: mdiPlus,
    }
  },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.cartProduct.picture
    },
    showPrice: function() {
      if (this.cartProduct.discountPercent > 0)
        return 'price'
      else return 'inactive-price'
    },
    showChip: function() {
      if (this.cartProduct.discountPercent > 0)
        return 'warning'
      else return 'white'
    },
    productStatus: function() {
      if (this.cartProduct.inStockPeriod !== undefined &&
        this.cartProduct.inStockPeriod != null) {
        return {
          color: 'warning',
          stockMsg: this.cartProduct.inStockPeriod,
          period: true,
          plus: true,
          minus: true,
          remove: false
        }
      } else if (this.cartProduct.stock === 0) {
        return {
          color: 'warning',
          stockMsg: 'ناموجود',
          period: false,
          plus: true,
          minus: true,
          remove: false
        }
      } else if (this.cartProduct.quantity > this.cartProduct.stock) {
        return {
          color: 'caution',
          stockMsg: 'تعداد '.concat(PersianUtil.covertEngDigitToPersianDigit(this.cartProduct.stock).concat(' موجود')),
          plus: true,
          minus: false,
          period: false,
          remove: true
        }
      } else {
        return {
          color: 'accent',
          stockMsg: 'موجود',
          plus: false,
          minus: false,
          period: false,
          remove: true
        }
      }
    }
  },
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    engDigitToPersianDigit: function(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    increaseProduct: async function(cartProduct) {
      await this.$store.dispatch('cart/increase_product', cartProduct)
    },
    decreaseProduct: async function(cartProduct) {
      await this.$store.dispatch('cart/decrease_product', cartProduct)
    },
    quantity: function() {
      return this.$store.getters['cart/getProductCartQuantity'](this.cartProduct.id)
    },
    deleteProduct: async function(cartProduct) {
      await this.$store.dispatch('cart/delete_product', cartProduct.id)
    }
  }
}
</script>

<style scoped>
.cart-status-color {
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
  margin: 2vw;
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
  direction: rtl;
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
  max-width: fit-content;
  min-width: 9.9vw;
  border-top-left-radius: 3px;
  border-bottom-right-radius: 5px;
  height: max-content;
  font-size: 8pt;
  text-align: center;
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
  margin-right: 1vw;
  margin-bottom: 3px;
  max-lines: 2;
  font-family: 'IranSansMobileBold', sans-serif;
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

.in-stock-status {
  margin: auto;
  margin-top: 1vh;
  color: white;
  border-radius: 5px;
  width: 95%;
  background-color: #0BCE83;
  font-size: 0.8em;
}

.btn-similar-products {
  margin-left: 2vw;
  text-align: center;
  background-color: #E6E6E6;
  border-radius: 5px;
  font-size: 0.85em;
  color: #808080;
  height: 5vh;
  vertical-align: center;
  width: 38vw;
}

.period-stock {
  font-size: 0.8em;
  margin-top: 18.5vw;
  margin-right: 1vw;
}
</style>
