import { IonPage, useIonViewWillEnter} from '@ionic/react';
import React from 'react';
import {codeToAccessToken, saveUserInfo} from '../../service/auth';
import {getExtraData, goTo404, setUserinfo} from '../../service/utils';

const WXAuth: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  let extraData = getExtraData();
  console.log('extraData', extraData);
  // useEffect(() => {
  //   let code = params.get('code');
  //   if (code) {
  //     console.log('code:', code);
  //     getUserInfo(code);
  //     presentToast('top', 'code:' + code);// debug code
  //   } else {
  //     openWxAuth();
  //     console.log('Redirect to weixin auth');
  //   }
  // });
  useIonViewWillEnter( () => {
    let code = params.get('code');
    if (code) {
      console.log('code:', code);
      code && getUserInfo(code);
    } else {
      openWxAuth();
      console.log('Redirect to weixin auth');
    }
  });

  const getUserInfo = (code: string) => {
    codeToAccessToken({
      code: code,
      appId: extraData.appId,
    })
      .then(async (res: API.Response) => {
        console.log('res', res);

        if (res.success && res.data.userInfo) {
          await saveUserToServer(res.data.userInfo);
          await setUserinfo(res.data.userInfo);

          // if (params.get('step') || params.get('answerId')) {
          //   history.replace({
          //       pathname: '/ai-diagnosis/report',
          //       search: `?answerId=${params.get('answerId')}&step=3&tenantId=${params.get('tenantId')}`,
          //     });
          // } else {
          //   history.replace({
          //     pathname: '/ai-diagnosis/home',
          //     search: getCommonSearch(),
          //   });
          // }
          if (localStorage.getItem('redirectUrl')) {
            window.location.replace(localStorage.getItem('redirectUrl') || '');
          } else {
            goTo404('未知源页面进入');
          }
          localStorage.removeItem('redirectUrl'); // Remove redirectUrl after use
        }
      })
      .catch(async (err: Error) => {
        console.log('err', err);
        alert(err)
      });
  }

  const saveUserToServer = (userInfo: any) => {
    saveUserInfo({
      appid: extraData.appId,
      openid: userInfo.openId,
      unionid: userInfo.unionId,
      phone: userInfo.phone || '',
      nickName: userInfo.nickName || '',
      gender: userInfo.gender || 0,
      city: userInfo.city || '',
      province: userInfo.province || '',
      country: userInfo.country || '',
      avatarUrl: userInfo.avatarUrl || '',
    })
      .then((res: API.Response) => {
        console.log('saveUserInfo', res)
      })
  }

  const openWxAuth = () => {
    let redirectUrl = encodeURIComponent(window.location.href);
    let openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${extraData.appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
    window.location.replace(openUrl);
  }
  return (
    <IonPage>
    </IonPage>
  )
}

export default WXAuth
