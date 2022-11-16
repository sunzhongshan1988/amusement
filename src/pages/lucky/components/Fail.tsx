import React from 'react';
import style from './Fail.module.scss';
import {IonIcon} from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
const Fail = ({onDismiss,}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {

  return (
    <div className={style.container}>
      <div className={style.modal}>
        <div className={style.close}>
          <IonIcon
              icon={closeOutline}
              onClick={() => onDismiss(null, 'cancel')}
          ></IonIcon>
        </div>
        <div className={style.content}>
          <div className={style.level}>
            差一点就中奖了
          </div>
          <div className={style.name}>
            再接再厉
          </div>
        </div>
        <div className={style.footer}>
          <div className={style.btn}>
            <button onClick={() => onDismiss(null, 'cancel')}>再玩一次</button>
            <button
                className={style.style2}
                onClick={() => onDismiss(null, 'cancel')}
            >马上关注</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Fail;
