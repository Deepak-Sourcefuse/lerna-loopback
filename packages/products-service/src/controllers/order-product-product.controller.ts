import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderProduct,
  Product,
} from '../models';
import {OrderProductRepository} from '../repositories';

export class OrderProductProductController {
  constructor(
    @repository(OrderProductRepository)
    public orderProductRepository: OrderProductRepository,
  ) { }

  @get('/order-products/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to OrderProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.number('id') id: typeof OrderProduct.prototype.order_product_id,
  ): Promise<Product> {
    return this.orderProductRepository.products(id);
  }
}
