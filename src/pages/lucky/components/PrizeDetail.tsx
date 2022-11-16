import React from 'react';
import style from './PrizeDetail.module.scss'
import qrcode from '../images/qrcode.png'
import {IonButtons,IonButton, IonContent, IonIcon, IonToolbar} from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
const PrizeDetail = ({onDismiss,}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {
  return (
        <IonContent>
          <IonToolbar id={style.toolBar}>
            <IonButtons slot="start">
              <IonButton onClick={() => onDismiss(null, 'cancel')}>
                <IonIcon slot="icon-only" icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <div className={style.container}>
            <div className={style.prize}>
              <div>一等奖</div>
              <div className={style.name}>
                200元现金红包
              </div>
            </div>
            <div className={style.detail}>
              <div className={style.title}>兑奖详情</div>
              <div className={style.item}>
                <div className={style.name}>兑奖码</div>
                <div className={style.content}>***********</div>
              </div>
              <div className={style.item}>
                <div style={{textAlign:'center'}}>
                  <img src={qrcode} alt=""/>
                </div>
              </div>
              <div className={style.item}>
                <div className={style.name}>兑奖期限</div>
                <div className={style.content}>2022-08-02 11:24 至 2022-08-09 11:24</div>
              </div>
              <div className={style.item}>
                <div className={style.name}>兑奖须知</div>
                <div className={style.content}>请保证获奖数据真实有效</div>
              </div>
            </div>
          </div>
        </IonContent>
  )
}

export default PrizeDetail;
