export default function({ $axios, redirect, $notifier, app }) {
  $axios.onRequest(config => {

    // if (app.$storage.getCookie('token') !== null || app.$storage.getCookie('token') !== undefined ){
    //   $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + app.$storage.getCookie('token') }
    // }else if(app.$storage.getLocalStorage('token') !== null  || app.$storage.getLocalStorage('token') !== undefined ){
    //   $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + app.$storage.getLocalStorage('token') }
    //   app.$storage.setCookie('token', app.$storage.getLocalStorage('token') )
    // }
    console.log('Making request to ' + config.url + '-' + config.headers)
  })
  $axios.onError(err => {
    if (err.response === undefined) {
      $notifier.showMessage({ content: 'خطا در برقراری ارتباط با سرور', color: 'black' })
      return Promise.resolve(false)
    } else {
      if (err.response.status === 401) {
        const mobile = app.$storage.getLocalStorage('mobile')
        const device = app.$ua.deviceType() + '-' + app.$ua.browser()
        return $axios.put('/register/renew-token', { mobile: mobile, device: device, customerChannel: "WEB" })
          .then(res => {
            app.$storage.setUniversal('token', res.data.token)
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
