<template>
  <div>
    <RefreshUtil v-if="reload" />
    <div v-if="!reload">
      <div class="measureAndImg">
        <p class="measure">{{ engDigitToPersianDigit(product.measure) }}</p>
        <v-img class="img-product" contain :src="imageUrl" />
      </div>
      <div class="product-name">{{ product.name }}</div>
      <div v-if="product.discountPercent>0 && product.stock>0" class="product-price-before-discount">
        {{ this.engDigitToPersianPrice(product.price) }}
      </div>
      <v-row no-gutters>
        <v-col style="padding-top: 0; padding-bottom: 0">
          <div class="product-price" v-if="product.stock>0">{{ this.engDigitToPersianPrice(product.discountPrice) }}
          </div>
        </v-col>
        <v-col class="discount-chip-div">
          <div v-if="product.discountPercent>0 && product.stock>0" class="discount-chip">
            %{{ engDigitToPersianDigit(product.discountPercent) }}
          </div>
        </v-col>
      </v-row>
      <div :class="selectDivider(quantity())"></div>
      <p class="detail-title">توضیحات</p>
      <div class="detail-content">{{ product.details }}</div>
      <SectionSeparator class="section-separator"
                        section-name="محصولات مشابه"
                        :section-icon="require('~/assets/icon/layers-24px.svg')"
                        :section-link-url="'/products/similar/'+product.id" />
      <HorizontalProductList class="similar-products" :products="similarProducts" />
      <div class="btn-container">
        <v-btn v-if="product.stock<1" class="btn-add-product"
               color="white"
               depressed
               v-on:click="setInStockNotification">
          <v-img class="cart-icon"
                 contain
                 :src="require('~/assets/icon/notifications-24px.svg')"
                 alt="" />
        </v-btn>
        <v-btn v-if="quantity()<=0 && product.stock>0" class="btn-add-product"
               color="white"
               depressed
               v-on:click="increaseProduct(product)">
          <v-img class="cart-icon"
                 contain
                 :src="require('~/assets/icon/cart_grocery_store_green-24px.svg')"
                 alt="" />
        </v-btn>
        <v-row class="row-cart-operation" v-if="quantity()>0 && product.stock>0" no-gutters>
          <v-btn class="btn-decrease" depressed color="primary"
                 v-on:click="decreaseProduct(product)">
            <v-icon size="20" color="white">
              {{ mdiMinus }}
            </v-icon>
          </v-btn>
          <div class="cart-quantity">
            {{ engDigitToPersianDigit(quantity()) }}
          </div>
          <v-btn v-on:click="increaseProduct(product)"
                 class="btn-increase" depressed color="primary">
            <v-icon size="20" color="white">
              {{ mdiPlus }}
            </v-icon>
          </v-btn>
        </v-row>
      </div>
    </div>
  </div>

</template>

<script>
import PersianUtil from '@/utils/PersianUtil'
import { FILES_URL } from '@/constants'
import SectionSeparator from '@/components/separator/SectionSeparator'
import HorizontalProductList from '@/components/products/horizontal/HorizontalProductList'
import RefreshUtil from '@/components/utils/RefreshUtil'
import { mdiMinus , mdiPlus, mdiAlertCircleOutline , mdiAlertOutline, mdiCheckCircleOutline} from '@mdi/js'

