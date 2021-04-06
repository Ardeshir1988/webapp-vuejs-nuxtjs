export default function({ app, $axios }) {
  if (app.$cookies.get('token') !== undefined)
    $axios.defaults.headers.common = { 'Authorization': 'Bearer ' +app.$cookies.get('token') }
}
