export const state = () => ({
  homepageInstruction: {},
  sysInstructions: {},
  topBanners: Array,
  bottomBanners: Array,
  reload: false,
  ready: false
})
export const mutations = {
  UPDATE_HOME_INSTRUCTION(state, homeInstruction) {
    state.homepageInstruction = homeInstruction
    state.topBanners = homeInstruction.topBanners
    state.bottomBanners = homeInstruction.bottomBanners
  },
  UPDATE_SYS_INSTRUCTION(state, sysInstruction) {
    state.sysInstructions = sysInstruction
  },
  UPDATE_HOME_STATE(state, status) {
    state.reload = status.reload
    state.ready = status.ready
  }
}

export const actions = {

  async load_home_instruction({ commit }, homeInstruction) {
      commit('UPDATE_HOME_INSTRUCTION',homeInstruction)
  },
  async load_sys_instruction({ commit }, sysInstruction) {
      commit('UPDATE_SYS_INSTRUCTION',sysInstruction)
  },
  async load_home_state({ commit }, status) {
      commit('UPDATE_HOME_STATE', status)
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
  getHomeStateReady: (state) => {
    return state.ready
  },
  getHomeStateReload: (state) => {
    return state.reload
  }
}
