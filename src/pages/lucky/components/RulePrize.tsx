import React, {useEffect} from 'react';
import {
  IonContent,
  IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import style from './RulePrize.module.scss'
import yidengjiang from '../images/yidengjiang.svg'
import erdengjiang from '../images/erdengjiang.svg'
import sandengjiang from '../images/sandengjiang.svg'
import moment from 'moment';
import {luckyWheelUserPrizeList} from '../../../service/lucky';
const RulePrize =  ({onDismiss, switchTab, tabName,  luckyData, amusementId, onClickPrize}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  switchTab: (tabName: string) => void;
  tabName: string;
  luckyData: any;
  amusementId: number;
  onClickPrize: (prize: any) => void;
}) => {

  const [prizeList, setPrizeList] = React.useState<any>([]);

  useEffect(() => {
    if (tabName === 'prize') {
      luckyWheelUserPrizeList({interactionId: +amusementId}).then((res: any) => {
        if (res.success) {
          setPrizeList(res.data);
        }
      })
    }
  }, [tabName])

  const ruleBlock = <div>
    <div className={style.block}>
      <div className={style.title}>互动奖品</div>
      <div>
        {luckyData.prize.map((item: any, index: number) =>
            <div className={`${style.item} ${index===0?style.bg1:index===1?style.bg2:index===2?style.bg3:style.bg4}`}
                 key={index}
            >
              {index===0 ? <img src={yidengjiang} alt=""/>
                  : index===1 ? <img src={erdengjiang} alt=""/>
                      : index===2 ? <img src={sandengjiang} alt=""/>:null
              }
              <div className={style.info}>
                <span>{item.level}</span>
                <span>{item.name}</span>
              </div>
            </div>
        )}
      </div>
    </div>
    <div className={style.block}>
      <div className={style.title}>互动时间</div>
      <div>{moment(luckyData.expirationStart).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(luckyData.expirationEnd).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </div>
    <div className={style.block}>
      <div className={style.title}>互动规则</div>
      <div>
        {luckyData.summary.split('\n')
          .map((e: string, index: number) => <span key={index}>{e} <br /></span>)
        }
      </div>
    </div>
  </div>

  const myPrizeBlock = <div>
    <div className={style.block}>
      <div className={style.title}></div>
        {prizeList && prizeList.map((item: any, index: number) =>
          <div className={`${style.item} ${index===0?style.bg1:index===1?style.bg2:index===2?style.bg3:style.bg4}`}
               key={index}
               onClick={() => onClickPrize(item)}
          >
            {item.index===1 ? <img src={yidengjiang} alt=""/>
              : item.index===2 ? <img src={erdengjiang} alt=""/>
                : item.index===3 ? <img src={sandengjiang} alt=""/>:null
            }
            <div className={style.info}>
              <span>{item.level}</span>
              <span>{item.name}</span>
            </div>
          </div>
        )}
    </div>
  </div>
  return (
        <IonContent>
          <div className={style.container}>
            <div className={style.content}>
              <div className={style.close}  onClick={() => onDismiss(null, 'cancel')}>
                <IonIcon icon={closeOutline}></IonIcon>
              </div>
              <div className={style.tab}>
                <span
                    onClick={() => switchTab('rule')}
                    className={tabName === 'rule' ? style.active : ''}
                >活动说明</span>
                <span
                    onClick={() => switchTab('prize')}
                    className={`${style.space} ${tabName === 'prize' ? style.active : ''}`}
                >我的奖品</span>
              </div>
              {tabName === 'rule' ? ruleBlock : myPrizeBlock}
            </div>
          </div>
        </IonContent>
  )
}
export default RulePrize;
