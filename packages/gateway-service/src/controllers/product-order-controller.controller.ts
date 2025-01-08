import {get, param} from '@loopback/rest';
import axios from 'axios';

export class ProductOrderController {
  @get('/product-with-orders/{id}')
  async getProductWithOrders(
    @param.path.string('id') id: string,
  ){
    try {
      // Fetch product details from product-service
      const product = await axios.get(`http://localhost:3001/products/${id}`);
      
      return {
        product: product.data
      };
    } catch (error) {
      return {
        error: 'Failed to fetch data',
        message: error.message,
      };
    }
  }
}
