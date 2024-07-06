import environment from '@shared/environment';

const { STATUS } = environment.CODES;

type ValueOf<T> = T[keyof T];

type IStatusDetail = ValueOf<typeof STATUS>;

export type IResponse = {
  statusCode: number;
  body: string;
};

export type LambdaResponseType = (
  error: Record<string, any> | string | unknown | null,
  successBody?: Record<string, any> | string | null | unknown,
  statusDetail?: IStatusDetail
) => IResponse;
