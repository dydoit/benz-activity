import picScottish from '../assets/img/2/pic-Scottish.png'
import picQiuming from '../assets/img/2/pic-Qiuming.png'
import picWallStreet from '../assets/img/2/pic-WallStreet.png'
import picSaharaDesert from '../assets/img/2/pic-SaharaDesert.png'

import mapScottish from '../assets/img/2/map-Scottish.jpg'
import mapQiuming from '../assets/img/2/map-Qiuming.jpg'
import mapWallStreet from '../assets/img/2/map-WallStreet.jpg'
import mapSaharaDesert from '../assets/img/2/map-SaharaDesert.jpg'

function loadImage (src) {
  const img = new Image()
  img.src = src
  return img
}

const imgScottish = loadImage(picScottish)
const imgQiuming = loadImage(picQiuming)
const imgWallStreet = loadImage(picWallStreet)
const imgSaharaDesert = loadImage(picSaharaDesert)

const bgScottish = loadImage(mapScottish)
const bgQiuming = loadImage(mapQiuming)
const bgWallStreet = loadImage(mapWallStreet)
const bgSaharaDesert = loadImage(mapSaharaDesert)

function drawImage (ctx, img, x, y, delta = 0, width = 74, height = 51) {
  ctx.save()
  ctx.translate(x, y + delta)
  ctx.drawImage(img, 0, 0, width, height)
  ctx.restore()
}

function jumpImage (ctx) {
  let timer
  let lastTimer

  const { canvas: { width, height } } = ctx

  let state = {
    direction: 0, // 0: 负方向, 1：正方向
    delta: 0,
    circle: {
      radius: width * (3 / 750),
      alpha: 1,
      delta: {
        x: width * (3.5 / 750),
        y: height * (3.5 / 1334)
      },
      points: [
        // { x: width * (169 / 750), y: height * (211 / 1334) },
        { x: width * (469 / 750), y: height * (211 / 1334) },
        { x: width * (605 / 750), y: height * (620 / 1334) },
        { x: width * (91 / 750), y: height * ((901 + 160) / 1334) },
        { x: width * (460 / 750), y: height * ((1114 + 70) / 1334) }
      ]
    },
    backgrounds: [
      // { img: bgScottish, x: width * (41 / 750), y: height * (108 / 1334), w: width * (302 / 750), h: height * (250 / 1334) },
      { img: bgScottish, x: width * (341 / 750), y: height * (108 / 1334), w: width * (302 / 750), h: height * (250 / 1334) },
      { img: bgQiuming, x: width * (404 / 750), y: height * (499 / 1334), w: width * (346 / 750), h: height * (306 / 1334) },
      { img: bgWallStreet, x: width * (0 / 750), y: height * ((786 + 160) / 1334), w: width * (302 / 750), h: height * (250 / 1334) },
      { img: bgSaharaDesert, x: width * (322 / 750), y: height * ((925 + 70) / 1334), w: width * (312 / 750), h: height * (378 / 1334) }
    ],
    images: [
      // { img: imgScottish, x: width * (136 / 750), y: height * (153 / 1334), w: width * (74 / 750), h: height * (51 / 1334) },
      { img: imgScottish, x: width * (436 / 750), y: height * (153 / 1334), w: width * (74 / 750), h: height * (51 / 1334) },
      { img: imgQiuming, x: width * (572 / 750), y: height * (564 / 1334), w: width * (74 / 750), h: height * (51 / 1334) },
      { img: imgWallStreet, x: width * (58 / 750), y: height * ((845 + 160) / 1334), w: width * (74 / 750), h: height * (51 / 1334) },
      { img: imgSaharaDesert, x: width * (426 / 750), y: height * ((1057 + 70) / 1334), w: width * (74 / 750), h: height * (51 / 1334) }
    ]
  }

  function update () {
    if (state.direction === 1) {
      if (state.delta < (height * (25 / 1334))) {
        state.delta = state.delta + height * (0.84 / 1334)
        state.circle.radius = state.circle.radius + width * (0.2 / 750)
      } else {
        state.direction = 0
      }
    } else if (state.direction === 0) {
      if (state.delta > 0) {
        state.delta = state.delta - height * (0.84 / 1334)
        state.circle.radius = state.circle.radius - width * (0.2 / 750)
      } else {
        state.direction = 1
      }
    }
  }

  function draw () {
    cancelAnimationFrame(lastTimer)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    state.backgrounds.forEach(bg => {
      drawImage(ctx, bg.img, bg.x, bg.y, 0, bg.w, bg.h)
    })

    state.circle.points.forEach(point => {
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(point.x + state.circle.delta.x, point.y + state.circle.delta.y, state.circle.radius, 0, Math.PI * 2, true)
      ctx.closePath()
      ctx.fill()
    })

    state.images.forEach(image => {
      drawImage(ctx, image.img, image.x, image.y - height * (12.5 / 1334), state.delta, image.w, image.h)
    })

    update()
    lastTimer = requestAnimationFrame(draw)
  }

  const start = () => {
    timer = requestAnimationFrame(draw)
  }

  const stop = () => {
    cancelAnimationFrame(lastTimer)
    cancelAnimationFrame(timer)
  }

  return { start, stop }
}

export function setup (canvas) {
  canvas.width = document.querySelector('.page').clientWidth * window.devicePixelRatio
  canvas.height = document.querySelector('.page').clientHeight * window.devicePixelRatio
  const ctx = canvas.getContext('2d')
  return jumpImage(ctx)
}
