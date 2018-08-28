import init from './init'
import store from './store'
import * as utils from './util'
import * as media from './media'
import * as animations from '../animations'
import '../styles/index.scss'

// 初始化
init()
const container = document.querySelector('.container')
const pages = utils.getPagesEl()
const headerEl = document.querySelector('header')

// const animStart = animations.startSetup(pages.start.querySelector('#start-cvs'))
const animQ1 = animations.q1Setup(pages.q1.querySelector('#q1-cvs'))
const animQ2 = animations.q2Setup(pages.q2.querySelector('#q2-cvs'))
const animQ2End = animations.q2EndSetup(pages.q2.querySelector('#q2-cvs-end'))
const animQ3 = animations.q3Setup(pages.q3.querySelector('#q3-cvs'))
const animQ6 = animations.q6Setup(pages.q6.querySelector('#q6-cvs'))

// 启动起始页动画
function startPage() {
  setTimeout(() => {
    pages.start.classList.add('in')
  }, 2000)
}

startPage()

pages.start.querySelector('#start-btn').addEventListener('click', () => {
  // 初始化音乐
  media.autoplay()
  animations.sliceXSetup(pages.start, pages.q1).start(animQ1.start)
})

// Q1
const Q1Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q1.querySelector('ul.answer-list').removeEventListener('click', Q1Selected, false)
    utils.disptachSelectedAnswer(ev)

    ev.target.parentNode.classList.add('selected')
    pages.q1.classList.remove('in')

    setTimeout(() => {
      // 问题2的背景动画作为回掉传给翻转动画，当翻转动画结束后开始问题2的背景动画
      animations.flipYsetup(pages.q1, pages.q2).start(animQ2.start)
    }, 500)
  }
}
pages.q1.querySelector('ul.answer-list').addEventListener('click', Q1Selected, false)

// Q2
const Q2Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q2.querySelector('ul.answer-list').removeEventListener('click', Q2Selected, false)
    utils.disptachSelectedAnswer(ev)

    ev.target.parentNode.classList.add('selected')
    pages.q2.classList.remove('in')

    setTimeout(() => {
      const q2_end_cvs = document.querySelector('#q2-cvs-end')
      q2_end_cvs.style.zIndex = 1
      // 停止 Q2 动画
      animQ2.stop()
      // 开始 Q2_end 动画
      animQ2End.start()
      setTimeout(() => {
        // 停止 Q2 end 动画
        animQ2End.stop()
        // 开始 Q3 动画
        animQ3.start()
        pages.q2.classList.remove('current', 'in')
        pages.q3.classList.add('current', 'in')
      }, 1000)
    }, 500)
  }
}
pages.q2.querySelector('ul.answer-list').addEventListener('click', Q2Selected, false)

// Q3
const Q3Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q3.querySelector('ul.answer-list').removeEventListener('click', Q3Selected, false)
    utils.disptachSelectedAnswer(ev)

    ev.target.parentNode.classList.add('selected')
    pages.q3.classList.remove('in')

    // 停止 Q3 动画
    animQ3.stop()
    setTimeout(() => {
      animations.rotateSetup(pages.q3, pages.q4).start()
    }, 500)
  }
}
pages.q3.querySelector('ul.answer-list').addEventListener('click', Q3Selected, false)

// Q4
const Q4Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q4.querySelector('ul.answer-list').removeEventListener('click', Q4Selected, false)
    utils.disptachSelectedAnswer(ev)

    ev.target.parentNode.classList.add('selected')
    pages.q4.classList.remove('in')

    setTimeout(() => {
      pages.q4.classList.add('out')
      pages.q5.classList.add('current', 'in')
      setTimeout(() => {
        pages.q4.classList.remove('current', 'out')
      }, 650)
    }, 500)
  }
}
pages.q4.querySelector('ul.answer-list').addEventListener('click', Q4Selected, false)

// Q5
const Q5Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q5.querySelector('ul.answer-list').removeEventListener('click', Q5Selected, false)
    utils.disptachSelectedAnswer(ev)

    ev.target.parentNode.classList.add('selected')
    pages.q5.classList.remove('in')

    setTimeout(() => {
      pages.q5.classList.add('out')
      setTimeout(() => {
        pages.q5.classList.remove('current', 'out')
        pages.q6.classList.add('current', 'in')
        // 开始 Q6 动画
        animQ6.start()
      }, 600)
    }, 500)
  }
}
pages.q5.querySelector('ul.answer-list').addEventListener('click', Q5Selected, false)

// Q6
const Q6Selected = ev => {
  if (ev.target && ev.target.nodeName.toUpperCase() === 'A') {
    pages.q6.querySelector('ul.answer-list').removeEventListener('click', Q6Selected, false)
    utils.disptachSelectedAnswer(ev)
    // 回答完所有问题之后计算用户属性
    const userType = utils.getUserType(store.getState().totalScore)

    // 设置 myguide_clusterid to cookie
    const level = utils.userTypeMap[userType]
    utils.setClusteridToCookie(level)

    // 根据用户属性设置结果页信息
    utils.setResult(userType)

    ev.target.parentNode.classList.add('selected')
    pages.q6.classList.remove('in')

    setTimeout(() => {
      pages.q6.classList.add('out')
      setTimeout(() => {
        // 停止 Q6 动画
        animQ6.stop()
        const closeEl = document.querySelector('#close')
        const musicControlEl = document.querySelector('#music-control')

        closeEl.style.display = 'none'
        musicControlEl.style.top = '15px'
        // musicControlEl.style.display = 'none'

        pages.q6.classList.remove('current', 'out')
        pages.result.classList.add('current', 'in')
      }, 300)
    }, 500)
  }
}
pages.q6.querySelector('ul.answer-list').addEventListener('click', Q6Selected, false)
