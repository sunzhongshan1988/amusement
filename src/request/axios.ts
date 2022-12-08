import axios from "axios";
import {Md5} from 'ts-md5';
import {getExtraData, getUserInfo, removeUserInfo, setUserinfo} from '../service/utils';

const { REACT_APP_ENV, REACT_APP_API_URL } = process.env;

const instance = axios.create({
  timeout: 10000,
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const tenantSignKV = {
  dev: 'f417718d1eef3dcaae6e0e06e294c760',
  test: 'f417718d1eef3dcaae6e0e06e294c760',
  prod: '30b877a8e7b9d00e603c20c4cffb043c'
}
const customerSignKV = {
  dev: 'e62f2d023cd428bea303c488880d85da',
  test: 'e62f2d023cd428bea303c488880d85da',
  prod: 'cf53933467389a55ad5def2c5c86d3fd'
}
//
const getSign = (params: any, env: 'dev' | 'test'| 'prod', gateway: 'tenant' | 'customer') => {
  let signKey = '';
  if (gateway === 'tenant') {
    signKey = env ? tenantSignKV[env] : tenantSignKV['dev'];
  } else {
    signKey = env ? customerSignKV[env] : customerSignKV['dev'];
  }

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
        userName: userInfo?.nickName || '',
        avatarUrl: userInfo?.avatarUrl || '',
        ...config.data
      },
      timeStamp: Date.now(),
      sign:""
    }

    if (url?.match(/^\/tenant\//)) {
      payload.sign = getSign(payload, REACT_APP_ENV as any, 'tenant');
    } else {
      payload.sign = getSign(payload, REACT_APP_ENV as any, 'customer');
    }

    config.data = payload;

    return { ...config, url };
  },
  error => {
    Promise.reject(error)
  }
)


export default instance;
