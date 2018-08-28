import sportRadar from '../assets/img/result/radar/radar_sport.png'
import adventureRadar from '../assets/img/result/radar/radar_adventure.png'
import eleganceRadar from '../assets/img/result/radar/radar_elegance.png'
import publicityRadar from '../assets/img/result/radar/radar_publicity.png'

import sportCar from '../assets/img/result/car/sport.jpg'
import adventureCar from '../assets/img/result/car/adventure.png'
import eleganceCar from '../assets/img/result/car/elegance.jpg'
import publicityCar from '../assets/img/result/car/publicity.png'

export const results = {
  sport: {
    text: '满腔热情的你，是时代的新生力量。在你的字典中根本就没有“放弃”和“失败”的字眼。直白，进取，无畏让你面对困境永远能够迎难而上，速战速决！',
    series: 'CLA',
    bannerText: '运动',
    showCar: sportCar,
    radar: sportRadar
  },
  adventure: {
    text: '天生卓越的领导才能，威信十足，身边总是不乏追随者。注定成为主角的你，拥有异于常人的韧性和天赋。凌越巅峰，是不懈的追求；心怀天地，才是被成功之神眷顾的原因。',
    series: 'G63',
    bannerText: '冒险',
    showCar: adventureCar,
    radar: adventureRadar
  },
  elegance: {
    text: '极具人格魅力的你，温文尔雅气度非凡，你追求尽善尽美，也深知这背后深厚底蕴和日积月累的哲学。你始终不渝地内外兼修，让你在各个场合举重若轻，深得人心。',
    series: 'S级轿车',
    bannerText: '典雅',
    showCar: eleganceCar,
    radar: eleganceRadar
  },
  publicity: {
    text: '天然一身的风流才子范。务实沉稳，又难掩处处散发着的唯美主义气息；看似低调，面对险阻却能迸发出惊人的不服输精神，这正是你平衡自己的秘诀所在。',
    series: 'GLC SUV',
    bannerText: '张扬',
    showCar: publicityCar,
    radar: publicityRadar
  }
}

// result 节点
export const resultEl = document.querySelector('#result')

// 展示车型图片
export const recommendCarEl = resultEl.querySelector('#recommend-car')

// 推荐车系
export const recommendSeriesEl = resultEl.querySelector('#first-series')

// banner text
export const bannerText = resultEl.querySelector('#text')

// 雷达图
export const radar = resultEl.querySelector('#radar')

// 展示文案
export const info = resultEl.querySelector('#info')

// share qr pic
export const shareQrPic = resultEl.querySelector('#share-pic')

// text-banner
export const textBanner = resultEl.querySelector('#text-banner')

// link
export const link = resultEl.querySelector('#link')

// back
export const back = resultEl.querySelector('#back')
