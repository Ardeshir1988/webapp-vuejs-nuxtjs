const resource = '/order'

export default ($axios) => ({
  checkoutOrder(orderDto) {
    return $axios.post(`${resource}`, orderDto)
  },
  getCheckedOutOrder(orderId){
    return $axios.put(`${resource}/order_checked_out/${orderId}`)
  },
  saveUnpaidOrder(orderDto) {
    return $axios.post(`${resource}/save_unpaid_order`, orderDto)
  },
  getCurrentOrders() {
    return $axios.get(`${resource}`)
  },
  getCurrentOrderDetail(trackingNumber) {
    return $axios.get(`${resource}/${trackingNumber}`)
  },
  getTransactions() {
    return $axios.get('/transaction?from=0&size=99')
  },
  getTransactionDetails(transactionId) {
    return $axios.get(`/transaction/${transactionId}`)
  },
  getPaymentToken(amount,transactionType) {
    return $axios.get(`/payment/get-payment-token?amount=${amount}&transaction-type=${transactionType}`)
  },
  saveOrderReview(orderReview){
    return $axios.put(`${resource}/review`, orderReview)
  },
  needOrderReview(trackingNumber){
    return $axios.get(`${resource}/review/${trackingNumber}`)
  }
})
