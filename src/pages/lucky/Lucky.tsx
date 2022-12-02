import {
  IonContent,
  IonPage,
  useIonAlert,
  useIonModal,
  useIonViewDidEnter, useIonViewWillEnter,
} from '@ionic/react';
import style from './Lucky.module.scss';
// @ts-ignore
import {LuckyWheel} from '@lucky-canvas/react'
import React, {useEffect, useRef, useState} from 'react';
import {LuckyDemo, LuckySchemaContext} from './schema';
import RulePrize from './components/RulePrize';
import Winning from './components/Winning';
import {OverlayEventDetail} from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import PrizeDetail from './components/PrizeDetail';
import Fail from './components/Fail';
import {luckyWheelGet, luckyWheelPlay} from '../../service/lucky';
import {useQuery, useWindowSize} from '../../hooks';
import {addInteractRecord} from '../../service/customerTool';
import {getExtraData, getUserInfo, guid} from '../../service/utils';

const customerReadGuid = guid();

//
interface Props {
  init: number
  luckyData: any
  zoomRate: number;
  onWinning: (index: number) => void;
  onFail: () => void;
}

const Wheel: React.FC<Props> = (props) => {

  const query = useQuery();
  const [presentAlert] = useIonAlert();

    const {lucky, setLucky} = React.useContext<any>(LuckySchemaContext);
    const myLucky = useRef<any>()

    const startAudio = new Audio(lucky.home.wheel.extraConfig.gameStart.audio);
    const endAudio = new Audio(lucky.home.wheel.extraConfig.gameEnd.audio);

  let allPrizes = lucky.home.wheel.prizes.map((item: any, index: number) => {
    return {
      index: index,
      noPrize: item.noPrize,
    }
  });
  let prizes = allPrizes.filter((item: any) => item.noPrize === false);
  let noPrizes = allPrizes.filter((item: any) => item.noPrize === true);


  const startAudioStop = () => {
        startAudio.pause();
        startAudio.currentTime = 0;
    }

    useEffect(() => {
      myLucky.current?.init()
    }, [props.init])

    React.useEffect(() => {
        startAudio.load();
        endAudio.load();

    }, [])

    function uploadInteractRecord(prizeIndex: number) {
      let prize = props.luckyData.prize.filter((item: any) => item.index === prizeIndex);

      let userInfo = getUserInfo();
      let params = {
        tenantId: query.get('tenantId'),
        corpId: query.get('corpId'),
        newPic: props.luckyData.shareCover,
        recordType: 14,
        recordCode: props.luckyData.id,
        recordName: props.luckyData.title,
        // recordTagCode: '',
        recordTagName: '',
        recordMsg: prize.length === 0 ? '未中奖' : prize[0].level,
        uniqueKey: query.get('uniqueKey'),
        userId: query.get('userId'),
        recordTypeExt: 'Cjhd', //抽奖活动 Cjhd
        visitorOpenId: userInfo.openId,
        visitorNickname: userInfo.nickName,
        visitorUnionId: userInfo.unionId,
        visitorPortraitUrl: userInfo.avatarUrl,
        // visitorExternalUserid: '',
        visitorPhone: userInfo.phone,
        superiorOpenId: query.get('superiorOpenId'),
        customerReadGuid: customerReadGuid,
        rootGuid: query.get('rootGuid'),
      };
      addInteractRecord(params).then((res: any) => {

      })
    }

    const onStart = () => { // 点击抽奖按钮会触发star回调
      luckyWheelPlay({id: query.get('amusementId')}).then((res) => {
        if (res.success) {
          myLucky.current?.play()
          // Play start audio
          startAudio.play();

          // Add interact record
          uploadInteractRecord(res.data);

          setTimeout(() => {
            if (res.data === 99) {
              myLucky.current?.stop(noPrizes[0].index)
            } else {
              myLucky.current?.stop(prizes[res.data - 1].index)
            }

          }, 2500)
        } else {
          presentAlert({
            header: '提示',
            subHeader: '',
            message: res.showMsg,
            buttons: ['OK'],
          })
        }
      })
    }
    const onEnd = (prize: any) => { // 抽奖结束会触发end回调
      prize.index === 99 ? props.onFail() : props.onWinning(prize.index)
      // Stop start audio and play end audio
      startAudioStop()
      endAudio.play()
    }

    return (
        <div>
            <LuckyWheel
                ref={myLucky}
                width={lucky.home.wheel.width * props.zoomRate}
                height={lucky.home.wheel.height * props.zoomRate}
                blocks={lucky.home.wheel.blocks}
                prizes={lucky.home.wheel.prizes}
                buttons={lucky.home.wheel.buttons}
                defaultConfig={lucky.home.wheel.defaultConfig}
                onStart={onStart}
                onEnd={onEnd}
            />
        </div>
    )
}

