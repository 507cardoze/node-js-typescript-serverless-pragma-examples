import { IResponse } from '@shared/interfaces/response-handler.type';

type CognitoPoolClaims = {
  sub: string;
};

type EnhancedAuthContext = {
  principalId: string;
};

type Headers = {
  'User-Agent': string;
  Accept: string;
  Host: string;
  'Accept-Encoding': string;
  Connection: string;
};

type Identity = {
  accountId: string;
  apiKey: string;
  apiKeyId: string;
  caller: string;
  cognitoAuthenticationProvider: string;
  cognitoAuthenticationType: string;
  sourceIp: string;
  user: string;
  userAgent: string;
  userArn: string;
};

type IEvent = {
  body: any;
  method: string;
  principalId: string;
  stage: string;
  cognitoPoolClaims: CognitoPoolClaims;
  enhancedAuthContext: EnhancedAuthContext;
  headers: Headers;
  query: any;
  path: any;
  identity: Identity;
  stageVariables: any;
  requestPath: string;
};

type IContext = {
  awsRequestId: string;
  callbackWaitsForEmptyEventLoop: boolean;
  clientContext: null;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  logGroupName: string;
  logStreamName: string;
  memoryLimitInMB: string;
};

export type LambdaHandler = (event: IEvent, context: IContext) => Promise<IResponse>;
