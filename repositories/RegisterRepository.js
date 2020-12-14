const resource = '/register'

export default ($axios) => ({
  registerMobile(mobileDto) {
      return $axios.post(`${resource}`, mobileDto)
  }
})
