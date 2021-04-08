export const state = () => ({
  token: '',
  mobile: ''
})

export const mutations = {
  setMobile (state, mobile) {
    state.user = mobile
  },
  setToken (state, token) {
    state.token = token
  }
}

export const getters = {
  loggedIn (state) {
    return Boolean(state.user && state.token)
  },
  getToken(state) {
    return state.token
  }
}

export const actions = {
  async setAuth({ commit }, state){
    await commit('setToken', state.token)
    await commit('setMobile', state.mobile)
  },
  async resetAuth ({commit}) {
    await commit('setMobile', null)
    await commit('setToken', null)
  }
}

