import { isSafari } from 'react-device-detect'

const WIDTH = 500
const HEIGHT = 100
const PERIODS = 2
const AMPLITUDE = 40
const FRAMES = 30
const FPS = 30
const LOOPS: number = 3

const wavePath = (phase: number, step = 2) => {
  const points: string[] = []

  for (let x = 0; x <= WIDTH; x += step) {
    const y = HEIGHT / 2 - AMPLITUDE * Math.sin((x / WIDTH) * PERIODS * 2 * Math.PI - phase)
    points.push(`${x},${y.toFixed(2)}`)
  }

  return `M${points.join(' L')}`
}

const buildSvg = (phase: number) => [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">`,
  `<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>`,
  `<path d="${wavePath(phase)}" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round"/>`,
  '</svg>',
].join('')

const frameStyle = (svg: string) => {
  const uri = `data:image/svg+xml;base64,${window.btoa(svg)}`

  return [
    'font-size:1px',
    'color:transparent',
    `line-height:${HEIGHT}px`,
    `padding:${HEIGHT / 2}px ${WIDTH / 2}px`,
    `background:url("${uri}") no-repeat`,
    `background-size:${WIDTH}px ${HEIGHT}px`,
  ].join(';')
}

const logFrame = (phase: number) => console.log('%c ', frameStyle(buildSvg(phase)))

const consoleSineWave = () => {
  try {
    // Safari ignores background images in console CSS, so the frame would be blank
    if (isSafari) return
    // CRA fast refresh re-runs this module on save; without the guard intervals stack up
    if ((window as any).__sineWave) return
    ;(window as any).__sineWave = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || LOOPS === 0) {
      logFrame(0)
      return
    }

    const total = FRAMES * LOOPS
    let frame = 0

    const timer = window.setInterval(() => {
      console.clear()
      logFrame((frame / FRAMES) * 2 * Math.PI)
      console.log('k')

      frame += 1
      if (frame >= total) window.clearInterval(timer)
    }, 1000 / FPS)
  } catch (e) {
    // console art is never worth breaking boot over
  }
}

export default consoleSineWave
