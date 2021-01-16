const resource = '/register'

export default ($axios) => ({
  registerMobile(mobileDto) {
    return $axios.post(`${resource}`, mobileDto)
  },
  sendOtp(otp) {
    return $axios.put(`${resource}`, otp)
  },
  resendOtp() {
    return $axios.post(`${resource}/resend-otp`)
  }
})
