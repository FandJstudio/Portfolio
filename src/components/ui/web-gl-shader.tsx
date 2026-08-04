"use client";

import { useEffect, useRef } from "react";

/*
  Animated light ribbon: a horizontal sine wave rendered as an inverse-distance
  glow, sampled three times at slightly different horizontal offsets so the
  edges separate the way a lens splits light.

  Ported from the three.js version of this effect and run on raw WebGL instead.
  The whole thing is one fragment shader on a fullscreen triangle, so a scene
  graph library would add several hundred kilobytes to draw a two dimensional
  gradient on a site that sells page speed.

  Lifecycle notes, learned the hard way:

  - Teardown deletes the GL objects it created and nothing else. It must NOT
    call WEBGL_lose_context.loseContext(). Switching locale unmounts this
    component and mounts a fresh one, and forcing the old context to die while
    the new canvas is asking the driver for one hands the new canvas a context
    that is already lost. The visible result was a blank hero after every
    language change.

  - A context can also be dropped by the browser on its own, so both the lost
    and restored events are handled and the scene rebuilds itself.

  The ribbon runs for everyone, including visitors whose system asks for
  reduced motion. That is the studio's call, made knowingly: it used to draw a
  single frame and hold still for them, which read as a broken page rather than
  a considered one. Everything else on the site still honours the setting - the
  entrance animations are dropped entirely - so this is the one moving thing
  that ignores it, and nothing is hidden behind it or conveyed by its motion.
*/

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform float xScale;
uniform float yScale;
uniform float distortion;
out vec4 fragColor;

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float d = length(p) * distortion;

  float ax = p.x * (1.0 + d);
  float bx = p.x;
  float cx = p.x * (1.0 - d);

  float a = 0.05 / abs(p.y + sin((ax + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
  float c = 0.05 / abs(p.y + sin((cx + time) * xScale) * yScale);

  /*
    Brand mapping. The original split the three samples into pure red, green and
    blue, which gives a rainbow ribbon. Here all three keep red at full strength
    and only differ in how much green and blue they carry, so the split runs
    along one ramp: brand red at the fringes, white at the core.
  */
  vec3 col = vec3(0.0);
  col += vec3(1.00, 0.16, 0.18) * a;
  col += vec3(1.00, 0.48, 0.44) * b;
  col += vec3(1.00, 0.92, 0.90) * c;
  col *= 0.42;

  // Dither, or the falloff into black bands on cheap panels.
  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5) - 0.5;
  fragColor = vec4(col + grain * 0.014, 1.0);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export type WebGLShaderProps = {
  className?: string;
  /** Horizontal frequency of the wave. Higher packs more crests across. */
  xScale?: number;
  /** Vertical travel of the wave, as a fraction of the shorter edge. */
  yScale?: number;
  /** Strength of the chromatic split at the edges. */
  distortion?: number;
  /** Time multiplier. Lower drifts more slowly. */
  speed?: number;
};

export function WebGLShader({
  className,
  xScale = 1,
  yScale = 0.5,
  distortion = 0.05,
  speed = 0.5,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /*
    Read through a ref so changing a uniform never tears down the GL context.
    Written in an effect, not during render: mutating a ref while rendering is
    unsafe once React is allowed to render concurrently.
  */
  const settings = useRef({ xScale, yScale, distortion, speed });
  useEffect(() => {
    settings.current = { xScale, yScale, distortion, speed };
  }, [xScale, yScale, distortion, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGL2RenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vert: WebGLShader | null = null;
    let frag: WebGLShader | null = null;
    let buffer: WebGLBuffer | null = null;
    let uResolution: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uXScale: WebGLUniformLocation | null = null;
    let uYScale: WebGLUniformLocation | null = null;
    let uDistortion: WebGLUniformLocation | null = null;

    let frame = 0;
    let running = false;
    let disposed = false;

    const resize = () => {
      if (!gl || gl.isContextLost()) return;
      /* Capped at 1.5: this is a soft glow, extra pixels buy nothing. */
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    const draw = (elapsed: number) => {
      if (!gl || gl.isContextLost()) return;
      const s = settings.current;
      gl.uniform1f(uTime, elapsed * s.speed);
      gl.uniform1f(uXScale, s.xScale);
      gl.uniform1f(uYScale, s.yScale);
      gl.uniform1f(uDistortion, s.distortion);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time * 0.001);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const init = () => {
      gl = canvas.getContext("webgl2", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
      });
      if (!gl || gl.isContextLost()) return false;

      vert = compile(gl, gl.VERTEX_SHADER, VERT);
      frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vert || !frag) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vert);
      gl.attachShader(program, frag);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return false;
      }
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      uResolution = gl.getUniformLocation(program, "resolution");
      uTime = gl.getUniformLocation(program, "time");
      uXScale = gl.getUniformLocation(program, "xScale");
      uYScale = gl.getUniformLocation(program, "yScale");
      uDistortion = gl.getUniformLocation(program, "distortion");

      resize();
      canvas.dataset.ready = "true";
      return true;
    };

    const releaseGlObjects = () => {
      if (!gl || gl.isContextLost()) return;
      if (program) gl.deleteProgram(program);
      if (vert) gl.deleteShader(vert);
      if (frag) gl.deleteShader(frag);
      if (buffer) gl.deleteBuffer(buffer);
      program = vert = frag = buffer = null;
    };

    const onContextLost = (event: Event) => {
      /* Preventing the default is what makes a restore possible at all. */
      event.preventDefault();
      stop();
      delete canvas.dataset.ready;
    };

    const onContextRestored = () => {
      if (disposed) return;
      if (init()) start();
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );

    const resizeObserver = new ResizeObserver(resize);

    if (init()) {
      observer.observe(canvas);
      start();
      resizeObserver.observe(canvas);
    }

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      releaseGlObjects();
      /*
        No loseContext() here on purpose. See the note at the top of the file:
        killing the outgoing context poisons the one the next mount receives.
      */
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      /*
        The dark base is not decoration. A canvas whose context never came up
        composites as a pale rectangle, which on this page reads as a white slab
        where the hero should be. Painting the element itself means the worst
        case is a still red glow on black rather than a hole in the layout.
      */
      className={`block size-full bg-background bg-[radial-gradient(70%_45%_at_50%_50%,color-mix(in_oklch,var(--brand)_40%,transparent),transparent_75%)] ${className ?? ""}`}
    />
  );
}
