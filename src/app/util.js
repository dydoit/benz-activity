import store from './store'
import * as actions from './store/action'
import * as resultResource from './result'

// 用户类型
const sport     = 'sport'       // 运动
const adventure = 'adventure'   // 冒险
const elegance  = 'elegance'    // 典雅
const publicity = 'publicity'   // 张扬

// 从 event 对象中获取问题及答案的 id, 并 dispatch 选择问题的 action
export function disptachSelectedAnswer (event) {
  const li = event.target.parentElement
  const ul = li.parentElement

  const { questionNo } = ul.dataset
  const { answerId, answerScore: tmpScore } = li.dataset

  const answerScore = parseInt(tmpScore)

  store.dispatch(actions.select(questionNo, answerId, answerScore))

  return { questionNo, answerId, answerScore }
}

// 根据分数判断用户类型
export function getUserType (score) {
  // types:
  // 'sport': 运动, 'adventure': 冒险,
  // 'elegance': 典雅, 'publicity': 张扬

  const userType = (score >= 6 && score < 10.5)
  ? sport
  : (score >= 10.5 && score < 15)
  ? adventure
  : (score >= 15 && score <= 19.5)
  ? elegance
  : (score >= 19.5 && score <= 24)
  ? publicity
  : sport

  return userType
}

// 获取所有 page 元素
export function getPagesEl () {
  const start = document.querySelector('#start')
  const q1 = document.querySelector('#q1')
  const q2 = document.querySelector('#q2')
  const q3 = document.querySelector('#q3')
  const q4 = document.querySelector('#q4')
  const q5 = document.querySelector('#q5')
  const q6 = document.querySelector('#q6')
  const result = document.querySelector('#result')

  return { start, q1, q2, q3, q4, q5, q6, result }
}

// 设置结果页文案等信息
export function setResult (userType) {
  const result = resultResource.results[userType]
  resultResource.recommendCarEl.src = result.showCar
  resultResource.recommendCarEl.classList.add(userType);
  resultResource.recommendSeriesEl.innerHTML = result.series
  resultResource.bannerText.innerHTML = result.bannerText
  resultResource.radar.src = result.radar
  resultResource.info.innerHTML = result.text
}

// 判断用户是否在 app 内打开页面
const appUA = 'mmp-lightapp-user-agent'
export function isApp () {
  const u = navigator.userAgent
  return !!u.match(appUA)
}

// 判断用户是否是 web 平台
export function isWeb () {
  return true
}

// 判断用户是否是 ios 平台
export function isIos () {
  const u = navigator.userAgent
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

// 判断用户是否是 android 平台
export function isAndroid () {
  const u = navigator.userAgent
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
}

/******************************* 对接 *****************************/
// 设置 cookie
export function setCookie (key, maxAge = 10) {       // maxAge: max-age-in-seconds
  return function (value) {
    document.cookie = `${key}=${value};max-age=${maxAge};path=/`
  }
}

// 设置 myguide_clusterid cookie
const maxAge = 60 * 60  // 60 mins
export const setClusteridToCookie = setCookie('myguide_clusterid', maxAge)

// 用户类型和相应数值映射
export const userTypeMap = {
  sport: 0,
  adventure: 1,
  elegance: 2,
  publicity: 3,
  others: 4
}

// 判断用户是否登陆
export function isLoggedIn () {
  return false
}
