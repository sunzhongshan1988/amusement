import {getByTenantId} from './auth';

const {REACT_APP_SUB_PATH, REACT_APP_ENV} = process.env;

export const StorageKey = {
  userInfo: `${REACT_APP_SUB_PATH}_userInfo`,
  extraData: `${REACT_APP_SUB_PATH}_extraData`,
}

export function guid(split = '') {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      guid += split;
    }
  }
  return guid;
}

export function  isAndroidOrIOS() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return "android"
  }
  if (isiOS) {
    return "ios"
  }
  return false
}

export function  generateQuery(
  query?: ('tenantId' | 'appId')[],
  extraQuery?: { [key: string]: string | number | boolean },
) {
  let params = new URLSearchParams(document.location.search);
  let extraData = JSON.parse(localStorage.getItem(StorageKey.extraData) || '{}');

  let queryData: string[] = [];
  if (query) {
    query.forEach((item) => {
      queryData.push(`${item}=${params.get(item) || extraData[item]}`);
    });
  }
  if (extraQuery) {
    Object.keys(extraQuery).forEach((key) => {
      queryData.push(`${key}=${extraQuery[key]}`);
    });
  }

  return queryData.length > 0 ? `?${queryData.join('&')}` : '';
}

export function delay (ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(StorageKey.userInfo) || '{}');
}
export function setUserinfo(userInfo: any) {
  localStorage.setItem(StorageKey.userInfo, JSON.stringify(userInfo));
}

export function getExtraData() {
  return JSON.parse(localStorage.getItem(StorageKey.extraData) || '{}');
}

// 本地存储中是否存在用户信息
export function isUserInfo() {
  return !!localStorage.getItem(StorageKey.userInfo);
}

// 本地存储中是否存在微信公众号信息
export function isExtraData() {
  return !!localStorage.getItem(StorageKey.extraData);
}

export function getCommonSearch() {
  let extraData = JSON.parse(localStorage.getItem(StorageKey.extraData) || '{}');
  return `?tenantId=${extraData?.tenantId}`;
}

// Check user login status
export async function checkAuthAndNext() {
  if (window.location.pathname !== `/${REACT_APP_SUB_PATH}/auth`) {
    console.log('No user info, redirect to auth');
    await window.location.replace(`/${REACT_APP_SUB_PATH}/auth${window.location.search}`);
  }
}

// Go to 404 page
export function goTo404(msg = '暂无错误信息') {
  if (window.location.pathname !== `/${REACT_APP_SUB_PATH}/404`) {
    window.location.replace(`/${REACT_APP_SUB_PATH}/404?msg=${msg}`);
  }
}

export function checkParamsAndAuth() {

  if (window.location.pathname === `/${REACT_APP_SUB_PATH}/auth`
      || window.location.pathname === `/${REACT_APP_SUB_PATH}/404`
  ){
    return
  }

  localStorage.setItem('redirectUrl', window.location.href); // Save current url

  const params = new URLSearchParams(document.location.search);

  let extraData = {
    tenantId: params.get('tenantId'),
  }

  if (!extraData.tenantId) {
    goTo404('缺少公司信息');
    return;
  }


  console.log('extraData', extraData);

  let lsExtraData = getExtraData();

  // If LocalStorage has extraData, compare with current extraData
  if (!lsExtraData.tenantId || extraData.tenantId !== lsExtraData.tenantId) {
    getByTenantId({tenantId: extraData.tenantId}).then(async (res: API.Response) => {
      if (res.success && res.data) {
        await localStorage.setItem(StorageKey.extraData, JSON.stringify(Object.assign(extraData, res.data)));
        await localStorage.removeItem(StorageKey.userInfo);
        await checkAuthAndNext();
      } else {
        goTo404('获取公司信息失败')
      }
    });
  } else {
    if(!isUserInfo()) {
      console.log('No user info, redirect to auth');
      checkAuthAndNext();
    }
  }
}

// Testing and production environment use different config
type TypeConfigEnvDiff = {
  writeUserInfo: System.RuntimeEnv[];
  activeConsole: System.RuntimeEnv[];
}
export function ConfigEnvDiff(config: TypeConfigEnvDiff) {
  // Devolopment only
  if ( config.writeUserInfo.includes(REACT_APP_ENV as System.RuntimeEnv) && !isUserInfo()) {
    localStorage.setItem(StorageKey.userInfo,
      JSON.stringify({"id":746,
        "wechatId":null,
        "phone":"",
        "nickName":"孙文",
        "gender":"0",
        "city":"",
        "province":"",
        "country":"",
        "avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/yJnMJicStvXxicd5rfaE6dQhnfgm6CiaaCxkknCdRA0ES9wibYGRpBxjZClaoo7hEiazZPgWYabicjH6CGFknWmOib5Qw/132",
        "openId":"oMCyMs__9AsJMwJkJLzDSE0lTOdc",
        "unionId":"ojhP6w4ZUob2d0jsk8eGo2udM3EE",
        "tenantId":null,
        "uniqueKey":null,
        "agentName":null,
        "is_snapshotuser": null,
      })
    );
  }
  if (config.activeConsole.includes(REACT_APP_ENV as System.RuntimeEnv)) {
    // Load vConsole for debug
    const VConsole = require('vconsole');
    const vConsole = new VConsole({ theme: 'light' });
    vConsole.setOption('log.maxLogNumber', 5000);
    console.log('env:', REACT_APP_ENV);
  }
}

// Upload error to Aliyun ARMS
export function uploadErrorToArms(name: string, message: string) {
  // @ts-ignore
  window.__bl && __bl.error({name: name, message: message}, {
    filename: 'app.js',
    lineno: 0,
    colno: 0
  });
}
