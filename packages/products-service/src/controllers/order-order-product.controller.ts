import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Order,
  OrderProduct,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderOrderProductController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Array of Order has many OrderProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderProduct>,
  ): Promise<OrderProduct[]> {
    return this.orderRepository.orderProducts(id).find(filter);
  }

  @post('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderProduct)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.order_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderProduct, {
            title: 'NewOrderProductInOrder',
            exclude: ['order_product_id'],
            optional: ['order_id']
          }),
        },
      },
    }) orderProduct: Omit<OrderProduct, 'order_product_id'>,
  ): Promise<OrderProduct> {
    return this.orderRepository.orderProducts(id).create(orderProduct);
  }

  @patch('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order.OrderProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderProduct, {partial: true}),
        },
      },
    })
    orderProduct: Partial<OrderProduct>,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return this.orderRepository.orderProducts(id).patch(orderProduct, where);
  }

  @del('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order.OrderProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return this.orderRepository.orderProducts(id).delete(where);
  }
}
