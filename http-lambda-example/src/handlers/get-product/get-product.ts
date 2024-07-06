import { responseHandler } from '@shared/common/response-handler';
import { LambdaHandler } from '@shared/interfaces/lambda-handler.type';
import environment from '@shared/environment';
import { ProductService } from '@shared/services/products.service';
import { ProductsController } from '@shared/controllers/products.controller';

export const handler: LambdaHandler = async (event) => {
  try {
    const service = new ProductService();
    const controller = new ProductsController(service);

    const product = await controller.getProduct(event.path.product_id);

    return responseHandler(null, product, environment.CODES.STATUS.SUCCESS);
  } catch (error) {
    return responseHandler(error);
  }
};
