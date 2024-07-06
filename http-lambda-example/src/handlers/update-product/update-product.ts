import { responseHandler } from '@shared/common/response-handler';
import { LambdaHandler } from '@shared/interfaces/lambda-handler.type';
import environment from '@shared/environment';
import { ProductService } from '@shared/services/products.service';
import { ProductsController } from '@shared/controllers/products.controller';

export const handler: LambdaHandler = async (event) => {
  try {
    const service = new ProductService();
    const controller = new ProductsController(service);

    const product_id = await controller.updateProduct(event.path.product_id, event.body);

    return responseHandler(null, { product_id }, environment.CODES.STATUS.ITEM_UPDATED);
  } catch (error) {
    return responseHandler(error);
  }
};
