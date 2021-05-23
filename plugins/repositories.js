import createRepository from '~/repositories/Repository'

export default (ctx, inject) => {
  ctx.app.$storage.syncUniversal('token')
  if( ctx.app.$storage.getUniversal('token') !== null && ctx.app.$storage.getUniversal('token') !== undefined)
  ctx.$axios.defaults.headers.common = { 'Authorization': 'Bearer ' +  ctx.app.$storage.getUniversal('token')}

  inject('repositories', createRepository(ctx.$axios))
}
