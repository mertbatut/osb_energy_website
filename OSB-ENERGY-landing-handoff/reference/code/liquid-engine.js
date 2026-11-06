(()=>{var D=Object.defineProperty;var S=(u,e,t)=>e in u?D(u,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[e]=t;var r=(u,e,t)=>S(u,typeof e!="symbol"?e+"":e,t);function x(u,e,t){return Math.min(t,Math.max(e,u))}const P=`
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }
vec2 ambientField(vec2 uv, float t){
  vec2 q = uv*vec2(3.2,1.7);
  vec2 a = vec2(vnoise(q+vec2(t*0.11,0.0))-0.5, vnoise(q+vec2(5.2,t*0.08)+3.1)-0.5);
  vec2 q2 = uv*vec2(7.5,4.0) + vec2(-t*0.19, t*0.13);
  vec2 b = vec2(vnoise(q2+1.7)-0.5, vnoise(q2+9.3)-0.5);
  return a + b*0.45;
}
`,I=`
float energyAt(vec2 rectPx, vec2 mouse, float radius, float presence, float wakeEnergy){
  vec2 d = rectPx - mouse;
  float f = exp(-dot(d,d)/(radius*radius))*presence;
  return smoothstep(0.06, 0.5, f*1.15 + wakeEnergy*1.7);
}
`,_=`#version 300 es
layout(location=0) in vec2 aPos;
out vec2 vUv;
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }
`,L=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform vec2 uSize;
uniform float uRadius;
uniform float uPresence;
uniform float uDecay;
vec2 decV(vec4 c){ return (c.rg*255.0-128.0)/127.0; }
void main(){
  vec2 v0 = decV(texture(uPrev, vUv));
  vec2 uv = vUv - v0*uTexel*2.5;
  vec4 c = texture(uPrev, uv)*0.52
    + 0.12*(texture(uPrev, uv+vec2(uTexel.x,0.0)) + texture(uPrev, uv-vec2(uTexel.x,0.0))
          + texture(uPrev, uv+vec2(0.0,uTexel.y)) + texture(uPrev, uv-vec2(0.0,uTexel.y)));
  vec2 v = decV(c);
  float p = c.b;
  vec2 d = (vUv-uMouse)*uSize;
  float f = exp(-dot(d,d)/(uRadius*uRadius))*uPresence;
  float sp = clamp(length(uVel)*2.5, 0.0, 1.0);
  v += uVel*f*0.22;
  p = max(p, f*sp);
  v *= uDecay;
  p *= uDecay;
  v = sign(v)*max(abs(v)-1.2/127.0, 0.0);
  p = max(p-1.2/255.0, 0.0);
  v = clamp(v, -1.0, 1.0);
  o = vec4((v*127.0+128.0)/255.0, p, 1.0);
}
`,U=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uFlow;
uniform vec2 uSize;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uStrength;
uniform float uSpread;
uniform float uTurb;
uniform float uReturn;
uniform float uTime;
uniform float uDt;
uniform float uIntro;
${P}
vec2 curl(vec2 p){
  const float e = 0.35;
  float a = vnoise(p+vec2(0.0,e)) - vnoise(p-vec2(0.0,e));
  float b = vnoise(p+vec2(e,0.0)) - vnoise(p-vec2(e,0.0));
  return vec2(a, -b)/(2.0*e);
}
void main(){
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec4 hm = texelFetch(uHome, ij, 0);
  if(hm.w <= 0.0){ o = vec4(0.0); return; }
  vec4 st = texelFetch(uState, ij, 0);
  vec2 off = st.xy;
  vec2 vel = st.zw;
  float sd = hm.z;
  float light = 0.45 + sd*1.1;

  vec2 p = hm.xy*uSize + off;
  vec4 fl = texture(uFlow, clamp(p/uSize, 0.0, 1.0));
  vec2 wake = (fl.rg*255.0-128.0)/127.0;
  float pr = fl.b;

  vec2 toM = p - uMouse;
  float r2 = dot(toM,toM);
  float f = exp(-r2/(uRadius*uRadius))*uPresence;
  vec2 n = toM*inversesqrt(r2+1.0);
  float e = clamp(pr*2.0 + f, 0.0, 1.0);

  vec2 acc = vec2(0.0);
  // blown outward and swirled around the cursor
  acc += n*f*1.25*uStrength*uSpread*light;
  acc += vec2(-n.y, n.x)*f*1.45*uStrength*uSpread*(0.4+sd);
  // carried by the liquid wake
  acc += (wake*42.0*uSpread*light - vel)*e*0.08;
  // curl-noise turbulence where the material is disturbed (and during the intro)
  vec2 q = p*0.0095 + vec2(uTime*0.35, -uTime*0.2);
  vec2 c = curl(q) + 0.5*curl(q*2.3 + 7.1);
  acc += c*(e*1.2*uSpread + uIntro*1.5)*uTurb*light;
  // elastic return home
  float k = (0.006 + 0.02*uReturn)*(0.65+sd*0.7)*(1.0 - uIntro*0.75);
  acc -= off*k;

  vel += acc*uDt;
  vel *= pow(mix(0.93, 0.955, e), uDt);
  off += vel*uDt;
  if(dot(off,off) < 0.0004 && dot(vel,vel) < 0.0004){ off = vec2(0.0); vel = vec2(0.0); }
  o = vec4(off, vel);
}
`,B=`#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
uniform sampler2D uState;
uniform sampler2D uHome;
uniform sampler2D uCol;
uniform sampler2D uFlow;
uniform int uTexW;
uniform vec4 uRect;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uPresence;
uniform float uDot;
uniform float uTime;
uniform float uAmbient;
uniform float uStreak;
uniform float uIntroVis;
uniform float uRest;
uniform vec3 uTint;
out vec2 vLocal;
out float vHalfLen;
out float vR;
out vec3 vCol;
out float vA;
${P}
${I}
void main(){
  int id = gl_InstanceID;
  ivec2 ij = ivec2(id % uTexW, id / uTexW);
  vec4 hm = texelFetch(uHome, ij, 0);
  vec4 st = texelFetch(uState, ij, 0);
  vec4 cl = texelFetch(uCol, ij, 0);

  float wakeE = texture(uFlow, hm.xy).b;
  float E = energyAt(hm.xy*uRect.zw, uMouse, uRadius, uPresence, wakeE);
  float lift = smoothstep(0.35, 2.5, length(st.xy));
  float a = max(max(E, lift), max(uRest, 1.0-uIntroVis));
  if(a < 0.01 || hm.w <= 0.0){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }

  vec2 base = uRect.xy + hm.xy*uRect.zw + st.xy;
  base -= ambientField(hm.xy, uTime)*10.0*uAmbient;

  vec2 v = st.zw;
  float sp = length(v);
  vec2 dir = sp > 0.001 ? v/sp : vec2(1.0,0.0);
  float r = uDot*hm.w*0.5;
  float len = min(sp*1.25, 18.0)*uStreak;
  vec2 lc = aCorner*vec2(r + len*0.5 + 1.0, r + 1.0);
  vec2 center = base - dir*len*0.5;
  vec2 world = center + dir*lc.x + vec2(-dir.y, dir.x)*lc.y;

  vec2 clip = world/uRes*2.0-1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  vLocal = lc;
  vHalfLen = len*0.5;
  vR = r;
  vec3 col = cl.rgb*uTint;
  // fast material catches the light, like liquid metal
  float glint = smoothstep(2.0, 16.0, sp);
  col = mix(col, min(col*1.18 + vec3(0.07,0.075,0.085), vec3(1.0)), glint*0.75);
  vCol = col;
  vA = a;
}
`,G=`#version 300 es
precision highp float;
in vec2 vLocal;
in float vHalfLen;
in float vR;
in vec3 vCol;
in float vA;
uniform float uDpr;
out vec4 o;
void main(){
  vec2 q = vec2(max(abs(vLocal.x)-vHalfLen, 0.0), vLocal.y);
  float d = length(q) - vR;
  float a = clamp(0.5 - d*uDpr, 0.0, 1.0);
  // comet tail: the trailing end thins out
  float tail = vHalfLen > 0.0 ? clamp(0.5 - vLocal.x/(2.0*(vHalfLen+vR)), 0.0, 1.0) : 0.0;
  a *= 1.0 - tail*0.55;
  a *= vA;
  if(a < 0.004) discard;
  o = vec4(vCol*a, a);
}
`,X=`#version 300 es
precision highp float;
out vec4 o;
uniform sampler2D uImg;
uniform sampler2D uFlow;
uniform vec2 uRes;
uniform float uDpr;
uniform vec4 uRect;
uniform vec3 uBg;
uniform vec3 uImgBg;
uniform vec2 uMouse;
uniform float uPresence;
uniform float uRadius;
uniform float uStrength;
uniform float uTime;
uniform float uAmbient;
uniform float uIntroVis;
uniform float uRest;
uniform float uAlphaMode;
${P}
${I}
void main(){
  vec2 px = vec2(gl_FragCoord.x, uRes.y*uDpr - gl_FragCoord.y)/uDpr;
  vec2 size = uRect.zw;
  vec2 uv = (px-uRect.xy)/size;
  if(uv.x < -0.05 || uv.x > 1.05 || uv.y < -0.12 || uv.y > 1.12){ o = vec4(0.0); return; }
  vec4 fl = texture(uFlow, clamp(uv,0.0,1.0));
  vec2 vel = (fl.rg*255.0-128.0)/127.0;
  vec2 rp = uv*size;
  vec2 toM = rp - uMouse;
  float fall = exp(-dot(toM,toM)/(uRadius*uRadius))*uPresence;
  vec2 disp = -toM*0.22*uStrength*fall - vel*10.0*uStrength;
  disp += ambientField(uv, uTime)*10.0*uAmbient;
  vec2 suv = uv + disp/size;
  vec4 tx = texture(uImg, suv);
  vec3 col = tx.rgb;
  vec2 e = smoothstep(vec2(0.0), vec2(0.004,0.01), suv) * smoothstep(vec2(1.0), vec2(0.996,0.99), suv);
  // cut-out images carry their own alpha; flat-background images are keyed by colour
  float key = uAlphaMode > 0.5 ? tx.a : smoothstep(0.012, 0.05, length(col-uImgBg));
  float k = key*e.x*e.y;
  float E = energyAt(rp, uMouse, uRadius, uPresence, fl.b);
  float show = (1.0 - max(E, uRest))*uIntroVis;
  vec3 mat = uAlphaMode > 0.5 ? col : col*(uBg/max(uImgBg, vec3(0.001)));
  // premultiplied: empty areas stay transparent so the page (and the backdrop word) shows through
  float A = k*show;
  o = vec4(mat*A, A);
}
`;function M(u,e,t){const i=(m,d)=>{const v=u.createShader(m);if(u.shaderSource(v,d),u.compileShader(v),!u.getShaderParameter(v,u.COMPILE_STATUS)){const R=u.getShaderInfoLog(v);throw u.deleteShader(v),new Error("Shader: "+R)}return v},s=u.createProgram(),o=i(u.VERTEX_SHADER,e),a=i(u.FRAGMENT_SHADER,t);if(u.attachShader(s,o),u.attachShader(s,a),u.bindAttribLocation(s,0,"aPos"),u.linkProgram(s),u.deleteShader(o),u.deleteShader(a),!u.getProgramParameter(s,u.LINK_STATUS))throw new Error("Link: "+u.getProgramInfoLog(s));const c={},n=u.getProgramParameter(s,u.ACTIVE_UNIFORMS);for(let m=0;m<n;m++){const d=u.getActiveUniform(s,m);d&&(c[d.name]=u.getUniformLocation(s,d.name))}return{p:s,u:c}}const E=1024,H=270;class W{constructor(e,t,i){r(this,"lastImage",null);r(this,"onFirstFrame",null);r(this,"canvas");r(this,"gl");r(this,"opts");r(this,"onFail");r(this,"lowPower",!1);r(this,"stateFormat",{internal:0,type:0});r(this,"pFlow");r(this,"pSim");r(this,"pPart");r(this,"pImg");r(this,"vao");r(this,"quad");r(this,"imgTex",null);r(this,"flowTex",[]);r(this,"flowFb",[]);r(this,"flowW",256);r(this,"flowH",104);r(this,"flowIdx",0);r(this,"flowDirty",!1);r(this,"homeTex",null);r(this,"colTex",null);r(this,"stateTex",[]);r(this,"stateFb",[]);r(this,"stateIdx",0);r(this,"texH",1);r(this,"n",0);r(this,"gridW",1);r(this,"stateDirty",!1);r(this,"alphaMode",!1);r(this,"imgBg",[.918,.914,.906]);r(this,"flowing",0);r(this,"aspect",2.5);r(this,"rect",{x:0,y:0,w:1,h:1});r(this,"cssW",1);r(this,"cssH",1);r(this,"target",{x:-9999,y:-9999});r(this,"mouse",{x:-9999,y:-9999});r(this,"prevMouse",{x:-9999,y:-9999});r(this,"mvel",{x:0,y:0});r(this,"presence",0);r(this,"presenceTarget",0);r(this,"burst",0);r(this,"lastInput",-1e9);r(this,"settle",1e9);r(this,"touchRelease",0);r(this,"time",0);r(this,"introT",1);r(this,"raf",0);r(this,"running",!1);r(this,"last",0);r(this,"skip",0);r(this,"visible",!0);r(this,"ready",!1);r(this,"destroyed",!1);r(this,"lost",!1);r(this,"onLost",e=>{e.preventDefault(),this.lost=!0,this.stop(),this.onFail()});r(this,"homeData",null);r(this,"frame",e=>{if(!this.running)return;const t=e-this.last,i=x(t/16.6667,.25,3);this.last=e;const s=this.opts,o=s.ambient&&!s.reducedMotion;this.touchRelease&&e>this.touchRelease&&(this.presenceTarget=0,this.touchRelease=0);const a=1-Math.pow(1-.22,i);this.mouse.x+=(this.target.x-this.mouse.x)*a,this.mouse.y+=(this.target.y-this.mouse.y)*a;const c=(this.mouse.x-this.prevMouse.x)/i,n=(this.mouse.y-this.prevMouse.y)/i;this.prevMouse.x=this.mouse.x,this.prevMouse.y=this.mouse.y,this.mvel.x+=(x(c,-60,60)-this.mvel.x)*.5,this.mvel.y+=(x(n,-60,60)-this.mvel.y)*.5;const m=this.presenceTarget>this.presence?.1:.035;this.presence+=(this.presenceTarget-this.presence)*(1-Math.pow(1-m,i)),this.presence<.001&&this.presenceTarget===0&&(this.presence=0);const d=this.presenceTarget>this.flowing?.05:.018;this.flowing+=(this.presenceTarget-this.flowing)*(1-Math.pow(1-d,i)),this.flowing<.002&&this.presenceTarget===0&&(this.flowing=0),this.introT<1&&(this.introT=Math.min(1,this.introT+Math.min(t,100)/3200));const v=this.presence>.001||this.burst>0;if(this.settle=v?0:this.settle+i,!(v||this.settle<H||this.introT<1)){if(this.flowDirty&&this.clearFlow(),this.stateDirty&&this.clearState(),!o){this.draw(),this.firstFrame(),this.stop();return}if(this.raf=requestAnimationFrame(this.frame),this.skip++%2)return;this.time+=i*2*s.speed/60,this.draw(),this.firstFrame();return}this.raf=requestAnimationFrame(this.frame),this.time+=i*s.speed*(1+this.flowing*1.6)/60,this.stepFlow(i),this.stepSim(i),this.burst=Math.max(0,this.burst-.1*i),this.draw(),this.firstFrame()});this.canvas=e,this.opts=t,this.onFail=i;const s=e.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!s)throw new Error("WebGL2 unavailable");this.gl=s;const o=navigator;this.lowPower=(o.hardwareConcurrency||8)<=4||(o.deviceMemory||8)<=4||window.matchMedia("(pointer: coarse)").matches,this.initGL(),e.addEventListener("webglcontextlost",this.onLost,!1)}initGL(){const e=this.gl,t=e.getExtension("EXT_color_buffer_float"),i=t?null:e.getExtension("EXT_color_buffer_half_float");if(!t&&!i)throw new Error("No float render targets");this.stateFormat={internal:e.RGBA16F,type:e.HALF_FLOAT},this.pFlow=M(e,_,L),this.pSim=M(e,_,U),this.pPart=M(e,B,G),this.pImg=M(e,_,X),this.vao=e.createVertexArray(),e.bindVertexArray(this.vao),this.quad=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.quad),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);for(let s=0;s<2;s++){const o=this.makeTex(e.RGBA8,this.flowW,this.flowH,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o,0),this.flowTex.push(o),this.flowFb.push(a)}this.clearFlow()}makeTex(e,t,i,s,o,a,c){const n=this.gl,m=n.createTexture();return n.bindTexture(n.TEXTURE_2D,m),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texImage2D(n.TEXTURE_2D,0,e,t,i,0,s,o,a),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,c),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,c),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),m}clearFlow(){const e=this.gl;for(const t of this.flowFb)e.bindFramebuffer(e.FRAMEBUFFER,t),e.viewport(0,0,this.flowW,this.flowH),e.clearColor(128/255,128/255,0,1),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null),this.flowDirty=!1}clearState(){const e=this.gl;for(const t of this.stateFb)e.bindFramebuffer(e.FRAMEBUFFER,t),e.viewport(0,0,E,this.texH),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null),this.stateDirty=!1}setImage(e){if(this.destroyed||this.lost)return;const t=this.gl;this.lastImage=e,this.aspect=e.naturalWidth/e.naturalHeight||2.5,this.flowH=Math.max(32,Math.round(this.flowW/this.aspect));for(const i of this.flowTex)t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,this.flowW,this.flowH,0,t.RGBA,t.UNSIGNED_BYTE,null);this.clearFlow(),this.imgTex&&t.deleteTexture(this.imgTex),this.imgTex=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.imgTex),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),this.buildParticles(e),this.ready=!0,this.opts.intro&&!this.opts.reducedMotion&&this.startIntro(),this.wake()}buildParticles(e){const t=this.gl,i=this.lowPower?640:1e3,s=Math.round(i*Math.sqrt(x(this.opts.density,.15,2))),o=Math.max(1,Math.round(s/this.aspect));this.gridW=s;let a;try{const h=document.createElement("canvas");h.width=s,h.height=o;const p=h.getContext("2d",{willReadFrequently:!0});p.imageSmoothingQuality="high",p.drawImage(e,0,0,s,o),a=p.getImageData(0,0,s,o).data}catch{throw new Error("Image is not CORS-readable")}let c=0;for(let h=3;h<a.length;h+=4*7)a[h]<250&&c++;if(this.alphaMode=c>a.length/(4*7)/20,this.opts.imgBg)this.imgBg=this.opts.imgBg;else if(!this.alphaMode){let h=0,p=0,T=0,w=0;const g=Math.max(2,Math.round(s*.012));for(const[f,l]of[[0,0],[s-g,0],[0,o-g],[s-g,o-g]])for(let F=l;F<l+g;F++)for(let b=f;b<f+g;b++){const A=(F*s+b)*4;h+=a[A],p+=a[A+1],T+=a[A+2],w++}this.imgBg=[h/w/255,p/w/255,T/w/255]}const n=[],m=[];for(let h=0;h<o;h++)for(let p=0;p<s;p++){const T=(h*s+p)*4,w=a[T]/255,g=a[T+1]/255,f=a[T+2]/255;if(this.alphaMode){const b=a[T+3]/255;if(b<.12||b<.5&&Math.random()>b*2)continue}else{const b=Math.hypot(w-this.imgBg[0],g-this.imgBg[1],f-this.imgBg[2]);if(b<.03||b<.07&&Math.random()>(b-.03)/.04)continue}const l=(Math.random()-.5)*.6,F=(Math.random()-.5)*.6;n.push((p+.5+l)/s,(h+.5+F)/o,Math.random(),.85+Math.random()*.3),m.push(a[T],a[T+1],a[T+2],255)}const d=n.length/4;this.n=d,this.texH=Math.max(1,Math.ceil(d/E));const v=E*this.texH,R=new Float32Array(v*4);R.set(n);const y=new Uint8Array(v*4);y.set(m);for(const h of[this.homeTex,this.colTex,...this.stateTex])h&&t.deleteTexture(h);for(const h of this.stateFb)t.deleteFramebuffer(h);this.stateTex=[],this.stateFb=[],this.homeTex=this.makeTex(t.RGBA32F,E,this.texH,t.RGBA,t.FLOAT,R,t.NEAREST),this.colTex=this.makeTex(t.RGBA8,E,this.texH,t.RGBA,t.UNSIGNED_BYTE,y,t.NEAREST);for(let h=0;h<2;h++){const p=this.makeTex(this.stateFormat.internal,E,this.texH,t.RGBA,this.stateFormat.type,null,t.NEAREST),T=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,T),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,p,0),t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE)throw new Error("Float FBO incomplete");this.stateTex.push(p),this.stateFb.push(T)}t.bindFramebuffer(t.FRAMEBUFFER,null),this.homeData=R,this.clearState()}startIntro(){const e=this.gl,t=this.homeData;if(!t)return;const i=this.rect.w>10?this.rect.w:1300,s=E*this.texH,o=new Float32Array(s*4);for(let a=0;a<this.n;a++){const c=t[a*4]-.5,n=t[a*4+1]-.5,m=t[a*4+2],d=(Math.random()-.5)*.9+(c>0?0:Math.PI),v=i*(.04+Math.random()*.14)*(.5+Math.abs(c)*1.4);o[a*4]=Math.cos(d)*v+c*i*.25*m,o[a*4+1]=Math.sin(d)*v*.55+n*120*(Math.random()-.5)}e.bindTexture(e.TEXTURE_2D,this.stateTex[this.stateIdx]),e.texImage2D(e.TEXTURE_2D,0,this.stateFormat.internal,E,this.texH,0,e.RGBA,e.FLOAT,o),this.introT=0,this.stateDirty=!0}setOptions(e){const t=e.density!==void 0&&e.density!==this.opts.density||e.imgBg!==void 0&&String(e.imgBg)!==String(this.opts.imgBg);if(this.opts={...this.opts,...e},t&&this.ready&&this.lastImage)try{this.buildParticles(this.lastImage)}catch{this.onFail()}this.wake()}resize(e,t,i){this.cssW=Math.max(1,e),this.cssH=Math.max(1,t),this.rect=i;let s=Math.min(window.devicePixelRatio||1,this.lowPower?1.5:2);this.cssW*this.cssH*s*s>45e5&&(s=Math.max(1,Math.sqrt(45e5/(this.cssW*this.cssH))));const a=Math.round(this.cssW*s),c=Math.round(this.cssH*s);(this.canvas.width!==a||this.canvas.height!==c)&&(this.canvas.width=a,this.canvas.height=c),this.draw()}setVisible(e){this.visible=e,e?this.wake():this.stop()}pointer(e,t,i,s){if(!this.opts.interactive||this.lost)return;const o=performance.now();if(e==="leave"||e==="up"){s?this.touchRelease=o+260:this.presenceTarget=0,this.wake();return}(this.mouse.x<-9e3||e==="down")&&(this.mouse.x=this.prevMouse.x=t,this.mouse.y=this.prevMouse.y=i),this.target.x=t,this.target.y=i,this.presenceTarget=1,this.lastInput=o,this.settle=0,e==="down"&&(this.burst=1,this.touchRelease=0),this.wake()}wake(){if(!this.ready||this.running||!this.visible||this.destroyed||this.lost){this.ready&&!this.running&&this.draw();return}this.running=!0,this.last=performance.now(),this.raf=requestAnimationFrame(this.frame)}stop(){this.running=!1,cancelAnimationFrame(this.raf)}radiusPx(){return this.opts.radius*x(this.rect.w/1400,.6,1.25)}strength(){return this.opts.strength*(this.opts.reducedMotion?.5:1)}firstFrame(){if(this.onFirstFrame){const e=this.onFirstFrame;this.onFirstFrame=null,requestAnimationFrame(()=>e())}}stepFlow(e){const t=this.gl,i=this.pFlow,s=1-this.flowIdx;t.bindFramebuffer(t.FRAMEBUFFER,this.flowFb[s]),t.viewport(0,0,this.flowW,this.flowH),t.disable(t.BLEND),t.useProgram(i.p),t.bindVertexArray(this.vao),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.flowTex[this.flowIdx]),t.uniform1i(i.u.uPrev,0),t.uniform2f(i.u.uTexel,1/this.flowW,1/this.flowH);const o=this.rect;t.uniform2f(i.u.uMouse,(this.mouse.x-o.x)/o.w,(this.mouse.y-o.y)/o.h),t.uniform2f(i.u.uVel,x(this.mvel.x/40,-1,1),x(this.mvel.y/40,-1,1)),t.uniform2f(i.u.uSize,o.w,o.h),t.uniform1f(i.u.uRadius,this.radiusPx()),t.uniform1f(i.u.uPresence,Math.max(this.presence,this.burst)),t.uniform1f(i.u.uDecay,Math.pow(.968,e)),t.drawArrays(t.TRIANGLE_STRIP,0,4),this.flowIdx=s,this.flowDirty=!0}stepSim(e){if(!this.n)return;const t=this.gl,i=this.pSim,s=this.opts,o=this.rect,a=1-this.stateIdx,c=s.reducedMotion||!s.intro?0:Math.pow(1-this.introT,2);t.bindFramebuffer(t.FRAMEBUFFER,this.stateFb[a]),t.viewport(0,0,E,this.texH),t.disable(t.BLEND),t.useProgram(i.p),t.bindVertexArray(this.vao),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.stateTex[this.stateIdx]),t.uniform1i(i.u.uState,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.homeTex),t.uniform1i(i.u.uHome,1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,this.flowTex[this.flowIdx]),t.uniform1i(i.u.uFlow,2),t.uniform2f(i.u.uSize,o.w,o.h),t.uniform2f(i.u.uMouse,this.mouse.x-o.x,this.mouse.y-o.y),t.uniform1f(i.u.uRadius,this.radiusPx()),t.uniform1f(i.u.uPresence,Math.max(this.presence,this.burst)),t.uniform1f(i.u.uStrength,this.strength()*(1+this.burst*1.5)),t.uniform1f(i.u.uSpread,x(s.spread,0,2)),t.uniform1f(i.u.uTurb,x(s.turbulence,0,2)*(s.reducedMotion?.3:1)),t.uniform1f(i.u.uReturn,x(s.returnSpeed,0,2)),t.uniform1f(i.u.uTime,this.time),t.uniform1f(i.u.uDt,e),t.uniform1f(i.u.uIntro,c),t.drawArrays(t.TRIANGLE_STRIP,0,4),this.stateIdx=a,this.stateDirty=!0}draw(){if(!this.ready||this.lost||this.destroyed)return;const e=this.gl,t=this.opts,i=this.rect,s=t.reducedMotion,o=s||!t.intro?1:Math.pow(this.introT,2.2),c=(t.ambient&&!s?x(t.ambientIntensity,0,2):0)+this.flowing*.85*x(t.liquid,0,2)*(s?.3:1),n=t.restStyle==="particles"?1:0,[m,d,v]=t.bg,[R,y,h]=this.imgBg,p=this.canvas.width/this.cssW,T=Math.max(this.presence,this.burst),w=this.mouse.x-i.x,g=this.mouse.y-i.y;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.canvas.width,this.canvas.height),e.bindVertexArray(this.vao),e.disable(e.BLEND);const f=this.pImg;if(e.useProgram(f.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.imgTex),e.uniform1i(f.u.uImg,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.flowTex[this.flowIdx]),e.uniform1i(f.u.uFlow,1),e.uniform2f(f.u.uRes,this.cssW,this.cssH),e.uniform1f(f.u.uDpr,p),e.uniform4f(f.u.uRect,i.x,i.y,i.w,i.h),e.uniform3f(f.u.uBg,m,d,v),e.uniform3f(f.u.uImgBg,R,y,h),e.uniform2f(f.u.uMouse,w,g),e.uniform1f(f.u.uPresence,T),e.uniform1f(f.u.uRadius,this.radiusPx()),e.uniform1f(f.u.uStrength,this.strength()),e.uniform1f(f.u.uTime,this.time),e.uniform1f(f.u.uAmbient,c),e.uniform1f(f.u.uIntroVis,o),e.uniform1f(f.u.uRest,n),e.uniform1f(f.u.uAlphaMode,this.alphaMode?1:0),e.drawArrays(e.TRIANGLE_STRIP,0,4),!this.n||!this.stateDirty&&n===0&&o>=1)return;const l=this.pPart;e.useProgram(l.p),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.stateTex[this.stateIdx]),e.uniform1i(l.u.uState,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,this.homeTex),e.uniform1i(l.u.uHome,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,this.colTex),e.uniform1i(l.u.uCol,2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,this.flowTex[this.flowIdx]),e.uniform1i(l.u.uFlow,3),e.uniform1i(l.u.uTexW,E),e.uniform4f(l.u.uRect,i.x,i.y,i.w,i.h),e.uniform2f(l.u.uRes,this.cssW,this.cssH),e.uniform2f(l.u.uMouse,w,g),e.uniform1f(l.u.uRadius,this.radiusPx()),e.uniform1f(l.u.uPresence,T);const F=i.w/this.gridW;e.uniform1f(l.u.uDot,F*1.45*x(t.dotSize,.2,3)),e.uniform1f(l.u.uTime,this.time),e.uniform1f(l.u.uAmbient,c),e.uniform1f(l.u.uStreak,(t.streaks?1:0)*(.45+.55*o)),e.uniform1f(l.u.uIntroVis,o),e.uniform1f(l.u.uRest,n),e.uniform1f(l.u.uDpr,p),this.alphaMode?e.uniform3f(l.u.uTint,1,1,1):e.uniform3f(l.u.uTint,m/Math.max(R,.001),d/Math.max(y,.001),v/Math.max(h,.001)),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,this.n),e.disable(e.BLEND)}destroy(){var t;this.destroyed=!0,this.stop(),this.canvas.removeEventListener("webglcontextlost",this.onLost);const e=this.gl;if(!this.lost){e.deleteBuffer(this.quad),e.deleteVertexArray(this.vao);for(const i of[...this.flowTex,...this.stateTex,this.imgTex,this.homeTex,this.colTex])i&&e.deleteTexture(i);for(const i of[...this.flowFb,...this.stateFb])e.deleteFramebuffer(i);for(const i of[this.pFlow,this.pSim,this.pPart,this.pImg])i&&e.deleteProgram(i.p)}(t=e.getExtension("WEBGL_lose_context"))==null||t.loseContext()}}window.OSBLiquidEngine=W;})();
