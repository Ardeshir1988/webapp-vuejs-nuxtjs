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

}

export const actions = {
  async setAuth({ commit }, token, mobile){
    await this.$localForage.setItem('token', token)
    await this.$localForage.setItem('mobile', mobile)

  }
}

