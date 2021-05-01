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
      commit('UPDATE_HOME_INSTRUCTION',homeInstruction)
  },
  async load_sys_instruction({ commit }, sysInstruction) {
      commit('UPDATE_SYS_INSTRUCTION',sysInstruction)
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
