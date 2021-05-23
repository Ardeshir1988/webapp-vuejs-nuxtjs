export default function({ app, req, $notifier, redirect }) {
  if (process.server) {
    if (req.headers.cookie === undefined) {
      $notifier.showMessage({ content: 'لطفا وارد شوید', color: 'black' })
      redirect('/account')
    }
  } else{ if (app.$storage.getUniversal('token') === undefined) {
      $notifier.showMessage({ content: 'لطفا وارد شوید', color: 'black' })
      redirect('/account')
    }
  }
}
