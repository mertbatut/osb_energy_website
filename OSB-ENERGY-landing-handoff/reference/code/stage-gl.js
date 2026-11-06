function osbStageGL(canvas, nightSrc, sunSrc, colors) {
  const T = window.THREE;
  if (T.ColorManagement) T.ColorManagement.legacyMode = false;
  const renderer = new T.WebGLRenderer({ canvas: canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = T.sRGBEncoding;
  const scene = new T.Scene();
  const cam = new T.OrthographicCamera(0, 1, 1, 0, -10, 10);
  const IW = 836, IH = 470;
  const loader = new T.TextureLoader();
  const mk = (src) => { const t = loader.load(src); t.minFilter = T.LinearFilter; t.generateMipmaps = false; return t; };
  const U = {
    tA: { value: mk(nightSrc) }, tB: { value: mk(sunSrc) },
    uMix: { value: 0 }, uDay: { value: 0 }, uOut: { value: 0 }, uTime: { value: 0 },
    uRes: { value: new T.Vector2(1, 1) }, uImg: { value: new T.Vector2(IW, IH) }, uZoom: { value: 1 },
    uSweep: { value: new T.Color(colors.accent) }
  };
  const mat = new T.ShaderMaterial({
    uniforms: U,
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: [
      'uniform sampler2D tA; uniform sampler2D tB; uniform float uMix; uniform float uDay; uniform float uOut; uniform float uTime; uniform vec2 uRes; uniform vec2 uImg; uniform float uZoom; uniform vec3 uSweep; varying vec2 vUv;',
      'float h(float n){ return fract(sin(n)*43758.5453); }',
      'float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); float a=h(i.x+i.y*57.0), b=h(i.x+1.0+i.y*57.0), c=h(i.x+(i.y+1.0)*57.0), d=h(i.x+1.0+(i.y+1.0)*57.0); return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }',
      'vec2 cover(vec2 uv){ float s = max(uRes.x/uImg.x, uRes.y/uImg.y) * uZoom; return (uv - 0.5) * uRes / (uImg * s) + 0.5; }',
      'void main(){',
      '  vec2 uv = cover(vUv);',
      '  float g = uOut * step(0.93, h(floor(vUv.y*70.0) + floor(uTime*18.0)));',
      '  uv.x += g * (h(floor(uTime*30.0)+vUv.y) - 0.5) * 0.06;',
      '  float ca = uOut * 0.004;',
      '  vec3 A = vec3(texture2D(tA, uv + vec2(ca,0.0)).r, texture2D(tA, uv).g, texture2D(tA, uv - vec2(ca,0.0)).b);',
      '  vec3 B = texture2D(tB, uv).rgb;',
      '  float lum = dot(B, vec3(0.299,0.587,0.114));',
      '  B = mix(B, mix(vec3(lum), B, 0.5) * 1.12, uDay);',
      '  float nz = n2(vUv*vec2(6.0,3.0) + uTime*0.15) * 0.18;',
      '  float edge = uMix * 1.4 - 0.2;',
      '  float x = vUv.x + nz;',
      '  float m = smoothstep(edge - 0.12, edge, x);',
      '  vec3 col = mix(B, A, m);',
      '  float band = exp(-pow((x - edge + 0.06) * 14.0, 2.0)) * step(0.02, uMix) * step(uMix, 0.98);',
      '  col += uSweep * band * 0.55;',
      '  float l2 = dot(col, vec3(0.299,0.587,0.114));',
      '  col = mix(col, vec3(l2) * vec3(0.8,0.85,0.95) * 0.55, uOut * 0.85);',
      '  col += uOut * g * 0.15;',
      '  vec2 vv = vUv - 0.5; col *= 1.0 - dot(vv, vv) * 0.55;',
      '  gl_FragColor = vec4(col, 1.0);',
      '}'
    ].join('\n'),
    depthWrite: false, depthTest: false
  });
  const quad = new T.Mesh(new T.PlaneGeometry(1, 1), mat); quad.position.set(0.5, 0.5, 0); scene.add(quad);

  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c);
  })();
  const pts = (n, size) => {
    const geo = new T.BufferGeometry(); const pos = new Float32Array(n * 3);
    geo.setAttribute('position', new T.BufferAttribute(pos, 3));
    const m = new T.PointsMaterial({ size: size, map: glowTex, transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending, sizeAttenuation: false, color: 0xffffff, opacity: 0 });
    const p = new T.Points(geo, m); p.frustumCulled = false; scene.add(p);
    return { geo: geo, pos: pos, mat: m, n: n };
  };
  // görüntü koordinatları (piksel, sol-üst): [gece, gün batımı]
  const lerpPt = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const LED = [
    [[[243, 203], [445, 177]], [[250, 219], [461, 189]]],
    [[[247, 347], [445, 365]], [[248, 368], [461, 385]]],
    [[[243, 203], [247, 347]], [[250, 219], [248, 368]]]
  ];
  const PATH_IN = [[[790, 335], [735, 333], [690, 340], [640, 355], [600, 372]], [[820, 360], [760, 365], [700, 372], [650, 380], [615, 388]]];
  const PATH_OUT = [[[600, 375], [650, 380], [700, 378], [760, 370], [820, 365]], [[615, 388], [650, 378], [680, 362], [700, 345], [705, 330]]];
  const led = pts(90, 28);
  const flow = pts(420, 9);
  const heads = pts(14, 34);
  const seeds = Array.from({ length: 420 }, () => [Math.random(), (Math.random() - 0.5) * 10, 0.7 + Math.random() * 0.6]);
  const hseeds = Array.from({ length: 14 }, (_, i) => [i / 14, 0, 1]);

  let W = 1, H = 1, scale = 1;
  const toScreen = (p) => {
    const s = Math.max(W / IW, H / IH) * U.uZoom.value;
    const x = (p[0] - IW / 2) * s / W + 0.5; const y = (IH / 2 - p[1]) * s / H + 0.5;
    return [x, y];
  };
  const resize = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    if (r.width === W && r.height === H) return;
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    renderer.setSize(W, H, false); U.uRes.value.set(W, H);
  };
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement); resize();

  const C = { charge: new T.Color(colors.charge), accent: new T.Color(colors.accent) };
  const phases = [
    { mix: 0, day: 0, out: 0, flow: 'in', fc: 'charge', led: 'charge', ledI: 1 },
    { mix: 1, day: 1, out: 0, flow: null, fc: 'charge', led: 'charge', ledI: 0.25 },
    { mix: 1, day: 0, out: 0, flow: 'out', fc: 'accent', led: 'accent', ledI: 1 },
    { mix: 0, day: 0, out: 1, flow: 'out', fc: 'accent', led: 'accent', ledI: 1 }
  ];
  let phase = 0; let flowA = 0; let prog = 0; let time = 0; let last = performance.now(); let raf = 0; let visible = true;
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }); io.observe(canvas);
  const along = (path, t, out) => {
    const segs = path.length - 1; const f = Math.min(segs - 1e-6, t * segs); const i = Math.floor(f); const k = f - i;
    out[0] = path[i][0] + (path[i + 1][0] - path[i][0]) * k; out[1] = path[i][1] + (path[i + 1][1] - path[i][1]) * k; return out;
  };
  const tmp = [0, 0];
  const tick = (now) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
    if (!visible) return;
    time += dt; const ph = phases[phase];
    U.uTime.value = time;
    U.uMix.value += (ph.mix - U.uMix.value) * Math.min(1, dt * 1.6);
    U.uDay.value += (ph.day - U.uDay.value) * Math.min(1, dt * 2);
    U.uOut.value += (ph.out - U.uOut.value) * Math.min(1, dt * 6);
    const mt = U.uMix.value;
    // LED
    const lc = ph.led === 'accent' ? C.accent : C.charge;
    led.mat.color.lerp(lc, 0.06);
    const pulse = phase === 3 ? (Math.sin(time * 22) > 0 ? 1 : 0.2) : 0.75 + Math.sin(time * (phase === 2 ? 3 : 1.6)) * 0.25;
    led.mat.opacity += ((ph.ledI * pulse * 0.55) - led.mat.opacity) * 0.12;
    let k = 0;
    LED.forEach((seg) => {
      const a = lerpPt(seg[0][0], seg[1][0], mt), b = lerpPt(seg[0][1], seg[1][1], mt);
      for (let i = 0; i < 30; i++, k++) { const t = i / 29; const s = toScreen([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); led.pos[k * 3] = s[0]; led.pos[k * 3 + 1] = s[1]; }
    });
    led.geo.attributes.position.needsUpdate = true;
    // akış
    flowA += ((ph.flow ? 1 : 0) - flowA) * Math.min(1, dt * 3);
    const fc = C[ph.fc]; flow.mat.color.lerp(fc, 0.08); heads.mat.color.lerp(fc, 0.08);
    flow.mat.opacity = flowA * 0.9; heads.mat.opacity = flowA;
    prog += dt * (phase === 3 ? 0.55 : 0.28);
    const path = (ph.flow === 'out' ? PATH_OUT : PATH_IN).map(() => 0);
    const P0 = ph.flow === 'out' ? PATH_OUT[0] : PATH_IN[0]; const P1 = ph.flow === 'out' ? PATH_OUT[1] : PATH_IN[1];
    const P = P0.map((p, i) => lerpPt(p, P1[i], mt));
    const upd = (S, sd) => {
      for (let i = 0; i < S.n; i++) {
        const u = (sd[i][0] + prog * sd[i][2]) % 1; along(P, u, tmp);
        const s = toScreen([tmp[0], tmp[1] + sd[i][1] * 0.6 * Math.sin(time * 2 + i)]);
        S.pos[i * 3] = s[0]; S.pos[i * 3 + 1] = s[1];
      }
      S.geo.attributes.position.needsUpdate = true;
    };
    if (flowA > 0.01) { upd(flow, seeds); upd(heads, hseeds); }
    renderer.render(scene, cam);
  };
  raf = requestAnimationFrame(tick);
  return {
    setPhase: (i) => { phase = i; },
    setZoom: (z) => { U.uZoom.value = z; },
    setColors: (cc) => { C.charge.set(cc.charge); C.accent.set(cc.accent); U.uSweep.value.set(cc.accent); },
    dispose: () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); renderer.dispose(); }
  };
}
