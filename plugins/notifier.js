export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = '', title= '', icon= undefined}) {
      store.commit('snackbar/showMessage', { content, color, title, icon })
    }
  })
}
