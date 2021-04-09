export default function({ app, $axios }) {
  if (app.$storage.getCookie('token') !== undefined ){
     $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + app.$storage.getCookie('token') }
  }else {
    if (app.$storage.getUniversal('token') !== null &&  app.$storage.getUniversal('token') !== undefined) {
      app.$storage.setCookie('token', app.$storage.getLocalStorage('token'))
      app.$storage.setCookie('mobile', app.$storage.getLocalStorage('mobile'))
    }
  }
}
