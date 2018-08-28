import qrWeb from '../assets/img/share-qr/web.png'
import qrIos from '../assets/img/share-qr/ios.png'
import qrAndroid from '../assets/img/share-qr/android.png'

import * as utils from './util'

import { textBanner, link, back } from './result'

const closeEl = document.querySelector('#close')
const musicControlEl = document.querySelector('#music-control')
const downloadQrCode = document.querySelector('#download-qrcode')
const sharedBtns = document.querySelector('.shared-btns')

function setCloseBtnLocation (href) {
  closeEl.addEventListener('click', () => {
    location.href = href
  }, false)
}

setCloseBtnLocation('https://me-test-cn.secure.mercedes-benz.com/wps/myportal/mmp/home/inspireme/inspiremecontent/myguide')

function setMusicControlPos () {
  if (utils.isApp()) {
    closeEl.style.display = 'block'
    musicControlEl.style.top = '70px'
  }
}

function setQrCode () {
  if (utils.isApp()) {
    downloadQrCode.style.display = 'none'
  } else {
    const qrCodeImg = utils.isIos()
      ? qrIos
      : utils.isAndroid()
      ? qrAndroid
      : qrWeb

    const qrEl = downloadQrCode.querySelector('#share-pic')
    qrEl.src = qrCodeImg
  }
}

function setSharedBtn () {
  // const firstBtn = sharedBtns.querySelector('.first-btn')
  // const secondBtn = sharedBtns.querySelector('.second-btn')

  if (utils.isApp()) {
    // firstBtn.innerHTML = '分享'
    // secondBtn.innerHTML = '返回'
    textBanner.innerHTML = '/ 登陆平台，尽享精彩驾旅体验 /'
    link.style.display = 'none'
  } else {
    // firstBtn.innerHTML = '查看您的专属自驾路线'
    // secondBtn.innerHTML = '分享'
    back.style.display = 'none'
  }
}

// 控制是否显示登陆平台的提示信息
function showTipInfo () {
  if (utils.isLoggedIn()) {
    textBanner.style.display = 'none'
  } else {
    textBanner.style.display = 'block'
  }
}

export default function init () {
  setMusicControlPos()
  // setQrCode()
  setSharedBtn()
  showTipInfo()
}
