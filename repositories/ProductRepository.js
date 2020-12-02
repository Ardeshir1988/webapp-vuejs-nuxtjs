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
  getSimilarProductsByProductId(productId, size, from) {
    return $axios.get(`${resource}/similar/${productId}?size=${size}&from=${from}`)
  },
  getOffProducts(size, from) {
    return $axios.get(`${resource}/off-products?size=${size}&from=${from}`)
  },
  getNewProducts(size, from) {
    return $axios.get(`${resource}/new-products?size=${size}&from=${from}`)
  },
  searchProducts(keyword, size, from) {
    return $axios.get(`${resource}/search?keyword=${keyword}&size=${size}&from=${from}`)
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
