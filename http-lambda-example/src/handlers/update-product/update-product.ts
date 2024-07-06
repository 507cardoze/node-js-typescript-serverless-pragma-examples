import { responseHandler } from '@shared/common/response-handler';
import { LambdaHandler } from '@shared/interfaces/lambda-handler.type';
import environment from '@shared/environment';

export const handler: LambdaHandler = async (event, context) => {
  try {
    return responseHandler(null, { message: 'hola' }, environment.CODES.STATUS.ITEM_UPDATED);
  } catch (error) {
    return responseHandler(error);
  }
};
