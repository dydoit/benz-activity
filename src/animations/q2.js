export function setup (canvas) {
  const point = 40

  const dpi = (window.devicePixelRatio === 1 && document.documentElement.clientWidth > 750) ? 2 : window.devicePixelRatio

  canvas.width = document.querySelector('.page').clientWidth * dpi
  canvas.height = document.querySelector('.page').clientHeight * dpi

  const context = canvas.getContext("2d")

  context.lineWidth = 2
  context.fillStyle = 'rgb(70, 70, 70)'

  //生成max和min之间的随机数
  function random(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 10) + min)
  }

  //绘制圆点
  function drawCricle(cxt, x, y, r, moveX, moveY) {
    cxt.beginPath()
    cxt.arc(x, y, r, 0, 2 * Math.PI)
    cxt.closePath()
    cxt.fill()
  }

  //绘制线条
  function drawLine(cxt, x, y, _x, _y, o) {
    cxt.beginPath()
    cxt.strokeStyle = 'rgba(255, 255, 255, ' + o + ')'
    cxt.moveTo(x, y)
    cxt.lineTo(_x, _y)
    cxt.closePath()
    cxt.stroke()
  }

  //初始化生成圆点
  function init(ctx) {
    const circles = [{
      x: random(ctx.canvas.width),
      y: random(ctx.canvas.height),
      r: random(6, 2),
      moveX: random(20, -10) / 40,
      moveY: random(20, -10) / 40
    }]

    for (let i = 0; i < point; i++) {
      const circle = {
        x: random(ctx.canvas.width),
        y: random(ctx.canvas.height),
        r: random(6, 2),
        moveX: random(10, -10) / 40,
        moveY: random(10, -10) / 40
      }
      circles.push(circle)
    }

    return circles
  }

  //每帧绘制
  function _draw(ctx, circles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < point; i++) {
      for (let j = 0; j < point; j++) {
        if (i + j < point) {
          const a = Math.abs(circles[i + j].x - circles[i].x)
          const b = Math.abs(circles[i + j].y - circles[i].y)

          const lineLength = Math.sqrt(a * a + b * b)

          const C = (lineLength > 230 || lineLength < 100) ? 0 : (1 / lineLength * 10)
          const lineOpacity = C > 0.03 ? 0.08 : C
          if (lineOpacity > 0) {
            drawLine(ctx, circles[i].x, circles[i].y, circles[i + j].x, circles[i + j].y, lineOpacity)
          }
        }
      }
    }

    for (let i = 0; i < point; i++) {
      drawCricle(ctx, circles[i].x, circles[i].y, circles[i].r)
    }
  }

  function _step(ctx, circles) {
    for (let i = 0; i < point; i++) {
      const cir = circles[i]
      cir.x += cir.moveX
      cir.y += cir.moveY
      if (cir.x > canvas.width) cir.x = 0
      else if (cir.x < 0) cir.x = canvas.width
      if (cir.y > canvas.height) cir.y = 0
      else if (cir.y < 0) cir.y = canvas.height
    }
    _draw(ctx, circles)
  }

  const scaleAnimation = (ctx) => {
    let k = 0 // 初始缩放比
    let step = 0.03 // 比例增加的步长
    let timer = -1 // 初始 requestAnimationFrame 的 id
    let lastTimer = -1 // 每次重新绘制时 requestAnimationFrame 的 id
    const circles = init(ctx)

    // 更新缩放比
    const update = () => {
      // 如果缩放比已经达到或者超过 1 则停止缩放
      if (k >= 1) {
        cancelAnimationFrame(timer)
      } else {
        k = k + step
      }
    }

    const draw = () => {
      cancelAnimationFrame(lastTimer)

      ctx.save()
      ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
      ctx.scale(k, k)
      ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)

      // 绘制图形
      _step(ctx, circles)

      ctx.restore()

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

  return scaleAnimation(context)
}
