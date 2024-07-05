const DYNAMODB = {
  TRANSACTIONS_NO_MONETARY_DIGITALS_TABLE_NAME:
    process.env.TRANSACTIONS_NO_MONETARY_DIGITALS_TABLE_NAME || 'qa-digital-channels-non-monetary-transactions-v2',
} as const;

const environment = {
  DYNAMODB,
} as const;

export default environment;
