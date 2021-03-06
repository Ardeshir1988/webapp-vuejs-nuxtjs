import createRepository from '~/repositories/Repository'

export default (ctx, inject) => {

  ctx.app.$storage.syncUniversal('token')
  if( ctx.app.$storage.getUniversal('token') !== null && ctx.app.$storage.getUniversal('token') !== undefined)
    ctx.$axios.defaults.headers.common = { 'Authorization': 'Bearer ' +  ctx.app.$storage.getUniversal('token')}

  inject('repositories', createRepository(ctx.$axios))


  if( ctx.app.$storage.getUniversal('token') !== null && ctx.app.$storage.getUniversal('token') !== undefined)
    ctx.$repositories.customer.saveCustomerLog("WEBAPP") .catch(function (error) {
    })

  ctx.$repositories.product.getInstructions().then( res => {
    if (res !== false){
      ctx.store.dispatch('instruction/load_sys_instruction', res.data)
    }
  })

  ctx.$repositories.product.homepage().then( res => {
    if (res !== false) {
      ctx.store.dispatch('instruction/load_home_instruction', res.data)
    }
  })
}
