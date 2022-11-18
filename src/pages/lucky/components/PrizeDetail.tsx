import React from 'react';
import style from './PrizeDetail.module.scss'
import qrcode from '../images/qrcode.png'
import {IonButtons,IonButton, IonContent, IonIcon, IonToolbar} from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
import moment from 'moment';
const PrizeDetail = ({onDismiss, prize}: {
  prize: any;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {

  return (
        <IonContent>
          <IonToolbar id={style.toolBar}>
            <IonButtons slot="end">
              <IonButton onClick={() => onDismiss(null, 'cancel')}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <div className={style.container}>
            <div className={style.prize}>
              <div>{prize?.level}</div>
              <div className={style.name}>
                {prize?.name}
              </div>
            </div>
            <div className={style.detail}>
              <div className={style.title}>兑奖详情</div>
              <div className={style.item}>
                <div className={style.name}>兑奖码</div>
                <div className={style.content}>✱✱✱✱✱✱</div>
              </div>
              <div className={style.item}>
                <div className={style.name}></div>
                <div className={style.content}>
                  <img src={qrcode} alt=""/>
                </div>
              </div>
              <div className={style.item}>
                <div className={style.name}>兑奖期限</div>
                <div className={style.content}>{moment(prize?.redeemExpirationEnd).format('yyyy-MM-dd HH:mm:ss')} 至 {moment(prize?.redeemExpirationStart).format('yyyy-MM-dd HH:mm:ss')}</div>
              </div>
              <div className={style.item}>
                <div className={style.name}>兑奖地址</div>
                <div className={style.content}>{prize?.redeemAddress}</div>
              </div>
              <div className={style.item}>
                <div className={style.name}>兑奖须知</div>
                <div className={style.content}>{prize?.redeemNote}</div>
              </div>
            </div>
          </div>
        </IonContent>
  )
}

export default PrizeDetail;
