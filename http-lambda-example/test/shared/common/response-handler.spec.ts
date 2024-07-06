import { responseHandler } from '@shared/common/response-handler';
import environment from '@shared/environment';

describe('responseHandler', () => {
  test('should respond with status code 200 when no arguments', () => {
    const response = responseHandler(null);

    expect(response.statusCode).toBe(200);
  });

  test('should respond with status code 200 when no body', () => {
    const response = responseHandler(null, null, environment.CODES.STATUS.SUCCESS);

    expect(response.statusCode).toBe(200);
  });
});
