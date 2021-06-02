export const state = () => ({
  homepageInstruction: {},
  sysInstructions: {},
  topBanners: Array,
  bottomBanners: Array,
  homeReady: false,
  instReady: false
})
export const mutations = {
  UPDATE_HOME_INSTRUCTION(state, homeInstruction) {
    state.homepageInstruction = homeInstruction
    state.topBanners = homeInstruction.topBanners
    state.bottomBanners = homeInstruction.bottomBanners
    state.homeReady = true
  },
  UPDATE_SYS_INSTRUCTION(state, sysInstruction) {
    state.sysInstructions = sysInstruction
    state.instReady = true
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
  getTopBanners: (state) => {
    return state.topBanners
  },
  getBottomBanners: (state) => {
    return state.bottomBanners
  },
  getSysInstruction: (state) => {
    return state.sysInstructions
  },
  getHomeReady: (state) => {
    return state.homeReady
  },
  getInstReady: (state) => {
    return state.instReady
  }
}
