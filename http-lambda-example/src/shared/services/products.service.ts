import { DatabaseService } from '@shared/services/database.service';
import { ProductValidatorService } from '@shared/services/product-validator.service';
import environment from '@shared/environment';
import { ProductKeySchema, ProductSchema } from '@shared/schemas/product.schema';
import generateUniqueKey from '@shared/common/generator';

export class ProductService extends ProductValidatorService {
  public async getProducts() {
    return await DatabaseService.getAllItems({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
    });
  }

  public async createProduct(product: ProductSchema) {
    return await DatabaseService.putItem({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
      Item: {
        product_id: {
          S: generateUniqueKey(),
        },
        email: {
          S: product.email,
        },
        display_name: {
          S: product.display_name,
        },
      },
    });
  }

  public async getProduct(productId: ProductKeySchema) {
    return await DatabaseService.getItem({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
      Key: {
        product_id: {
          S: productId,
        },
      },
    });
  }

  public async deleteProduct(productId: ProductKeySchema) {
    return await DatabaseService.deleteItem({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
      Key: {
        product_id: {
          S: productId,
        },
      },
    });
  }

  public async updateProduct(productId: ProductKeySchema, product: ProductSchema) {
    return await DatabaseService.putItem({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
      Item: {
        product_id: {
          S: productId,
        },
        email: {
          S: product.email,
        },
        display_name: {
          S: product.display_name,
        },
      },
    });
  }

  public async getProductById(productId: ProductKeySchema) {
    return await DatabaseService.getItem({
      TableName: environment.DYNAMODB.PRODUCTS_TABLE_NAME,
      Key: {
        product_id: {
          S: productId,
        },
      },
    });
  }
}
