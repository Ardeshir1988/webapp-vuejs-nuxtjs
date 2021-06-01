export const state = () => ({
  content: '',
  color: '',
  icon: undefined,
  title: ''
})

export const mutations = {
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
    state.title = payload.title
    state.icon = payload.icon
  }
}
