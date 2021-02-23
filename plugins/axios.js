export default function({ $axios, redirect, $notifier, app }) {
  $axios.onRequest(config => {
    const c = app.$cookies.get('token')
    if (c !== undefined) {
      config.headers.common = { 'Authorization': 'Bearer ' + c }
    }
    console.log('Making request to ' + config.url + '-' + config.headers)
  })
  $axios.onError(err => {
    if (err.response === undefined) {
      $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
      return Promise.resolve(false)
    } else {
      if (err.response.status === 401) {
        const mobile = app.$cookies.get('mobile')
        const device = app.$ua.deviceType() + '-' + app.$ua.browser()
        return $axios.put('/register/renew-token', { mobile: mobile, device: device, customerChannel: "WEB" })
          .then(res => {
            app.$cookies.set('token', res.data.token, { maxAge: 60 * 60 * 24 * 90 })
            err.config.headers['Authorization'] = 'Bearer ' + res.data.token
            return $axios.request(err.config)
          })
      } else {
        if (err.response.data.message !== '') {
          $notifier.showMessage({ content: err.response.data.message, color: 'black' })
          return Promise.resolve(false)
        } else {
          $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
          return Promise.resolve(false)
        }
      }
    }
  })
}
