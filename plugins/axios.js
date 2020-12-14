export default function({ $axios, redirect, $notifier }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    if (error.response === undefined) {
      $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
      return Promise.resolve(false);
    } else {
      if (error.response.data.message !== undefined)
        $notifier.showMessage({ content: error.response.data.message, color: 'black' })
      else
        $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
    }
  })
}
