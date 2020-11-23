export const state = () => ({
  cartProducts: []
})
export const mutations = {
  UPDATE_CART(state, cartProducts) {
    state.cartProducts = cartProducts
  }
}

export const actions = {
  async increase_product({ commit }, product) {
    const cartProduct = {
      id: product.id,
      name: product.name,
      measure: product.measure,
      picture: product.picture,
      price: product.price,
      discountPrice: product.discountPrice,
      stepDiscountPrice: product.stepDiscountPrice,
      discountPercent: product.discountPercent,
      quantity: product.quantity,
      stock: product.stock,
      inStockPeriod: product.inStockPeriod
    }
    let cart = await this.$localForage.getItem('cart')
    if (cart == null) {
      cart = []
      cartProduct.quantity = 1
      cart.push(cartProduct)
      await this.$localForage.setItem('cart', cart)
    } else {
      const cartProductIndex = cart.map(p => p.id).indexOf(cartProduct.id)
      if (cartProductIndex === -1) {
        cartProduct.quantity = 1
        cart.push(cartProduct)
      } else {
        cart[cartProductIndex].quantity = cart[cartProductIndex].quantity + 1
      }
      await this.$localForage.setItem('cart', cart)
    }

    commit('UPDATE_CART', cart)
  },
  async decrease_product({ commit }, product) {
    let cart = await this.$localForage.getItem('cart')
    const cartProductIndex = cart.map(p => p.id).indexOf(product.id)
    if (cart[cartProductIndex].quantity === 1) {
      cart = cart.filter(p => p.id !== product.id)
    } else
      cart[cartProductIndex].quantity = cart[cartProductIndex].quantity - 1
    await this.$localForage.setItem('cart', cart)
    commit('UPDATE_CART', cart)
  },
  async init_cart({ commit }) {
    let cart = await this.$localForage.getItem('cart')
    if (cart == null) {
      const initCart = []
      commit('UPDATE_CART', initCart)
      await this.$localForage.setItem('cart', initCart)
    } else
      commit('UPDATE_CART', cart)
  }
}

export const getters = {
  cartProductsCount: state => {
    if (state.cartProducts.length === 0)
      return '0'
    return state.cartProducts.map(cp => cp.quantity).reduce((previousValue, currentValue) => previousValue + currentValue)
  },
  getProductCartQuantity: (state) => (productId) => {
    if (state.cartProducts.length === 0)
      return 0
    else {
      const cartProductIndex = state.cartProducts.map(p => p.id).indexOf(productId)
      if (cartProductIndex === -1)
        return 0
      else
        return state.cartProducts[cartProductIndex].quantity
    }
  }
}