export default {
  name: 'index',
  components: { RefreshUtil, HorizontalProductList, SectionSeparator },
  data() {
    return {
      mdiAlertCircleOutline: mdiAlertCircleOutline,
      mdiAlertOutline: mdiAlertOutline,
      mdiCheckCircleOutline: mdiCheckCircleOutline,
      mdiPlus: mdiPlus,
      mdiMinus: mdiMinus,
      product: {},
      similarProducts: [],
      reload: false
    }
  },
  computed: {
    imageUrl: function() {
      if (this.product.pictures !== undefined)
        return FILES_URL + this.product.pictures
    }
  },
  async fetch() {
    const productResponse = await this.$repositories.product.getProductById(this.$route.params.id)
    if (productResponse !== false) {
      this.product = productResponse.data
    } else {
      this.reload = true
    }

    const productsResponse = await this.$repositories.product.getSimilarProductsByProductId(this.$route.params.id, 11, 0)
    if (productResponse !== false) {
      this.similarProducts = productsResponse.data
    } else {
      this.reload = true
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
    selectDivider(qty) {
      if (qty > 0)
        return 'product-divider-added'
      else
        return 'product-divider'
    },
    async setInStockNotification(){
      if(this.$storage.getUniversal('token')  !== null && this.$storage.getUniversal('token')  !== undefined) {
        let responseData = await this.$repositories.customer.setNotifyInStock(this.product.id)
        if (responseData !== false) {
          this.$notifier.showMessage({ content: 'پس از موجود شدن، به شما اطلاع رسانی خواهد شد.', color: 'success', title: 'درخواست شما ثبت گردید.' , icon: this.mdiCheckCircleOutline })
        }else{
          this.$notifier.showMessage({ content: 'متاسفانه در خواست شما ثبت نگردید.', color: 'error', title: 'خطا' , icon: this.mdiAlertCircleOutline })
        }
      }else {
        this.$notifier.showMessage({ content: 'لطفا ابتدا ثبت نام نمایید.', color: 'info', title: 'توجه' , icon: this.mdiAlertOutline })
      }
    }
  }
}
</script>

<style scoped>
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
  height: max-content;
  font-size: 1em;
  text-align: center;
  margin: 1vh;
  padding: 0.5vh;
  border-radius: 5px;
}

.measureAndImg {
  display: grid;
  grid-template-rows: 0 2fr;
  grid-template-columns: 1fr
}

.img-product {
  margin: 0.5vh;
  grid-column: 1;
  grid-row: 2;
  height: 36vh;
  margin-bottom: 1vh;
}

.product-name {
  direction: rtl;
  margin: 0.5vh 1vh;
}

.product-price-before-discount {
  margin: 0.5vh 1vh;
  direction: rtl;
  text-align: left;
  color: grey;
  text-decoration: line-through;
}

.product-price {
  margin: 0.5vh 1vh;
  direction: rtl;
  font-size: 1.25em;
  text-align: left;
}

.product-divider {
  width: 100%;
  height: 0.6vh;
  background-color: #EDEDED;
}

.product-divider-added {
  width: 100%;
  height: 0.6vh;
  background-color: #8629FD;
}

.discount-chip-div {
  padding-top: 0;
  padding-bottom: 0;
  direction: rtl;
  margin: 0.5vh 1vh;
  font-size: 1em;
}

.discount-chip {
  padding: 0.25vh 1.2vh 0.25vh 1.2vh;
  font-size: 1em;
  color: white;
  border-radius: 8px;
  width: fit-content;
  background-color: #FF6672;
  margin-right: 1vh;
}

.detail-title {
  direction: rtl;
  font-size: 1em;
  margin: 0.5vh 1vh;
}

.detail-content {
  direction: rtl;
  font-size: 0.8em;
  margin: 0.5vh 1vh;
  min-height: 8vh;
}

.section-separator {
  margin-top: 1vh;
  margin-bottom: 1vh;
  font-size: 1em;
  color: #808080;
}

.btn-container {
  position: fixed;
  position: -webkit-sticky;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #F2F3F5;
}

.btn-add-product {
  width: 94%;
  height: 40px;
  font-size: 1em;
  margin: 1.5vh;
  font-family: 'IranSansMobileBold', sans-serif;
}

.cart-icon {
  height: 24px;
  max-height: 24px;
  width: 24px;
  max-width: 24px;
  margin: 0.2vh auto;
}

.btn-increase {
  margin: 1vh auto;
}

.btn-decrease {
  margin: 1vh auto;
}

.cart-quantity {
  font-size: 1em;
  color: black;
  background-color: white;
  width: 17vw;
  margin: auto;
  text-align: center;
  padding-top: 0.7vh;
  padding-bottom: 0.7vh;
}

.row-cart-operation {
  vertical-align: center;
}

.similar-products {
  margin-bottom: 8vh;
}
</style>
