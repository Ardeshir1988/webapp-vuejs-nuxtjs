export const state = () => ({
  products: [],
  homePage:{}
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_HOMEPAGE(state, homePage) {
    state.homePage = homePage
  }
}

export const actions = {
  async get_products({ commit }) {
    const res = await this.$repositories.product.all()
    if (res.status === 200 && res.data) {
      commit('SET_PRODUCTS', res.data)
    } else {
      // Handle error here
    }
  },

  async get_home_page({ commit }) {
    const res = await this.$repositories.product.homepage()
    if (res.status === 200 && res.data) {
      commit('SET_HOMEPAGE', res.data)
    } else {
      // Handle error here
    }
  }
}
