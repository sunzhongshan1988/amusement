import React from 'react';
import {
  IonContent,
  IonIcon,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import style from './RulePrize.module.scss'
import './RulePrize.module.scss'
import yidengjiang from '../images/yidengjiang.svg'
import erdengjiang from '../images/erdengjiang.svg'
import sandengjiang from '../images/sandengjiang.svg'
const RulePrize =  ({onDismiss, switchTab, tabName}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  switchTab: (tabName: string) => void;
  tabName: string;
}) => {
  const prizeList = [
    {
      level: '一等奖',
      name: '100元优惠券',
    },
    {
      level: '二等奖',
      name: '10元优惠券',
    },
    {
      level: '三等奖',
      name: '5元优惠券',
    },
    {
      level: '四等奖',
      name: '2元优惠券',
    }
  ]
  let blocks;
    if (tabName === 'rule') {
        blocks = <div>
                    <div className={style.block}>
            <div className={style.title}>互动奖品</div>
            <div>
              {prizeList.map((item, index) =>
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
                      <div>2022-08-02 11:24 至 2022-08-09 11:24</div>
                    </div>
                    <div className={style.block}>
                      <div className={style.title}>互动规则</div>
                      <div>
                        【玩法】点击中间按钮，转动大转盘即可抽奖；<br />
                        【场景】电商促销活动、现场抽奖互动；<br />
                        【用途】提升销售额、产品推广、店铺引流、品牌宣传。
                      </div>
                    </div>
                  </div>
    }else{
      blocks = <div></div>
    }
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
              {blocks}
            </div>
          </div>
        </IonContent>
  )
}
export default RulePrize;
