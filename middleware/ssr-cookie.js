export default function({ app, $axios }) {

  if (app.$cookies.get('token') === undefined) {
    if (app.$cookies.get('localToken') !== undefined ) {
      app.$cookies.set('token', app.$cookies.get('localToken'),{ maxAge: 60 * 60 * 24 * 90 })
      app.$cookies.set('mobile', app.$cookies.get('localMobile'),{ maxAge: 60 * 60 * 24 * 90 })
    }
  }else{
    app.$cookies.set('localToken', app.$cookies.get('token'), {  path:"/" , httpOnly:true ,
     secure: true, domain:'hyperjet.ir', maxAge: 60 * 60 * 24 * 200
    })
    app.$cookies.set('localMobile', app.$cookies.get('mobile'), {path:"/" , httpOnly:true ,
      secure: true, domain:'hyperjet.ir',maxAge: 60 * 60 * 24 * 200
    })
  }

  if (app.$cookies.get('token') !== undefined)
    $axios.defaults.headers.common = { 'Authorization': 'Bearer ' +app.$cookies.get('token') }

}
