import ProductRepository from '~/repositories/ProductRepository'
import CustomerRepository from '@/repositories/CustomerRepository'
import RegisterRepository from '@/repositories/RegisterRepository'

export default ($axios) => ({
  product: ProductRepository($axios),
  customer: CustomerRepository($axios),
  register: RegisterRepository($axios)
})
