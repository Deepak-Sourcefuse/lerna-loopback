import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';
import {Product} from './product.model';

@model()
export class OrderProduct extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  order_product_id?: number;
  @belongsTo(() => Order, {name: 'orders'})
  order_id: number;

  @belongsTo(() => Product, {name: 'products'})
  product_id: number;

  constructor(data?: Partial<OrderProduct>) {
    super(data);
  }
}

export interface OrderProductRelations {
  // describe navigational properties here
}

export type OrderProductWithRelations = OrderProduct & OrderProductRelations;
