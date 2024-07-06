const DYNAMODB = {
  IS_OFFLINE: process.env.IS_OFFLINE === 'true',
  STAGE: process.env.STAGE || 'dev',
  PRODUCTS_TABLE_NAME: process.env.PRODUCTS_TABLE_NAME || 'dev-products-table',
  LOCAL_REGION: 'localhost',
  LOCAL_ENDPOINT: 'http://localhost:8000',
} as const;

const STATUS = {
  RESOURCE_NOT_FOUND: 'Resource Not Found',
  BAD_REQUEST: 'Bad Request',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  ITEM_INSERTED: 'Item Inserted',
  ITEM_MANAGED: 'Item Managed',
  SUCCESS: 'Success',
  ERROR: 'Error',
  ITEM_UPDATED: 'Item Updated',
  UNAHUTORIZED: 'Unauthorized',
} as const;

const STATUS_CODE = [
  {
    code: 200,
    message: STATUS.SUCCESS,
  },
  {
    code: 201,
    message: STATUS.ITEM_INSERTED,
  },
  {
    code: 400,
    message: STATUS.BAD_REQUEST,
  },
  {
    code: 401,
    message: STATUS.UNAHUTORIZED,
  },
  {
    code: 403,
    message: STATUS.UNAHUTORIZED,
  },
  {
    code: 404,
    message: STATUS.RESOURCE_NOT_FOUND,
  },
  {
    code: 500,
    message: STATUS.INTERNAL_SERVER_ERROR,
  },
] as const;

const CODES = {
  STATUS,
  STATUS_CODE,
} as const;

const environment = {
  DYNAMODB,
  CODES,
} as const;

export default environment;
