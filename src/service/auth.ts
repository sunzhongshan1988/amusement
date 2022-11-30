import axios from '../request/axios';

export async function getWxJsSdkSgin(data: any) {
  return axios
    .post(`/tenant/wechatusermanager/WxUserManager/getWxJsSdkSgin`, data)
    .then(response=> {
      if (response.data) {
        return response.data;
      }
    });
}

// 根据code获取用户信息
export async function codeToAccessToken(data: any) {
  return axios
    .post(`/tenant/wechatusermanager/WxUserManager/codeToAccessToken`, data)
    .then(response => {
      if (response.data) {
        return response.data;
      }
    });
}

// 保存用户信息
export async function saveUserInfo(data: any) {
  return axios
    .post(`/tenant/wechatusermanager/WxUserManager/saveUserInfo`, data)
    .then(response => {
      if (response.data) {
        return response.data;
      }
    }
  );
}

// 根据租户id查询appRel信息 包含appId
export async function getByTenantId(data: any) {
  return axios
    .post(`/tenant/bcgadm/biz/tenantAppRel/getByTenantId`, data)
    .then(response => {
        if (response.data) {
          return response.data;
        }
      }
    );
}
