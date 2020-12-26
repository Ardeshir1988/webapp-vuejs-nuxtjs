const resource = '/order'

export default ($axios) => ({
  checkoutOrder(orderDto) {
    return $axios.post(`${resource}`, orderDto)
  },
  getCurrentOrders() {
    return $axios.get(`${resource}`)
  }
})
