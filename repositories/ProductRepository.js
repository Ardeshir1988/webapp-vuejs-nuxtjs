const resource = '/product'


export default ($axios) => ({

  homepage() {
    return $axios.get('/home-page')
  },
  getProductsByCategoryIdAndTypeId(categoryId, typeId, from) {
    return $axios.get(`${resource}/category/${categoryId}?type-id=${typeId}&size=30&from=${from}`)
  },
  getTypesByCategoryId(categoryId) {
    return $axios.get(`${resource}/category/${categoryId}/type`)
  },
  getSimilarProductsByProductId(productId) {
    return $axios.get(`${resource}/similar/${productId}`)
  },

  getProductById(productId) {
    return $axios.get(`${resource}/${productId}`)
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
