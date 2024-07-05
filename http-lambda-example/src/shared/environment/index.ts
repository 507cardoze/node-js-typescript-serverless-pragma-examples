const DYNAMODB = {
  IS_OFFLINE: process.env.IS_OFFLINE === 'true',
  STAGE: process.env.STAGE || 'dev',
  USER_TABLE_NAME: process.env.USER_TABLE_NAME || 'dev-user-table',
} as const;

const environment = {
  DYNAMODB,
} as const;

export default environment;
