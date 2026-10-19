import React from 'react'

// A mouse-reactive iridescent fluid rendered in WebGL (no dependencies).
// The cursor warps the flow of a domain-warped fractal-noise field, giving a
// liquid / glass feel similar to the references. Colours come from a cosine
// palette; everything is generated in the shader, so no image asset is needed.

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse; // eased, normalized 0..1

float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
vec3 palette(float t){
  return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}
void main(){
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv; p.x *= aspect;
  vec2 m = uMouse; m.x *= aspect;

  float t = uTime * 0.05;
  vec2 toM = p - m;
  float pull = 0.35 / (1.0 + 6.0 * dot(toM, toM)); // stronger warp near cursor

  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p * 1.6 + 2.0 * q + t + toM * pull),
    fbm(p * 1.6 + 2.0 * q + vec2(8.3, 2.8) - t - toM * pull)
  );
  float f = fbm(p * 1.6 + 2.0 * r);

  vec3 col = palette(f + 0.25 * length(r) + t * 0.5);
  col = mix(col, vec3(0.02, 0.0, 0.06), 0.15);          // deepen shadows
  col += 0.12 * smoothstep(0.5, 0.0, length(toM));       // glow at cursor
  gl_FragColor = vec4(col, 1.0);
}
`

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return s
}

const FluidBackground: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) {
      canvas.style.background =
        'linear-gradient(135deg,#3a1c71,#5f2c82,#2b5876,#1e4d6b)'
      return
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
    const uTime = gl.getUniformLocation(prog, 'uTime')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')

    const SCALE = 0.6 // render below native res; soft noise upscales cleanly
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * SCALE))
      const h = Math.max(1, Math.floor(canvas.clientHeight * SCALE))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    // eased mouse
    const target = { x: 0.5, y: 0.5 }
    const eased = { x: 0.5, y: 0.5 }
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    resize()

    const start = performance.now()
    let raf = 0
    const loop = () => {
      resize()
      eased.x += (target.x - eased.x) * 0.03
      eased.y += (target.y - eased.y) * 0.03
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, eased.x, eased.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="FluidBackground" />
}

export default FluidBackground
