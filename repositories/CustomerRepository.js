const resource = '/customer'

export default ($axios) => ({
  getCustomerProfile() {
    return $axios.get(`${resource}/profile`)
  },
  setNotificationIfProductIsInStock(productId) {
    return $axios.get(`${resource}/notify/product/${productId}`)
  },
  updateProfile(customerProfileDto) {
    return $axios.put(`${resource}/profile`, customerProfileDto)
  }
})
