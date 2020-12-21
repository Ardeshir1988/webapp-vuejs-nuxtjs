<template>
  <div>
    <CartProductList class="cart-list" :cart-products="cartList" />
    <div class="btn-container">
      <v-row>
        <v-col class="column">
          <v-row no-gutters style="margin-top: 1vh">
            <v-col class="column-amount">
              {{ getCartTotalAmount() }}
            </v-col>
            <v-col class="column-text">
              مجموع خرید
            </v-col>
          </v-row>
          <div class="divider"></div>
          <div v-if="ready" class="cart-msg">مبلغ مجموع خرید مربوط به اقلام موجود می باشد</div>
          <div v-if="ready" class="divider"></div>
          <v-btn @click="continueCheckout" class="btn-buy" depressed height="40" color="accent">
            ادامه خرید
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
    },
    ready: function() {
      return this.cartList.filter(cpf => cpf.quantity > cpf.stock).length > 0
    }
  },
  activated() {
    this.updateCartAfterReload()
  },
  methods: {
    getCartTotalAmount: function() {
      if (this.cartList.length === 0)
        return PersianUtil.makePersianPrice(0)
      else {
        return PersianUtil.makePersianPrice(
          this.cartList.filter(cpf => cpf.quantity <= cpf.stock)
            .map(cp => cp.quantity * cp.discountPrice)
            .reduce(function(accumulator, currentValue) {
              return accumulator + currentValue
            }, 0))
      }
    },
    async updateCartAfterReload() {
      this.$store.dispatch('cart/init_cart').then(x => {
        const cartProducts = this.cartList
        this.$repositories.product.checkCartProductsAvailability({ 'products': cartProducts })
          .then(responseData => {
            if (responseData !== false) {
              console.log(responseData.data)
              responseData.data.products.forEach(serverProduct => {
                cartProducts.forEach(cartProduct => {
                  if (cartProduct.stock !== serverProduct.stock || serverProduct.inStockPeriod != null)
                    this.$store.dispatch('cart/update_product_stock', {
                      id: serverProduct.id,
                      stock: serverProduct.stock,
                      inStockPeriod: serverProduct.inStockPeriod
                    })
                })
              })
            }
          })
      })
    },
    async continueCheckout() {
      this.$repositories.product.checkCartProductsAvailability({ 'products': this.cartList })
        .then(res => {
          if (res !== false) {
            if (res.data.ready) {
              this.$router.push('/checkout')
            } else {
              this.$notifier.showMessage({ content: 'برای ادامه همه اجناس باید سبز باشند', color: 'black' })
            }
          }
        })
    }
  }
}
</script>

<style scoped>
.cart-list {
  margin-bottom: 24vh;
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
  margin-left: 4vw;
  direction: rtl;
}

.column-text {
  color: black;
  padding-top: 0;
  padding-bottom: 0;
  margin-right: 4vw;
  text-align: right;
}

.cart-msg {
  font-size: 0.85em;
  color: black;
}
</style>
