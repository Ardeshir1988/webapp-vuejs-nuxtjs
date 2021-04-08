export default function({ app, $axios }) {

  if(app.$cookies.get('token') !== undefined){
    app.$cookies.set('token', app.$cookies.get('token'), {  path:"/" , httpOnly:true ,
      maxAge: 60 * 60 * 24 * 200
    })
  app.$cookies.set('token', app.$cookies.get('token'))
  }

  if(app.$cookies.get('mobile') !== undefined){
    app.$cookies.set('mobile', app.$cookies.get('mobile'), {path:"/" , httpOnly:true ,
      maxAge: 60 * 60 * 24 * 200
    })
  app.$cookies.set('mobile', app.$cookies.get('mobile'))
  }

  if (app.$cookies.get('token') !== undefined)
    $axios.defaults.headers.common = { 'Authorization': 'Bearer ' +app.$cookies.get('token') }

}
