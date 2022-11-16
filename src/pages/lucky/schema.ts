export const LuckyDemo = {
  name: 'Lucky Wheel',
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
      width:300,
      height: 300,
      prizes: [
          {
            range: [],
            background: '#fd5013',
            imgs: [
              {
                src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/noPrize.png',
                top: '20%',
                width: '30%',
              }
            ],
          },
          {
            range: [],
            background: '#fdd300',
            imgs: [
              {
                src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/prize.png',
                top: '20%',
                width: '30%',
              }
            ],
          },
          {
            range: [],
            background: '#fd5013',
            imgs: [
              {
                src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/noPrize.png',
                top: '20%',
                width: '30%',
              }
            ],
          },
          {
            range: [],
            background: '#fdd300',
            imgs: [
              {
                src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/prize.png',
                top: '20%',
                width: '30%',
              }
            ],
          },
        ],
      blocks: [{
        padding: '18px',
        background: '#ffffff00',
        imgs: [
          {
            src: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/wheelBackground.png',
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
      extraConfig: {
        gameStart: {
          audio: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/game-roll-01.wav'
        },
        gameEnd: {
          audio: 'https://static.qunkong.jniu.com/test-frontend/lucky-wheel/game-end-01.wav'
        }
      }
    },
    participant: {
      top: 540,
      left: 0,
      width: 375,
      height: 40,
      color: '#ffffff',
      fontSize: 14,
      text: '累计0人次参与',
    }
  },
  config:{
    base: {},
    prize: [
      {
        level: '一等奖',
        type: 'gift', // gift, coupon
        name: '100元现金红包',
        count: 1,
        redeem: 'offline', // offline, online
        address: '', // Address to redeem the prize
        dateRange: [], // Date range to redeem the prize
        notice: '请保证获奖数据真实有效', // Description of the prize
      }
    ],
    rule: {},
    share: {},
  }
}
