import React from 'react';
import style from './Winning.module.scss';
import { closeOutline } from 'ionicons/icons';
import {IonIcon} from '@ionic/react';
const Winning =  ({onDismiss,prize}: {
  prize: any;
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
                {prize?.level}
              </div>
              <div className={style.name}>
                {prize?.name}
              </div>
            </div>
            <div className={style.footer}>
              <div className={style.btn1}>
                <button onClick={() => onDismiss(null, 'detail')}>查看详情</button>
              </div>
              <div className={style.btn2}>
                <button onClick={() => onDismiss(null, 'again')}>再玩一次</button>
              </div>
            </div>
         </div>
        </div>
  );
}
export default Winning;
