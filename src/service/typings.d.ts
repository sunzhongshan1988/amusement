// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Response = {
    code: number;
    /** 业务约定的错误码 */
    resultCode: string;
    /** 业务上的错误信息 */
    showMsg?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
    data: any;
  };

}

declare namespace System {
  type RuntimeEnv = 'dev' | 'test' | 'prod';
}
