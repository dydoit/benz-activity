import musicSrc from '../assets/media/game_maoudamashii_5_town25b.mp3'

// 创建 music 元素
export const music = document.createElement('audio')
music.src = musicSrc
music.loop = true

// music 控制
const musicControlElement = document.querySelector('#music-control')

// music-circle 旋转动画
const musicControlCircleElement = musicControlElement.querySelector('.music-circle')

const createControl = circle => {
  let deg = 0
  let timer
  let lastTimer

  const update = () => {
    if (deg >= 360) {
      deg = 1
    } else {
      deg = deg + 3
    }
  }

  const run = () => {
    circle.style.transform = `rotate(${deg}deg)`
    update()
    cancelAnimationFrame(lastTimer)
    lastTimer = requestAnimationFrame(run)
  }

  const start = () => {
    timer = requestAnimationFrame(run)
  }

  const stop = () => {
    cancelAnimationFrame(timer)
    cancelAnimationFrame(lastTimer)
  }

  return { start, stop }
}

const musicControl = createControl(musicControlCircleElement)

// autoplay
export function autoplay () {
  music.play()
  musicControl.start()
}

// toggle music
const toggleMusic = ((music) => () => {
  // 如果音乐暂停则播放
  if (music.paused) {
    music.play()
    musicControl.start()
    // 如果播放则暂停
  } else {
    music.pause()
    musicControl.stop()
  }
})(music)

musicControlElement.addEventListener('click', ev => {
  toggleMusic()
  ev.stopPropagation()
  ev.preventDefault()
}, false)
