import { IonPage, useIonViewWillEnter} from '@ionic/react';
import React, {useRef} from 'react';
import {codeToAccessToken, getByTenantId, saveUserInfo} from '../../service/auth';
import {getExtraData, goTo404, setUserinfo} from '../../service/utils';
import useAuth from '../../hooks/useAuth';
import {useHistory} from 'react-router-dom';

const WXAuth: React.FC = () => {
  const {REACT_APP_SUB_PATH} = process.env;
  const {user, extraData, setUserState } = useAuth();
  const params = new URLSearchParams(window.location.search);
  let history = useHistory();

  useIonViewWillEnter( () => {
    let code = params.get('code');
    if (code) {
      console.log('code:', code);
      code && getAccessToken(code);
    } else {
      openWxAuth();
      console.log('Redirect to weixin auth');
    }
  }, []);

  const getAccessToken = async (code: string) => {
    await codeToAccessToken({
      code: code,
      appId: extraData.appId,
    })
      .then(async (res: API.Response) => {
        console.log('res', res);
        if (res.success && res.data.userInfo) {
          await setUserState(res.data.userInfo);
          await saveUserToServer(res.data.userInfo);
          await setUserinfo(res.data.userInfo);
          if (params.get('rUrl')) {
            let url = new URL(params.get('rUrl') || '');
            history.replace({
              pathname: url.pathname.replace(`/${REACT_APP_SUB_PATH}`, ''),
              search: url.search,
            })
          } else {
            goTo404('未知源页面进入'+ await localStorage.getItem('redirectUrl'));
          }
        }
      })
      .catch(async (err: Error) => {
        console.log('err', err);
        alert(err)
      });
  }

  const saveUserToServer = (userInfo: any) => {
    saveUserInfo({
      appid:  extraData.appId,
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
    // Force open snapshot page auth "&forcePopup=true&forceSnapShot=true"
    let openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ extraData.appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
    window.location.replace(openUrl);
  }
  return (
    <IonPage>
    </IonPage>
  )
}

export default WXAuth
