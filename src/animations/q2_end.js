function drawTriangleStar (ctx, r, R, rotate = 0, fill) {
  ctx.save()

  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)

  ctx.beginPath()
  for (let i = 0; i < 3; i++) {
    ctx.lineTo(r * Math.cos(Math.PI * (30 + i * 120 - rotate) / 180), -r * Math.sin(Math.PI * (30 + i * 120 - rotate) / 180))
    ctx.lineTo(R * Math.cos(Math.PI * (90 + i * 120 - rotate) / 180), -R * Math.sin(Math.PI * (90 + i * 120 - rotate) / 180))
  }
  ctx.closePath()

  if (fill) {
    ctx.fill()
  } else {
    ctx.stroke()
  }
  ctx.restore()
}

function scaleAnima (ctx, minK = 0, maxK = 1) {
  let k = minK
  let step = 0.14
  let timer = -1
  let lastTimer = -1

  function update () {
    if (k > maxK) {
      cancelAnimationFrame(timer)
    } else {
      k = k + step
    }
  }

  function draw () {
    // 清除画布
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // 取消上一次产生的 raf
    cancelAnimationFrame(lastTimer)

    // 保存画布状态并缩放
    ctx.save()
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.scale(k, k)
    ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2)

    // 在缩放过的画布中绘制图形
    drawTriangleStar(ctx, 120, 360, 40, true)

    ctx.restore()

    // 更新下一帧动画状态
    update()

    // 再次调用 raf
    lastTimer = requestAnimationFrame(draw)
  }

  const start = () => {
    timer = requestAnimationFrame(draw)
  }

  const stop = () => {
    cancelAnimationFrame(timer)
    cancelAnimationFrame(lastTimer)
  }

  return { start, stop }
}

export function setup (cvs) {
  cvs.width = document.querySelector('.page').clientWidth * window.devicePixelRatio
  cvs.height = document.querySelector('.page').clientHeight * window.devicePixelRatio

  const ctx = cvs.getContext('2d')

  return scaleAnima(ctx, 0, 10)
}
