import React from 'react';
import {IonBackdrop} from '@ionic/react';
import imgAuthTips from './images/auth_wx_tips.png';

type Props = {
  type: 'wx-auth' | string;
  blur?: boolean;
}
const FullScreenTips: React.FC<Props> = (props) => {

  return (
    <>
      <IonBackdrop
        visible={true}
        style={{
          opacity: 0.2,
        }}
      />
      {props?.blur && <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          backdropFilter: 'blur(10px)',
          zIndex: 2,
        }}
      />}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 3,
        }}
      >
        {props.type === 'wx-auth' && <img src={imgAuthTips} alt=""/>}
      </div>
    </>
  )
}

export default FullScreenTips;