const Lucky: React.FC = () => {
  const LuckySchemaInstance = JSON.parse(JSON.stringify(LuckyDemo))
  const [lucky, setLucky] = React.useState<any>(LuckySchemaInstance)

  const [luckyData, setLuckyData] = useState<any>({})

  const [currentPrize, setCurrentPrize] = useState<any>({})
  const [initWheel, setInitWheel] = useState<number>(0)

  const [zoomRate, setZoomRate] = React.useState(window.innerWidth / lucky.baseSize);
  const [minHeight, setMinHeight] = React.useState(window.innerHeight);
  const [height, setHeight] = React.useState(window.innerHeight);

  // Audio
  const [isPlaying, setIsPlaying] = React.useState(false);
  const bgAudio = new Audio(lucky.home.background.music.src);

  let params = useQuery();
  let size = useWindowSize();
  const [presentAlert] = useIonAlert();

  useIonViewWillEnter(() => {
    if (params.get('amusementId') && params.get('userId')) {
      luckyWheelGet({id: params.get('amusementId')}).then((res: any) => {
        if (res.success) {
          setLucky(res.data.model);
          document.title = res.data.title;
          setLuckyData(res.data)
        } else {
          presentAlert({
            header: '提示',
            subHeader: '',
            message: res.showMsg,
            backdropDismiss: false,
            buttons: [],
          })
        }
      })
    } else {
      presentAlert({
        header: '提示',
        subHeader: '',
        message: '请通过正确的渠道进入',
        backdropDismiss: false,
        buttons: [],
      })
    }
  });

  useEffect(() => {
    // Handle the change of window size,
    // this is just to observe the page effect under different devices.
    setZoomRate(window.innerWidth / lucky.baseSize);
    resizeWheelPadding()
    setMinHeight(getMaxHeight() as number * zoomRate + 16)
    setHeight(window.innerHeight)
  }, [size.width, size.height])


    const playBgAudio = async () => {
        await bgAudio.play();
        setIsPlaying(true);
    }
    const pauseBgAudio = async () => {
        await bgAudio.pause();
        setIsPlaying(false);
    }


    // Lucky wheel modal
  const onClickPrize = (prize: any) => {
    setCurrentPrize(prize)
    openDetail()
  }
    const [tabName, setTabName] = useState('');
    const [rulePrizePresent, rulePrizeDismiss] = useIonModal(RulePrize, {
      onDismiss: (data: string, role: string) => rulePrizeDismiss(data, role),
      switchTab: (tabName: string) => setTabName(tabName),
      tabName: tabName,
      luckyData: luckyData,
      amusementId: params.get('amusementId'),
      onClickPrize: onClickPrize
    });
    const [winningPresent, winningDismiss, ] = useIonModal(Winning, {
      prize: currentPrize,
      onDismiss: (data: string, role: string) => winningDismiss(data, role),
    });
    const [failPresent, failDismiss, ] = useIonModal(Fail, {
        onDismiss: (data: string, role: string) => failDismiss(data, role),
    });
    const [detailPresent, detailDismiss, ] = useIonModal(PrizeDetail, {
      prize: currentPrize,
      onDismiss: (data: string, role: string) => detailDismiss(data, role),
    });

    const resizeWheelPadding = () => {
        lucky.home.wheel.blocks.forEach((block: any) => {
            // The border needs to adapt to the size of the wheel
            block.padding = block.padding.replace(/(\d+(?:\.\d+)?)/, lucky.home.wheel.width * zoomRate * 0.06);
        })
        setLucky(lucky)
    }

    // Find max height element
    const getMaxHeight = () => {
        return Object.values(lucky.home).reduce((previous: any, current: any) =>
            previous > current?.top + current?.height ? previous : current?.top + current?.height, 0)
    }

    // Open rule and prize modal
    function openRulePrize(tabName: string) {
        setTabName(tabName)
        rulePrizePresent({
            id: style.rulePrizeModal,
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
        });
    }

    // Open winning modal
    function openWinning(index: number) {
      setCurrentPrize(luckyData.prize.filter((item: any) => item.index === index)[0])
      winningPresent({
          id: style.winningFailModal,
          onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
              if (ev.detail.role === 'detail') {
                openRulePrize('prize')
              }
              if (ev.detail.role === 'again') {
                setInitWheel(new Date().getTime())
              }
          },
      });
    }
    // Open fail modal
    function openFail() {
        failPresent({
            id: style.winningFailModal,
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
              if (ev.detail.role === 'again') {
                setInitWheel(new Date().getTime())
              }
            },
        });
    }
    // Open detail modal
    function openDetail() {
        detailPresent({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
              if (ev.detail.role === 'cancel') {
                setInitWheel(new Date().getTime())
              }
            },
        });
    }

    return (
        <IonPage>
          <LuckySchemaContext.Provider value={{lucky, setLucky}}>
            <audio id="myaudio" src={lucky.home.background.music.src}
                   autoPlay loop={true} hidden={true}>
            </audio>
            <IonContent fullscreen>
                <div // Background
                    className={style.bg}
                    style={{
                      backgroundImage: `url(${lucky.home.background.image})`,
                      height: height,
                      minHeight: minHeight
                    }}
                >
                </div>
                <div
                    className={style.container}
                >
                    <div // Title
                        style={{
                            position: 'absolute',
                            top: lucky.home.activityTitle.top * zoomRate,
                            left: lucky.home.activityTitle.left * zoomRate,
                            width: lucky.home.activityTitle.width * zoomRate,
                            height: lucky.home.activityTitle.height * zoomRate,
                        }}
                    >
                        <img src={lucky.home.activityTitle.image} alt="Title"/>
                    </div>
                    <div // Rule
                        onClick={() => openRulePrize('rule')}
                        style={{
                            position: 'absolute',
                            top: lucky.home.activityRule.top * zoomRate,
                            left: lucky.home.activityRule.left * zoomRate,
                            width: lucky.home.activityRule.width * zoomRate,
                            height: lucky.home.activityRule.height * zoomRate,
                        }}
                    >
                        <img src={lucky.home.activityRule.image} alt="Rule"/>
                    </div>
                    <div // Wheel
                        style={{
                            position: 'absolute',
                            top: lucky.home.wheel.top * zoomRate,
                            left: lucky.home.wheel.left * zoomRate,
                        }}
                    >
                      <Wheel
                        init={initWheel}
                        luckyData={luckyData}
                        zoomRate={zoomRate}
                        onWinning={openWinning}
                        onFail={openFail}
                      />
                    </div>
                    <div // My prizes
                        onClick={() => openRulePrize('prize')}
                        style={{
                            position: 'absolute',
                            top: lucky.home.myPrizes.top * zoomRate,
                            left: lucky.home.myPrizes.left * zoomRate,
                            width: lucky.home.myPrizes.width * zoomRate,
                            height: lucky.home.myPrizes.height * zoomRate,
                        }}
                    >
                        <img src={lucky.home.myPrizes.image} alt="My prizes"/>
                    </div>
                    <div // Participant
                        style={{
                          display: 'none',
                            position: 'absolute',
                            top: lucky.home.participant.top * zoomRate,
                            left: lucky.home.participant.left * zoomRate,
                            width: lucky.home.participant.width * zoomRate,
                            height: lucky.home.participant.height * zoomRate,
                            color: lucky.home.participant.color,
                            fontSize: `${lucky.home.participant.fontSize * zoomRate}px`,
                            textAlign: 'center',
                        }}
                    >
                        <div>{lucky.home.participant.text}</div>
                    </div>
                </div>
            </IonContent>
          </LuckySchemaContext.Provider>
        </IonPage>
    );
};

export default Lucky;
