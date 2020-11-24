<template>
  <div>
    <CartProductList class="cart-list" :cart-products="cartList" />
    <div class="btn-container">
      <v-row>
        <v-col class="column">
          <v-row>
            <v-col class="column-amount">
              {{ getCartTotalAmount() }}
            </v-col>
            <v-col class="column-text">
              مجموع خرید
            </v-col>
          </v-row>
          <v-divider class="divider"></v-divider>
          <v-btn class="btn-buy" depressed height="40" color="accent">
          <div>
            ادامه خرید
          </div>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CartProductList from '@/components/cartProduct/CartProductList'
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'index.vue',
  components: { CartProductList },
  computed: {
    cartList: function() {
      return this.$store.getters['cart/getCartProducts']
    }
  },
  methods: {
    getCartTotalAmount: function() {
      if (this.cartList.length === 0)
        return PersianUtil.makePersianPrice(0)
      else
        return PersianUtil.makePersianPrice(this.cartList.map(cp => cp.quantity * cp.discountPrice).reduce((previousValue, currentValue) => previousValue + currentValue))
    }
  }
}
</script>

<style scoped>
.cart-list {
  margin-bottom: 96px;
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

.btn-buy {
  margin: auto;
  width: 94%;
  font-size: 1em;
  font-family: 'IranSansMobileBold', sans-serif;
}

.column {
  text-align: center;
  padding-top: 0;
}

.divider {
  margin-top: 2px;
  margin-bottom: 10px;
}

.column-amount {
  color: black;
  padding-top: 0;
  padding-bottom: 0;
  text-align: left;
  margin-left: 10px;
  direction: rtl;
}

.column-text {
  color: black;
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 10px;
  text-align: right;
}
</style>
