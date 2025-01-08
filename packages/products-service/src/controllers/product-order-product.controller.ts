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
  Product,
  OrderProduct,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOrderProductController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/order-products', {
    responses: {
      '200': {
        description: 'Array of Product has many OrderProduct',
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
    return this.productRepository.orderProducts(id).find(filter);
  }

  @post('/products/{id}/order-products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderProduct)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderProduct, {
            title: 'NewOrderProductInProduct',
            exclude: ['order_product_id'],
            optional: ['product_id']
          }),
        },
      },
    }) orderProduct: Omit<OrderProduct, 'order_product_id'>,
  ): Promise<OrderProduct> {
    return this.productRepository.orderProducts(id).create(orderProduct);
  }

  @patch('/products/{id}/order-products', {
    responses: {
      '200': {
        description: 'Product.OrderProduct PATCH success count',
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
    return this.productRepository.orderProducts(id).patch(orderProduct, where);
  }

  @del('/products/{id}/order-products', {
    responses: {
      '200': {
        description: 'Product.OrderProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return this.productRepository.orderProducts(id).delete(where);
  }
}
