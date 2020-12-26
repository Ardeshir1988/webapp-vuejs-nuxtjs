export default function({ $axios, redirect, $notifier, app, store }) {
  $axios.onRequest(config => {
    const c = app.$cookies.get('token')
    if (c !== undefined && config.headers.common.Authorization === undefined) {
      console.log('axios header')
      config.headers.common = { 'Authorization': 'Bearer ' + c }
    }
    console.log('Making request to ' + config.url + '-' + config.headers)
  })
  $axios.onError(error => {
    console.log('----------error----' + error)
    if (error.response === undefined) {
      $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
      return Promise.resolve(false)
    } else {
      if (error.response.data.message !== '') {
        console.log('------if----' + error.response.data)
        $notifier.showMessage({ content: error.response.data.message, color: 'black' })
      } else {
        console.log('-----else-----' + error.data)
        $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
      }
    }
    return Promise.resolve(false)
  })
}
