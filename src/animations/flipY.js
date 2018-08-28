function configure (prev, next) {
  next.style.transform = 'rotateY(180deg)'
}

export function setup (prev, next) {
  let lastTimer = -1
  let timer = -1
  let step = 0

  configure(prev, next)

  function update () {
    step = step - 5
  }

  const run = cb => () => {
    cancelAnimationFrame(lastTimer)
    update()
    prev.style.transform = `rotateY(${step}deg)`
    next.style.transform = `rotateY(${180 + step}deg)`
    lastTimer = requestAnimationFrame(run(cb))

    if (step === -90) {
      prev.classList.remove('current')
      next.classList.add('current')
    }

    if (step === -180) {
      prev.style.transform = ''       // 解决QQ浏览器兼容问题
      cancelAnimationFrame(lastTimer)
      cancelAnimationFrame(timer)
      cb ? cb() : ''
    }
  }

  function start (cb) {
    timer = requestAnimationFrame(run(cb))
  }

  function stop () {
    cancelAnimationFrame(lastTimer)
    cancelAnimationFrame(timer)
  }

  return {
    start,
    stop
  }
}
