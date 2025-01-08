import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {OrderProduct, OrderProductRelations, Order, Product} from '../models';
import {OrderRepository} from './order.repository';
import {ProductRepository} from './product.repository';

export class OrderProductRepository extends DefaultCrudRepository<
  OrderProduct,
  typeof OrderProduct.prototype.order_product_id,
  OrderProductRelations
> {

  public readonly orders: BelongsToAccessor<Order, typeof OrderProduct.prototype.order_product_id>;

  public readonly products: BelongsToAccessor<Product, typeof OrderProduct.prototype.order_product_id>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(OrderProduct, dataSource);
    this.products = this.createBelongsToAccessorFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', orderRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
