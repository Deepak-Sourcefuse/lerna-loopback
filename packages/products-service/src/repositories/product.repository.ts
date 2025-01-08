import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlconnectionDataSource} from '../datasources';
import {Product, ProductRelations, OrderProduct} from '../models';
import {OrderProductRepository} from './order-product.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.product_id,
  ProductRelations
> {

  public readonly orderProducts: HasManyRepositoryFactory<OrderProduct, typeof Product.prototype.product_id>;

  constructor(
    @inject('datasources.mysqlconnection') dataSource: MysqlconnectionDataSource, @repository.getter('OrderProductRepository') protected orderProductRepositoryGetter: Getter<OrderProductRepository>,
  ) {
    super(Product, dataSource);
    this.orderProducts = this.createHasManyRepositoryFactoryFor('orderProducts', orderProductRepositoryGetter,);
  }
}
