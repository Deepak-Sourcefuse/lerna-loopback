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
  Order,
} from '../models';
import {OrderProductRepository} from '../repositories';

export class OrderProductOrderController {
  constructor(
    @repository(OrderProductRepository)
    public orderProductRepository: OrderProductRepository,
  ) { }

  @get('/order-products/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Order),
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.number('id') id: typeof OrderProduct.prototype.order_product_id,
  ): Promise<Order> {
    return this.orderProductRepository.orders(id);
  }
}
