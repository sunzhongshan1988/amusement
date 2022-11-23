import React from 'react';

export const LuckyDemo = {
  name: 'LuckyWheel',
  baseSize: 375,
  home: {
    background: {
      music: {
        name: 'example.mp3',
        src:'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/Funny%20Sitcom%20Theme.mp3'},
      image: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/background.png',
    },
    activityTitle: {
      top: 0,
      left: 0,
      width: 375,
      height: 180,
      image: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/title.png',
    },
    activityRule: {
      top: 0,
      left: 300,
      width: 60,
      height: 60,
      image: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/rule.png',
    },
    myPrizes: {
      top: 480,
      left: 300,
      width: 60,
      height: 60,
      image: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/myPrizes.png',
    },
    wheel: {
      top: 200,
      left: 37.5,
      width: 300,
      height: 300,
      prizes: [],
      blocks: [{
        padding: '18px',
        imgs: [
          {
            src: 'https://static.qunkong.jniu.com/work-weixin/static/636cbeb1e4b0183cab17dea4.png?x-oss-process=image/crop,x_78,y_89,w_1811,h_1811',
            width: '100%',
            rotate: true,
          }
        ]
      }],
      buttons: [{
        radius: '35%',
        imgs: [
          {
            src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/start.png',
            top: '-123%',
            width: '100%',
          },
        ],
      }],
      defaultConfig: {
        gutter: 0
      },
      defaultStyle: {
        background: '#e9e8fe'
      },
      extraConfig: {
        noPrize: {
          range: [],
          noPrize: true,
          index: 99,
          imgs: [
            {
              src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/noPrize.png',
              top: '15%',
              width: '50%',
            }
          ],
        },
        prizes: [
          {
            range: [],
            noPrize: false,
            index: 1,
            imgs: [
              {
                src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/prize.png',
                top: '15%',
                width: '50%',
              }
            ],
          },
        ],
        gameStart: {
          audio: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/game-roll-01.wav'
        },
        gameEnd: {
          audio: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/game-end-01.wav'
        }
      }
    },
    participant: {
      top: 520,
      left: 0,
      width: 375,
      height: 40,
      color: '#ffffff',
      fontSize: 14,
      text: '累计0人次参与',
    }
  }
}
export const LuckySchemaContext: any = React.createContext({});
