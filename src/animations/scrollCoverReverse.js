function configure (prev, next) {
  prev.style.zIndex = 10
  next.style.transform = 'translateY(20%)'
  next.classList.add('current')
}

export function setup (prev, next) {
  let lastTimer = -1
  let timer = -1
  let step = 0

  configure(prev, next)

  function update () {
    step = step - 4
  }

  const run = cb => () => {
    cancelAnimationFrame(lastTimer)
    update()
    prev.style.transform = `translateY(${step}%)`
    next.style.transform = `translateY(${40 + step * 0.4}%)`
    lastTimer = requestAnimationFrame(run(cb))

    if (step === -100) {
      prev.classList.remove('current')
      next.classList.add('in')
      cancelAnimationFrame(lastTimer)
      cancelAnimationFrame(timer)
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
