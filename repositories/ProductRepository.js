const resource = '/product'


export default ($axios) => ({

  homepage() {
    return $axios.get('/home-page')
  },
  getProductsByCategoryIdAndTypeId(categoryId, typeId) {
    return $axios.get(`${resource}/category/${categoryId}?typeId=${typeId}`)
  },
  getTypesByCategoryId(categoryId) {
    return $axios.get(`${resource}/category/${categoryId}/type`)
  },

  show(id) {
    return $axios.get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.delete(`${resource}/${id}`)
  }
})
