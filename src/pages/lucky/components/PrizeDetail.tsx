import React from 'react';
import style from './PrizeDetail.module.scss'
import qrcode from '../images/qrcode.png'
import {IonButtons, IonButton, IonContent, IonIcon, IonToolbar, IonChip} from '@ionic/react';
import {closeOutline} from 'ionicons/icons';
import moment from 'moment';
import QRCode from "react-qr-code";

const PrizeDetail = ({onDismiss, prize}: {
  prize: any;
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
}) => {

  const giftAndCoupon =  (
    <>
      <div className={style.item}>
        <div className={style.name}>兑奖码</div>
        <div className={style.content}>{prize?.exchangeCode}</div>
      </div>
      <div className={style.item}>
        <div className={style.name}></div>
        <div
          className={style.content}
          style={{border: '1px solid #fff'}}
        >
          <QRCode
            value={`${prize?.exchangeCode}`}
            size={192}
          />
        </div>
      </div>
      <div className={style.item}>
        <div className={style.name}>兑奖期限</div>
        <div className={style.content}>{moment(prize?.redeemExpirationEnd).format('yyyy-MM-DD HH:mm:ss')} 至 {moment(prize?.redeemExpirationStart).format('yyyy-MM-DD HH:mm:ss')}</div>
      </div>
      <div className={style.item}>
        <div className={style.name}>兑奖地址</div>
        <div className={style.content}>{prize?.redeemAddress}</div>
      </div>
    </>
  )
  const redPacket = (
    <>
      <div className={style.item}>
        <div className={style.name}>红包状态</div>
        <div className={style.content}>
          {
            // 0 - 未发放，1 - 已发放， 2 - 发放异常
            prize?.status === 0
              ? <IonChip outline={true}>未发放</IonChip>
              : prize?.status === 1
                ? <IonChip outline={true} color="success">已发放</IonChip>
                : <IonChip outline={true} color="danger">发放异常</IonChip>
          }
        </div>
      </div>
    </>
  )

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
              {prize?.type === 3 ? redPacket : giftAndCoupon }
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
