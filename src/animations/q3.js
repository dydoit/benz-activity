export function setup(canvas) {
  canvas.width = document.querySelector('.page').clientWidth * window.devicePixelRatio
  canvas.height = document.querySelector('.page').clientHeight * window.devicePixelRatio
  const ctx = canvas.getContext('2d')
  let dpr = window.devicePixelRatio || 1
  let canvasWidth = canvas.width = canvas.clientWidth * dpr;
  let canvasHeight = canvas.height = canvas.clientHeight * dpr;
  let max = 16;
  let deltaTime;
  let lastTime;
  let drops = [];
  let wind_direction = 20 * dpr;
  let add_direction = 80 * dpr;
  let anger = Math.PI / 180 * 16
  let speed_x = wind_direction * Math.sin(anger)
  let speed_y = wind_direction * Math.cos(anger)
  let add_x = add_direction * Math.sin(anger)
  let add_y = add_direction * Math.cos(anger)
  let stopAnimation = null;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Drop {
    init () {
      let randomEdge = Math.random() * 2;
      this.x = random(0,canvasWidth*2);
      this.y = -random(5,20);
      this.w = 1 * dpr;
      this.h = 1 * dpr;
      this.vw = 3 * dpr;
      this.vh = 1 * dpr;
      this.hit = random(canvasHeight * .8, canvasHeight * .9);
      this.a = .3;
      this.va = .96;
      this.time = 0;
    }

    draw() {
      if (this.y >= this.hit) {
        ctx.beginPath();
        ctx.lineWidth = 1 * dpr;
        ctx.moveTo(this.x - speed_x + add_x, this.y + speed_y - add_y - this.h / 2);

        ctx.bezierCurveTo(
          this.x - speed_x + add_x + this.w / 2, this.y + speed_y - add_y - this.h / 2,
          this.x - speed_x + add_x + this.w / 2, this.y + speed_y - add_y + this.h / 2,
          this.x - speed_x + add_x, this.y + speed_y - add_y + this.h / 2);

        ctx.bezierCurveTo(
          this.x - speed_x + add_x - this.w / 2, this.y + speed_y - add_y + this.h / 2,
          this.x - speed_x + add_x - this.w / 2, this.y + speed_y - add_y - this.h / 2,
          this.x - speed_x + add_x, this.y + speed_y - add_y - this.h / 2);

        ctx.strokeStyle = 'hsla(180, 100%, 100%, ' + this.a + ')';
        ctx.stroke();
        ctx.closePath();
      } else {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, .6)';
        ctx.lineWidth = 1 * dpr;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - speed_x, this.y + speed_y)
        ctx.stroke();
        ctx.closePath();
      }
      this.update();
    }

    update () {
      this.time += deltaTime;
      if (this.y < this.hit) {
        if(this.time>20){
          this.y += add_y;
          this.x -= add_x;
          this.x -= random(-30,30)*dpr*Math.sin(anger);
          this.y -= random(-30,30)*dpr*Math.cos(anger);
          this.time = 0;
        }
      } else {
        if (this.a > .2) {
          this.w += this.vw;
          this.h += this.vh;
          if (this.w > 20) {
            this.a *= this.va;
            this.vw *= .96;
            this.vh *= .96;
          }
        } else {
          this.init();
        }
      }
    }
  }

  function init() {
    for (let i = 0; i < max; i++) {
      setTimeout(function () {
        let drop = new Drop();
        drop.init();
        drops.push(drop);
      }, i * 100)
    }
  }

  function anim() {
    cancelAnimationFrame(stopAnimation)
    let now = Date.now()
    deltaTime = now - lastTime
    lastTime = now
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    for (let i = drops.length - 1; i > 0; i--) {
      drops[i].draw()
    }

    stopAnimation  = requestAnimationFrame(anim)
  }

  const start = () =>{
    init()
    stopAnimation = requestAnimationFrame(anim)
  }

  const stop = () => {
    cancelAnimationFrame(stopAnimation)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  }

  return { start, stop }
}
