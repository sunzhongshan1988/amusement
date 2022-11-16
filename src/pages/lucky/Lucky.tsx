import {IonContent, IonPage, useIonModal, useIonViewWillEnter} from '@ionic/react';
import style from './Lucky.module.scss';
// @ts-ignore
import {LuckyWheel} from '@lucky-canvas/react'
import React, {useRef, useState} from 'react';
import {LuckyDemo, LuckySchemaContext} from './schema';
import RulePrize from './components/RulePrize';
import Winning from './components/Winning';
import {OverlayEventDetail} from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import PrizeDetail from './components/PrizeDetail';
import Fail from './components/Fail';
import {luckyWheelGet} from '../../service/lucky';
import {useQuery} from '../../hooks';


//
interface Props {
    zoomRate: number;
    onWinning: () => void;
    onFail: () => void;
}

const Wheel: React.FC<Props> = (props) => {
    const {lucky, setLucky} = React.useContext<any>(LuckySchemaContext);
    const myLucky = useRef<any>()

    const startAudio = new Audio(lucky.home.wheel.extraConfig.gameStart.audio);
    const endAudio = new Audio(lucky.home.wheel.extraConfig.gameEnd.audio);
    const startAudioStop = () => {
        startAudio.pause();
        startAudio.currentTime = 0;
    }

    React.useEffect(() => {
        startAudio.load();
        endAudio.load();

    }, [])

    const onStart = () => { // 点击抽奖按钮会触发star回调
        myLucky.current?.play()
        // Play start audio
        startAudio.play()
        setTimeout(() => {
            const index = Math.random() * 4 >> 0
            myLucky.current?.stop(index)
        }, 2500)
    }
    const onEnd = (prize: any) => { // 抽奖结束会触发end回调
       Math.random() > 0.5
           ? props.onWinning() : props.onFail()
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

    const [zoomRate, setZoomRate] = React.useState(window.innerWidth / lucky.baseSize);
    const [maxHeight, setMaxHeight] = React.useState(window.innerHeight);

    // Audio
    const [isPlaying, setIsPlaying] = React.useState(false);
    const bgAudio = new Audio(lucky.home.background.music.src);

    let params = useQuery();
    React.useEffect(() => {
      document.title = lucky.name;
    }, [])

  useIonViewWillEnter(() => {
    if (params.get('amusementId')) {
      luckyWheelGet({id: params.get('amusementId')}).then((res: any) => {
        setLucky(res.data.model);
        document.title = res.data.title;
      })
    }
  });

    const playBgAudio = async () => {
        await bgAudio.play();
        setIsPlaying(true);
    }
    const pauseBgAudio = async () => {
        await bgAudio.pause();
        setIsPlaying(false);
    }


    // Lucky wheel modal
    const [tabName, setTabName] = useState('');
    const [rulePrizePresent, rulePrizeDismiss] = useIonModal(RulePrize, {
        onDismiss: (data: string, role: string) => rulePrizeDismiss(data, role),
        switchTab: (tabName: string) => setTabName(tabName),
        tabName: tabName
    });
    const [winningPresent, winningDismiss, ] = useIonModal(Winning, {
        onDismiss: (data: string, role: string) => winningDismiss(data, role),
    });
    const [failPresent, failDismiss, ] = useIonModal(Fail, {
        onDismiss: (data: string, role: string) => failDismiss(data, role),
    });
    const [detailPresent, detailDismiss, ] = useIonModal(PrizeDetail, {
        onDismiss: (data: string, role: string) => detailDismiss(data, role),
    });

    React.useEffect(() => {
        window.addEventListener('resize', resizeHandle);
        resizeWheelPadding();
        setMaxHeight(getMaxHeight() as number)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [zoomRate])

    // Handle the change of window size,
    // this is just to observe the page effect under different devices.
    const resizeHandle = () => {
        setZoomRate(window.innerWidth / lucky.baseSize);
        resizeWheelPadding()
    }
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
            initialBreakpoint: 0.85,
            breakpoints: [0,0.85],
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
        });
    }

    // Open winning modal
    function openWinning() {
        winningPresent({
            id: style.winningFailModal,
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
                if (ev.detail.role === 'detail') {
                    openDetail()
                }
            },
        });
    }
    // Open fail modal
    function openFail() {
        failPresent({
            id: style.winningFailModal,
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
        });
    }
    // Open detail modal
    function openDetail() {
        detailPresent({
            onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {},
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
                        height: maxHeight * zoomRate + 16
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
