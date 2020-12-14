import ProductRepository from '~/repositories/ProductRepository'
import CustomerRepository from '@/repositories/CustomerRepository'

export default ($axios) => ({
  product: ProductRepository($axios),
  customer:CustomerRepository($axios)
})
