export const state = () => ({
  homepageInstruction: {},
  sysInstructions:{}
})
export const mutations = {
  UPDATE_HOME_INSTRUCTION(state, homeInstruction) {
    state.homepageInstruction = homeInstruction
  },
  UPDATE_SYS_INSTRUCTION(state, sysInstruction) {
    state.sysInstructions = sysInstruction
  }
}

export const actions = {

  async load_home_instruction({ commit }, homeInstruction) {
    let responseData = await this.$repositories.product.homepage()
    if (responseData !== false ){
      commit('UPDATE_HOME_INSTRUCTION',responseData.data)
    }
  },
  async load_sys_instruction({ commit }, sysInstruction) {
    let responseData = await this.$repositories.product.getInstructions()
    if (responseData !== false ){
      commit('UPDATE_SYS_INSTRUCTION',responseData.data)
    }
  }
}

export const getters = {
  getHomeInstruction: (state) => {
    return state.homepageInstruction
  },
  getSysInstruction: (state) => {
    return state.sysInstructions
  }
}
