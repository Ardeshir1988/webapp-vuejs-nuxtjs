const resource = '/order'

export default ($axios) => ({
  checkoutOrder(orderDto) {
    return $axios.post(`${resource}`, orderDto)
  },
  getCurrentOrders() {
    return $axios.get(`${resource}`)
  },
  getCurrentOrderDetail(trackingNumber) {
    return $axios.get(`${resource}/${trackingNumber}`)
  },
  getTransactions() {
    return $axios.get('/transaction')
  },
  getTransactionDetails(transactionId) {
    return $axios.get(`/transaction/${transactionId}`)
  }
})
