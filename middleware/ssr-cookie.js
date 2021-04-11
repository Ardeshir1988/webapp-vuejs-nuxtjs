export default function({ app, $axios }) {
  if (app.$storage.getCookie('token') !== undefined ){
     $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + app.$storage.getCookie('token') }
  }
}
