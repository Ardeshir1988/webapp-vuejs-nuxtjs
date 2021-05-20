export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '', title= '', icon= '' }) {
      store.commit('snackbar/showMessage', { content, color, title, icon })
    }
  })
}
