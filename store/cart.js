export const state = () => ({
  cartProducts: []
})
export const mutations = {

  INCREASE_PRODUCT(state, product){
    const cartProductIndex = state.cartProducts.map(p => p.id).indexOf(product.id)
    if (cartProductIndex === -1) {
      const cartProduct = {
        id: product.id,
        name: product.name,
        measure: product.measure,
        picture: product.pictures[0],
        price: product.price,
        discountPrice: product.discountPrice,
        stepDiscountPrice: product.stepDiscountPrice,
        discountPercent: product.discountPercent,
        quantity: 1,
        stock: product.stock,
        inStockPeriod: product.inStockPeriod
      }
      state.cartProducts.push(cartProduct)
    } else {
      state.cartProducts[cartProductIndex].quantity = state.cartProducts[cartProductIndex].quantity + 1
    }
    this.$localForage.setItem('cart', state.cartProducts)
  },

  DECREASE_PRODUCT(state, product){
    const cartProductIndex = state.cartProducts.map(p => p.id).indexOf(product.id)
    if (cartProductIndex > -1) {
      let quantity = state.cartProducts[cartProductIndex].quantity
      if (quantity === 1) {
        state.cartProducts = state.cartProducts.filter(p => p.id !== product.id)

      } else
        state.cartProducts[cartProductIndex].quantity = quantity - 1
    }
    this.$localForage.setItem('cart', state.cartProducts)
  },
  DELETE_PRODUCT(state, productId){
    state.cartProducts = state.cartProducts.filter(p => p.id !== productId)
    this.$localForage.setItem('cart', state.cartProducts)
  },

  UPDATE_PRODUCT_STOCK(state, product){
    const cartProductIndex = state.cartProducts.map(p => p.id).indexOf(product.id)
    state.cartProducts[cartProductIndex].stock = product.stock
    state.cartProducts[cartProductIndex].inStockPeriod = product.inStockPeriod

    this.$localForage.setItem('cart', state.cartProducts)
  },

  UPDATE_CART_STOCK(state, cartProducts){
  // console.log(state.cartProducts.size)
    // if (state.cartProducts.size > 0){

      // const hashCart = Object.fromEntries(
      //   state.cartProducts.forEach((p, index) => {[p.id, index]})
      // )
    // const responseData =  this.$repositories.product.checkCartProductsAvailability({ 'products': state.cartProducts })
    // if (responseData !== false) {
    cartProducts.map(serverProduct => {
    //     const cartProductIndex = state.cartProducts.map(p => p.id).indexOf(serverProduct.id)
    //     state.cartProducts[cartProductIndex].stock = serverProduct.stock
    //     state.cartProducts[cartProductIndex].inStockPeriod = serverProduct.inStockPeriod
    //     // state.cartProducts[hashCart[serverProduct.id]].stock = serverProduct.stock
    //     // state.cartProducts[hashCart[serverProduct.id]].inStockPeriod = serverProduct.inStockPeriod
      })
    //   this.$localForage.setItem('cart', state.cartProducts)
    // }
  // }
  },

  UPDATE_CART(state, cartProducts) {
    state.cartProducts = cartProducts
  }




}

export const actions = {
  async increase_product({ commit } , product) {
    commit('INCREASE_PRODUCT', product)
  },
  async decrease_product({ commit }, product) {
    commit('DECREASE_PRODUCT', product)
  },
  async delete_product({ commit }, productId) {
    commit('DELETE_PRODUCT', productId)
  },
  async update_product_stock({ commit }, product) {
    commit('UPDATE_PRODUCT_STOCK', product)
  },

  async init_cart({ commit }) {
    let cart = await this.$localForage.getItem('cart')
    if (cart == null) {
      const initCart = []
      commit('UPDATE_CART', initCart)
      await this.$localForage.setItem('cart', initCart)
    } else
      commit('UPDATE_CART', cart)
  },
  async delete_cart({ commit }) {
    const emptyCart = []
    await this.$localForage.setItem('cart', emptyCart)
    commit('UPDATE_CART', emptyCart)
  },

  async update_cart_stock({ commit, state }) {

    if(state.cartProducts.length >0 ){
    const responseData = await this.$repositories.product.checkCartProductsAvailability({ 'products': state.cartProducts })
    if (responseData !== false) {
      responseData.data.products.map(serverProduct => {
        commit('UPDATE_PRODUCT_STOCK', serverProduct)
      })
    }}
  }

}

export const getters = {
  cartProductsCount: state => {
    if (state.cartProducts.length === 0)
      return '0'
    return state.cartProducts.map(cp => cp.quantity).reduce((previousValue, currentValue) => previousValue + currentValue)
  },
  getCartTotalAmount: state => {
    if (state.cartProducts.length === 0)
      return '0'
    return state.cartProducts.map(cp => cp.quantity * cp.discountPrice).reduce((previousValue, currentValue) => previousValue + currentValue)
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
  },
  getCartProducts: (state) => {
    return state.cartProducts
  }
}
