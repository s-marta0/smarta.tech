import React from 'react'

// Full-screen video textured into WebGL and displaced by a flowing noise
// field that reacts to the cursor — a liquid / glass distortion of the reel.
// The video must be same-origin (served from /public) so WebGL may read it.

type Props = {
  src?: string
  intensity?: number
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uVideoRes;
uniform float uTime;
uniform vec2 uMouse;      // eased, normalized 0..1
uniform float uIntensity;
uniform float uActivity;  // 0 = still (calm) .. 1 = moving (active)
uniform sampler2D uTex;

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float sAspect = uResolution.x / uResolution.y;
  float vAspect = uVideoRes.x / uVideoRes.y;

  // cover-fit the video into the screen
  vec2 cuv = uv;
  if (sAspect > vAspect) {
    cuv.y = (uv.y - 0.5) * (vAspect / sAspect) + 0.5;
  } else {
    cuv.x = (uv.x - 0.5) * (sAspect / vAspect) + 0.5;
  }

  // liquid droplet lens centered on (and following) the cursor
  vec2 d = uv - uMouse; d.x *= sAspect;
  float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);

  float R = 0.5;                              // radius of the droplet (bigger)
  float k = clamp(dist / R, 0.0, 1.0);        // 0 at cursor -> 1 at the rim
  float lens = sin(k * 3.14159);              // main droplet refraction

  // feedback ripples radiating in a ring around the droplet
  float R2 = 0.95;                            // reach of the surrounding ripples
  float falloff = smoothstep(R2, 0.05, dist);
  float ripples = sin(dist * 34.0 - uTime * 4.5) * falloff * 0.4;

  float wobble = 1.0 + 0.15 * sin(uTime * 2.0 + dist * 22.0); // subtle liquid life
  // organic: calm when still, disturbed when the cursor moves
  float amt = lens * (0.06 + 0.94 * uActivity) + ripples * uActivity;
  vec2 o = dir * amt * uIntensity * wobble;
  gl_FragColor = texture2D(uTex, cuv + o);
}
`

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

const DisplacedVideo: React.FC<Props> = ({ src = '/showreel.mp4', intensity = 0.05 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null

    // hidden video element (some browsers need it attached to play)
    const video = document.createElement('video')
    video.src = src
    video.muted = true
    video.loop = true
    video.playsInline = true
    ;(video as any).setAttribute('playsinline', '')
    video.autoplay = true
    Object.assign(video.style, {
      position: 'fixed', width: '1px', height: '1px',
      opacity: '0', pointerEvents: 'none', left: '0', top: '0', zIndex: '-1',
    })
    document.body.appendChild(video)
    const tryPlay = () => video.play().catch(() => {})
    tryPlay()

    if (!gl) {
      canvas.style.background = '#000'
      return () => { video.remove() }
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uResolution')
    const uVideoRes = gl.getUniformLocation(prog, 'uVideoRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')
    const uIntensity = gl.getUniformLocation(prog, 'uIntensity')
    const uActivity = gl.getUniformLocation(prog, 'uActivity')

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const SCALE = 0.8
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE))
      const h = Math.max(1, Math.floor(canvas.clientHeight * SCALE))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const target = { x: 0.5, y: 0.5 }
    const eased = { x: 0.5, y: 0.5 }
    const onMove = (e: { clientX: number; clientY: number }) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      target.x = e.clientX / w
      target.y = 1 - e.clientY / h
    }
    // capture phase (true) fires before anything can stopPropagation
    window.addEventListener('mousemove', onMove, true)
    window.addEventListener('pointermove', onMove, true)
    document.addEventListener('mousemove', onMove, true)
    document.addEventListener('pointermove', onMove, true)
    window.addEventListener('resize', resize)
    resize()

    const start = performance.now()
    let prevX = 0.5, prevY = 0.5, activity = 0
    let raf = 0
    const loop = () => {
      resize()
      if (video.readyState >= 2 && video.videoWidth) {
        try {
          gl.bindTexture(gl.TEXTURE_2D, tex)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
          gl.uniform2f(uVideoRes, video.videoWidth, video.videoHeight)
        } catch (err) { /* keep the loop alive even if a frame upload fails */ }
      }
      eased.x += (target.x - eased.x) * 0.18
      eased.y += (target.y - eased.y) * 0.18
      // movement energy -> activity, with a smooth decay when still
      const speed = Math.hypot(eased.x - prevX, eased.y - prevY)
      prevX = eased.x; prevY = eased.y
      activity = Math.min(1, activity + speed * 14)
      activity *= 0.92
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, eased.x, eased.y)
      gl.uniform1f(uIntensity, intensity)
      gl.uniform1f(uActivity, activity)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove, true)
      window.removeEventListener('pointermove', onMove, true)
      document.removeEventListener('mousemove', onMove, true)
      document.removeEventListener('pointermove', onMove, true)
      window.removeEventListener('resize', resize)
      video.pause()
      video.remove()
    }
  }, [src, intensity])

  return <canvas ref={canvasRef} className="FluidBackground" />
}

export default DisplacedVideo
