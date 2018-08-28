function configure (prev, next) {
  prev.style.zIndex = 10
  prev.style.backgroundColor = '#000'
  next.classList.add('current')
}

export function setup (prev, next) {
  let lastTimer = -1
  let timer = -1
  let step = document.documentElement.clientHeight / 2

  configure(prev, next)

  function update () {
    step = step - 8
  }

  function run () {
    cancelAnimationFrame(lastTimer)
    prev.style.clipPath = `circle(${step}px at center)`
    prev.style.WebkitClipPath = `circle(${step}px at center)`
    update()
    lastTimer = requestAnimationFrame(run)

    if (step <= 0) {
      prev.classList.remove('current')
      next.classList.add('in')
      cancelAnimationFrame(lastTimer)
      cancelAnimationFrame(timer)
    }
  }

  function start () {
    timer = requestAnimationFrame(run)
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
