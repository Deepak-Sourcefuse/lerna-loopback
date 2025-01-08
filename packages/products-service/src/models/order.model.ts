import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {OrderProduct} from './order-product.model';
import {Customer} from './customer.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  order_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  orderDate: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;
  @hasMany(() => OrderProduct, {keyTo: 'order_id'})
  orderProducts: OrderProduct[];

  @belongsTo(() => Customer, {name: 'customer'})
  customer_id: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
