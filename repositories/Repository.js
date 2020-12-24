import ProductRepository from '~/repositories/ProductRepository'
import CustomerRepository from '@/repositories/CustomerRepository'
import RegisterRepository from '@/repositories/RegisterRepository'
import OrderRepository from '@/repositories/OrderRepository'

export default ($axios) => ({
  product: ProductRepository($axios),
  customer: CustomerRepository($axios),
  register: RegisterRepository($axios),
  order: OrderRepository($axios)
})
