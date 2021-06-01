<template>
  <v-sheet class="product" outlined rounded>
    <div class="measureAndImg" @click="gotoProduct">
      <p class="measure">{{ engDigitToPersianDigit(product.measure) }}</p>
      <v-img class="img-product" contain height="140" :src="imageUrl" />
    </div>
    <div class="productName">{{ product.name }}</div>
    <v-row no-gutters>
      <v-col class="empty-price">
        <div class="productPrice" v-if="product.stock>0">{{ this.engDigitToPersianPrice(product.price) }}</div>
      </v-col>
      <v-col v-if="product.discountPercent>0" cols="3">
        <div class="discount-percent" v-if="product.stock>0"> %{{ engDigitToPersianDigit(product.discountPercent) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div v-if="product.stock<1" class="btn-add-product">
      <v-btn color="white" depressed height="41" width="100%" @click="setInStockNotification">
        <v-img class="cart-icon"
               contain
               :src="require('~/assets/icon/notifications-24px.svg')"
               alt="" />
      </v-btn>
    </div>
    <div v-if="quantity()<=0 && product.stock>0" class="btn-add-product">
      <v-btn color="white" depressed height="41" width="100%"
             v-on:click="increaseProduct(product)">
        <v-img class="cart-icon"
               contain
               :src="require('~/assets/icon/cart_grocery_store_green-24px.svg')"
               alt="" />
      </v-btn>
    </div>
    <div class="cart-operation" v-if="quantity()>0 && product.stock>0">
      <v-row class="row-cart-operation" no-gutters>
        <v-btn v-on:click="decreaseProduct(product)"
               class="btn-decrease" depressed x-small height="31" color="primary">
          <v-icon size="20" color="white">
            {{mdiMinus}}
          </v-icon>
        </v-btn>
        <div class="cart-quantity">
          {{ engDigitToPersianDigit(quantity()) }}
        </div>
        <v-btn v-on:click="increaseProduct(product)"
               class="btn-increase" depressed x-small height="31" color="primary">
          <v-icon size="20" color="white">
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
      </v-row>
    </div>
  </v-sheet>
</template>
<script>
import { FILES_URL } from '@/constants'
import PersianUtil from '@/utils/PersianUtil'
import { mdiMinus, mdiPlus } from '@mdi/js'

export default {
  name: 'VerticalListProductItem',
  props: { product: Object },
  data() {
    return {
      mdiPlus: mdiPlus,
      mdiMinus: mdiMinus
    }
  },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.product.pictures[0]
    }
  },
  methods: {
    engDigitToPersianPrice: function(val) {
      return PersianUtil.makePersianPrice(val)
    },
    engDigitToPersianDigit: function(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    increaseProduct: async function(product) {
      await this.$store.dispatch('cart/increase_product', product)
    },
    decreaseProduct: async function(product) {
      await this.$store.dispatch('cart/decrease_product', product)
    },
    quantity: function() {
      return this.$store.getters['cart/getProductCartQuantity'](this.product.id)
    },
    gotoProduct() {
      this.$router.push('/product/' + this.product.id)
    },
    async setInStockNotification(){
      if(this.$storage.getUniversal('token')  !== null && this.$storage.getUniversal('token')  !== undefined) {
        let responseData = await this.$repositories.customer.setNotifyInStock(this.product.id)
        if (responseData !== false) {
          this.$notifier.showMessage({ content: 'پس از موجود شدن، به شما اطلاع رسانی خواهد شد.', color: 'success', title: 'درخواست شما ثبت گردید' , icon: 'check-circle-outline' })
        }else{
          this.$notifier.showMessage({ content: 'متاسفانه در خواست شما ثبت نگردید', color: 'error', title: 'توجه' , icon: 'alert-circle-outline' })
        }
      }else {
        this.$notifier.showMessage({ content: 'لطفا ابتدا ثبت نام نمایید', color: 'info', title: 'توجه' , icon: 'alert-outline' })
      }
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
  margin: 0.6vh;
  width: 47.3vw;
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
  text-align: center;
}

.measureAndImg {
  display: grid;
  grid-template-rows: 0 2fr;
  grid-template-columns: 1fr
}

.cart-operation {
  height: 41px;
  text-align: center;
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
  font-size: 0.9em;
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
  font-size: 1.1em;
  overflow: hidden;
  display: -webkit-box;
  text-align: left;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-right: 0.5vh;
  margin-left: 0.5vh;
}

.btn-add-product {
  height: 41px;
  width: 100%;
  text-align: center;
}

.btn-increase {
  margin: auto;
}

.btn-decrease {
  margin: auto;
}

.cart-quantity {
  margin: auto;
  width: 21px;
  font-size: 1em;
}

.row-cart-operation {
  height: 41px;
  vertical-align: center;
}
.discount-percent {
  background-color: #FF6672;
  border-radius: 5px;
  color: white;
  font-size: 0.9em;
  text-align: center;
  margin-right: 3px;
}
.empty-price{
  min-height: 26px;
}
</style>
