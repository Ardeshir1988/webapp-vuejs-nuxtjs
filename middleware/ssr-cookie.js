export default function({ app, req, $axios }) {
  if (process.server){
    if(req.headers.cookie !==undefined)
    $axios.defaults.headers.common = { 'Authorization': 'Bearer ' + req.headers.cookie.substr(6) }
  }
  else {
    const c = app.$cookies.get('token')
    console.log(c)
    console.log('sssr')
    if (c !== undefined)
    $axios.setHeader('Authorization', 'Bearer ' + c)
  }
}
