export default function({ app, $axios }) {
    $axios.defaults.headers.common = { 'Authorization': 'Bearer ' +app.$cookies.get('token') }
}
