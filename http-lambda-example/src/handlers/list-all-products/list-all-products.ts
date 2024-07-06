import { responseHandler } from '@shared/common/response-handler';
import { LambdaHandler } from '@shared/interfaces/lambda-handler.type';
import environment from '@shared/environment';
import { ProductService } from '@shared/services/products.service';
import { ProductsController } from '@shared/controllers/products.controller';

export const handler: LambdaHandler = async () => {
  try {
    const service = new ProductService();
    const controller = new ProductsController(service);

    const products = await controller.getProducts();

    return responseHandler(null, products, environment.CODES.STATUS.SUCCESS);
  } catch (error) {
    return responseHandler(error);
  }
};
