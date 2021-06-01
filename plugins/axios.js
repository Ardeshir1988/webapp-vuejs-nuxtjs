export default function({ $axios, redirect, $notifier, app }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url + '-' + config.headers)
  })
  $axios.onError(err => {
    if (err.response === undefined) {
      $notifier.showMessage({
        content: 'متاسفانه نرم افزار قادر به برقراری ارتباط با سرور نمی باشد.',
        color: 'info',
        title: 'عدم ارتباط',
        icon: 'alert-outline'
      })
      return Promise.resolve(false)
    } else {
      if (err.response.status === 401) {
        const mobile = app.$storage.getUniversal('mobile')
        const device = app.$ua.deviceType() + '-' + app.$ua.browser()
        return $axios.put('/register/renew-token', { mobile: mobile, device: device, customerChannel: "WEB" })
          .then(res => {
            app.$storage.removeUniversal('token')
            app.$storage.setUniversal('token', res.data.token)
            err.config.headers['Authorization'] = 'Bearer ' + res.data.token
            $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + res.data.token}
            return $axios.request(err.config)
          })
      } else {
        if (err.response.data.message !== '') {
          $notifier.showMessage({
            content: err.response.data.message,
            color: 'error',
            title: 'خطا',
            icon: 'alert-circle-outline'
          })
          return Promise.resolve(false)
        } else {
          $notifier.showMessage({
            content: 'متاسفانه نرم افزار قادر به برقراری ارتباط با سرور نمی باشد.',
            color: 'info',
            title: 'عدم ارتباط',
            icon: 'alert-outline'
          })
          return Promise.resolve(false)
        }
      }
    }
  })
}
