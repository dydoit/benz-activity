function configure (prev, next) {
  prev.style.zIndex = 10
  prev.style.backgroundColor = '#000'
  next.classList.add('current')
}

export function setup (prev, next) {
  function run () {
    prev.classList.add('animOutLeft')
    next.classList.add('current', 'animInRight')
    setTimeout(() => {
      prev.classList.remove('current', 'animOutLeft')
      next.classList.remove('animInRight')
      next.querySelector('.car-animation').classList.add('q4-car-animate')
    }, 1450)
  }

  const start = run

  function stop () {}

  return { start, stop }
}
