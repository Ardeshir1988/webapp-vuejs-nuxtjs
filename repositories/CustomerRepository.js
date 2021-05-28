const resource = '/customer'

export default ($axios) => ({
  getCustomerProfile() {
    return $axios.get(`${resource}/profile`)
  },
  updateProfile(customerProfileDto) {
    return $axios.put(`${resource}/profile`, customerProfileDto)
  },
  getAddresses() {
    return $axios.get(`${resource}/address`)
  },
  getAddressById(addressId) {
    return $axios.get(`${resource}/address/${addressId}`)
  },
  saveCustomerLog(details) {
    return $axios.post(`${resource}/customer_log/${details}`)
  },
  saveAddress(address) {
    return $axios.post(`${resource}/address`, address)
  },
  changeSelectedAddress(addressId) {
    return $axios.put(`${resource}/address/${addressId}/select`)
  },
  deleteSelectedAddress(addressId) {
    return $axios.delete(`${resource}/address/${addressId}`)
  },
  setNotifyInStock(productId){
    return $axios.put(`${resource}/notify/product/${productId}`)
  }
})
