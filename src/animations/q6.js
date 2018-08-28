function configure(cvs) {
  const dpr = window.devicePixelRatio
  cvs.width = document.querySelector('.page').clientWidth * dpr
  cvs.height = document.querySelector('.page').clientHeight * dpr

  const ctx = cvs.getContext('2d')
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.strokeStyle = 'rgba(255, 255, 255, .7)'
  return ctx
}

export function setup(cvs) {
  const ctx = configure(cvs)

  const {
    width,
    height
  } = ctx.canvas
  let n = 256 // 点的个数
  let test = true
  let translateTop = 300 // 画布向上移动的距离

  let x = Math.round(width / 2)
  let y = Math.round(height / 2)
  let z = (width + height) / 2

  let star_color_ratio = 1 / z
  let star_x_save, star_y_save
  let star_ratio = 256
  let star_speed = 10
  let star_speed_save = 0
  let star = new Array(n)
  let timer = -1
  let lastTimer = -1
  let k = 0

  function initStar() {
    for (let i = 0; i < n; i++) {
      star[i] = new Array(5)
      star[i][0] = Math.random() * width * 2 - x * 2
      star[i][1] = Math.random() * height * 2 - y * 2
      star[i][2] = Math.round(Math.random() * z)
      star[i][3] = 0
      star[i][4] = 0
    }
  }

  initStar()

  function draw () {
    cancelAnimationFrame(lastTimer)
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < n; i++) {
      test = true
      star_x_save = star[i][3]
      star_y_save = star[i][4]

      if (star[i][0] > x << 1) {
        star[i][0] -= width << 1
        test = false
      }

      if (star[i][0] < -x << 1) {
        star[i][0] += width << 1
        test = false
      }

      if (star[i][1] > y << 1) {
        star[i][1] -= height << 1
        test = false
      }

      if (star[i][1] < -y << 1) {
        star[i][1] += height << 1
        test = false
      }

      star[i][2] -= star_speed

      if (star[i][2] > z) {
        star[i][2] -= z
        test = false
      }

      if (star[i][2] < 0) {
        star[i][2] += z
        test = false
      }

      star[i][3] = x + (star[i][0] / star[i][2]) * star_ratio

      star[i][4] = y + (star[i][1] / star[i][2]) * star_ratio

      if (star_x_save > 0 && star_x_save < width && star_y_save > 0 && star_y_save < height + translateTop && test) {
        ctx.save()
        ctx.translate(0, -translateTop)
        ctx.lineWidth = (1 - star_color_ratio * star[i][2]) * 2
        ctx.beginPath()
        ctx.moveTo(star_x_save, star_y_save)
        ctx.lineTo(star[i][3], star[i][4])
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      }
    }
    lastTimer = requestAnimationFrame(draw)
  }

  const start = () => {
    timer = requestAnimationFrame(draw)
  }

  const stop = () => {
    cancelAnimationFrame(lastTimer)
    cancelAnimationFrame(timer)
  }

  return {
    start,
    stop
  }
}
