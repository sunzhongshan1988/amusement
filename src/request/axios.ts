import axios from "axios";
import {Md5} from 'ts-md5';
import {getExtraData, getUserInfo} from '../service/utils';

const { REACT_APP_ENV, REACT_APP_API_URL } = process.env;

const instance = axios.create({
  timeout: 10000,
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const adminSignKV = {
  dev: 'f417718d1eef3dcaae6e0e06e294c760',
  test: 'f417718d1eef3dcaae6e0e06e294c760',
  prod: '30b877a8e7b9d00e603c20c4cffb043c'
}
//
const getSign = (params: any, env: 'dev' | 'test'| 'prod') => {
  const signKey = env ? adminSignKV[env] : adminSignKV['dev'];
  let signParams: string[] = [];
  const paramsObj = Object.assign({}, params.baseParams, params.signParams);
  Object.keys(paramsObj).sort().forEach((key) => {
    if(['string', 'number', 'boolean'].includes(typeof(paramsObj[key])) && paramsObj[key] !== '') {
      signParams.push(`${key}=${paramsObj[key]}`);
    }
  });
  return  Md5.hashStr(signParams.join('&') + signKey + params.timeStamp);
}
// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    let { url } = config;

    const baseParams = {
      sessionId:"b0168bd411fa860ea7ad0781c3c9bab1",
      channel:"h5",
      source:"1"
    }
    let userInfo = getUserInfo();
    let extraData = getExtraData();
    const payload = {
      baseParams: {...baseParams},
      signParams:{
        staff:{
          platform:"tenantBga"
        },
        token: userInfo?.token || '',
        tenantId: extraData?.tenantId || '',
        openId: userInfo?.openId || '',
        ...config.data
      },
      timeStamp: Date.now(),
      sign:""
    }

    payload.sign = getSign(payload, REACT_APP_ENV as any);
    config.data = payload;

    return { ...config, url };
  },
  error => {
    Promise.reject(error)
  }
)


export default instance;
