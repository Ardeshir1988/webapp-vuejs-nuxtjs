export default function({ app, req, $notifier, redirect }) {
  if (app.$storage.getCookie('token') === undefined ){
    if (app.$storage.getUniversal('token') !== null &&  app.$storage.getUniversal('token') !== undefined) {
      app.$storage.setCookie('token', app.$storage.getLocalStorage('token'))
      app.$storage.setCookie('mobile', app.$storage.getLocalStorage('mobile'))
    }
  }
  if (process.server) {
    if (req.headers.cookie === undefined) {
      $notifier.showMessage({ content: 'لطفا وارد شوید', color: 'black' })
      redirect('/account')
    }
  } else {
    if (app.$storage.getCookie('token') === undefined) {
      $notifier.showMessage({ content: 'لطفا وارد شوید', color: 'black' })
      redirect('/account')
    }
  }
}
