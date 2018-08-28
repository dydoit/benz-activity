function configure(prev, next) {
  prev.style.zIndex = 10
  next.classList.add('current')
}

export function setup(prev, next) {
  configure(prev, next)

  function start(cb) {
    prev.classList.add('out')
    setTimeout(() => {
      prev.style.zIndex = -1        // 解决QQ浏览器兼容问题
      prev.classList.remove('current', 'in', 'out')
    }, 800)
    cb()
  }

  function stop() {}

  return { start, stop }
}
