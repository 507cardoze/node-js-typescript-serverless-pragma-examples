import { LambdaResponseType } from '@shared/interfaces/response-handler.type';
import environment from '@shared/environment';

export const responseHandler: LambdaResponseType = (error, successBody, statusDetail) => {
  if (error instanceof Error) {
    const status = environment.CODES.STATUS_CODE.find((s) => s.message === error.message);

    if (!status) {
      return {
        statusCode: environment.CODES.DEFAULT_ERROR_STATUS_CODE,
        body: JSON.stringify({
          detail: error.message,
        }),
      };
    }

    return {
      statusCode: status.code,
      body: JSON.stringify({
        detail: status.message,
      }),
    };
  }

  const status = environment.CODES.STATUS_CODE.find((s) => s.message === statusDetail);

  if (!status) {
    return {
      statusCode: environment.CODES.DEFAULT_SUCCESS_STATUS_CODE,
      body: JSON.stringify({
        detail: statusDetail,
        data: successBody || {},
      }),
    };
  }

  return {
    statusCode: status.code,
    body: JSON.stringify({ detail: status.message, data: successBody || {} }),
  };
};
