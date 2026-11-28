const STEP = Math.PI / 5;
const W = 1000, H = 430, CX = 500, R = 468, RY = 76, TOP = 105, PANEL = 164;
// Representative pixel colors sampled from the local logo assets.
const BRAND_COLORS = {
  PowerMowers: ['#373737', '#616161'],
  Cupid: ['#f87387', '#2bcbd4'],
  Kisaan: ['#feed00', '#e31e25'],
  Hubhawks: ['#ba0100', '#ba0100'],
  ETravelSim: ['#46ba7b', '#0976bb'],
  'Don Miller': ['#040404', '#282828'],
  Core: ['#354b37', '#334734'],
  Uberlyfe: ['#e9b04b', '#227bcd'],
};
export function getResultsRingTop(canvas) {
  const bounds = canvas.getBoundingClientRect();
  return bounds.top + bounds.height * (TOP - RY) / H;
}
const wrap = (n, length) => ((n % length) + length) % length;

export function createResultsRing(canvas, stories, onSelect) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  let disposed = false, phase = 1, light = 1, reducedMotion = false;
  const textures = stories.map((story) => {
    const [primary, secondary] = BRAND_COLORS[story.name];
    const surface = document.createElement('canvas');
    surface.width = 600; surface.height = 360;
    const c = surface.getContext('2d');
    const draw = (logo) => {
      const bg = c.createLinearGradient(0, 0, 600, 360);
      bg.addColorStop(0, '#fdfcfe'); bg.addColorStop(.65, '#faf7fd'); bg.addColorStop(1, '#e4dcea');
      c.fillStyle = bg; c.fillRect(0, 0, 600, 360);
      c.strokeStyle = '#73647e'; c.lineWidth = 8; c.strokeRect(0, 0, 600, 360);
      c.strokeStyle = '#fdfcfe'; c.lineWidth = 2; c.strokeRect(7, 7, 586, 346);
      if (logo) {
        const scale = Math.min(340 / logo.naturalWidth, 88 / logo.naturalHeight);
        c.drawImage(logo, 46, 42, logo.naturalWidth * scale, logo.naturalHeight * scale);
      } else {
        c.fillStyle = '#2a1650'; c.font = 'bold 36px Arial'; c.fillText(story.name, 42, 98);
      }
      story.metrics.forEach((metric, i) => {
        const x = 104 + i * 196;
        if (i) { c.strokeStyle = '#cdbbdc'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 98, 187); c.lineTo(x - 98, 270); c.stroke(); }
        c.textAlign = 'center'; c.fillStyle = '#2a1650'; c.font = 'bold 48px Arial'; c.fillText(metric, x, 222, 174);
        c.font = '22px Arial'; c.fillStyle = '#73647e'; c.fillText(['Sales', 'Spend', story.finalLabel || 'ROAS'][i], x, 257, 177);
      });
      c.textAlign = 'left'; c.fillStyle = primary; c.beginPath(); c.moveTo(0, 325); c.bezierCurveTo(130, 355, 200, 292, 300, 318); c.bezierCurveTo(440, 353, 470, 280, 600, 309); c.lineTo(600,360); c.lineTo(0,360); c.fill();
      c.fillStyle = secondary; c.globalAlpha = primary === secondary ? .2 : .65; c.beginPath(); c.moveTo(0,343); c.bezierCurveTo(200,300,400,366,600,326); c.lineTo(600,360);c.lineTo(0,360);c.fill();c.globalAlpha=1;
      if (!disposed) render();
    };
    // Wait until the textures array exists before the first render.
    queueMicrotask(() => draw());
    if (story.logo) {
      const logo = new Image();
      logo.onload = () => { if (!disposed) draw(logo); };
      logo.src = story.logo;
    }
    return surface;
  });
  function frontPath(y, thickness) {
    ctx.beginPath();
    for (let i=0;i<=100;i++) { const a=-Math.PI/2+i*Math.PI/100; const x=CX+R*Math.sin(a), py=y+RY*Math.cos(a); if(i===0)ctx.moveTo(x,py);else ctx.lineTo(x,py); }
    for (let i=100;i>=0;i--) { const a=-Math.PI/2+i*Math.PI/100;ctx.lineTo(CX+R*Math.sin(a),y+RY*Math.cos(a)+thickness); }
    ctx.closePath();
  }
  function rail(y) {
    const gradient=ctx.createLinearGradient(0,y,0,y+RY+24);
    [[0,'#eee8f3'],[.22,'#a69bb5'],[.45,'#fdfcfe'],[.55,'#d8cfdf'],[.8,'#a69bb5'],[1,'#73647e']].forEach(([p,c])=>gradient.addColorStop(p,c));
    frontPath(y,18);ctx.fillStyle=gradient;ctx.fill();
    ctx.beginPath();for(let i=0;i<=100;i++){const a=-Math.PI/2+i*Math.PI/100; const x=CX+R*Math.sin(a),py=y+RY*Math.cos(a);if(i===0)ctx.moveTo(x,py);else ctx.lineTo(x,py);}ctx.strokeStyle='#fdfcfe';ctx.lineWidth=3;ctx.stroke();
  }
  function lamps(y, rear=false) {
    ctx.save();ctx.lineCap='round';ctx.lineWidth=5;
    for(let i=0;i<16;i++) {
      const angle=i*Math.PI/8-phase*STEP;
      if ((Math.cos(angle)<0)!==rear) continue;
      ctx.beginPath();
      for(let j=0;j<=10;j++){const a=angle-.033+j*.0066;const x=CX+(R-8)*Math.sin(a),py=y+RY*Math.cos(a);if(j===0)ctx.moveTo(x,py);else ctx.lineTo(x,py);}
      // One soft travelling pulse, staggered per lamp; tied to the existing motion clock.
      const pulse = reducedMotion ? 1 : .05 + .95 * Math.pow((1 + Math.cos((phase - 1) * 7 * 1.6 - i * .8 + (rear ? .4 : 0))) / 2, 4);
      const glow = light * pulse;
      ctx.shadowBlur = 0; ctx.lineWidth = 4; ctx.strokeStyle = '#73647e'; ctx.stroke();
      if (glow > .005) {
        ctx.shadowColor = '#a58bc9'; ctx.shadowBlur = 11 * glow;
        ctx.strokeStyle = 'rgba(165,139,201,' + glow + ')'; ctx.lineWidth = 2.8; ctx.stroke();
        ctx.shadowBlur = 3 * glow; ctx.strokeStyle = 'rgba(253,252,254,' + glow + ')'; ctx.lineWidth = 1.6; ctx.stroke();
      }
    }
    ctx.restore();
  }
  function render() {
    if(disposed)return;
    ctx.clearRect(0,0,W,H);
    ctx.save();ctx.translate(CX,TOP+RY+PANEL+27);ctx.scale(1,.095);
    const shadow=ctx.createRadialGradient(0,0,100,0,0,490);shadow.addColorStop(0,'#2a16504a');shadow.addColorStop(.55,'#2a165025');shadow.addColorStop(1,'#2a165000');
    ctx.fillStyle=shadow;ctx.fillRect(-500,-500,1000,1000);ctx.restore();
    // One continuous cylinder behind the card textures; there are no floating panels.
    frontPath(TOP+12,PANEL+22);ctx.fillStyle='#73647e';ctx.fill();
    // Recessed opening and visible inner metal wall make this an annular ring, not a disc.
    const cavity=ctx.createLinearGradient(0,TOP-RY,0,TOP+RY);
    cavity.addColorStop(0,'#73647e');cavity.addColorStop(.26,'#a69bb5');cavity.addColorStop(.7,'#c6bbd1');cavity.addColorStop(1,'#e4dcea');
    ctx.beginPath();ctx.ellipse(CX,TOP,R-8,RY-2,0,0,Math.PI*2);ctx.fillStyle=cavity;ctx.fill();
    ctx.beginPath();ctx.ellipse(CX,TOP+13,R-30,RY-13,0,Math.PI,Math.PI*2);ctx.strokeStyle='#73647e';ctx.lineWidth=13;ctx.stroke();
    const lip=ctx.createLinearGradient(0,TOP-RY,0,TOP+RY);
    lip.addColorStop(0,'#fdfcfe');lip.addColorStop(.28,'#c6bbd1');lip.addColorStop(.55,'#a69bb5');lip.addColorStop(.85,'#fdfcfe');lip.addColorStop(1,'#eee8f3');
    ctx.beginPath();ctx.ellipse(CX,TOP,R,RY,0,0,Math.PI*2);ctx.ellipse(CX,TOP,R-29,RY-13,0,0,Math.PI*2,true);ctx.fillStyle=lip;ctx.fill('evenodd');
    ctx.beginPath();ctx.ellipse(CX,TOP,R-29,RY-13,0,0,Math.PI*2);ctx.strokeStyle='#806394';ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();ctx.ellipse(CX,TOP,R,RY,0,0,Math.PI*2);ctx.strokeStyle='#fdfcfe';ctx.lineWidth=2;ctx.stroke();
    lamps(TOP+5,true);
    // Map narrow texture strips onto the same elliptical cylinder as both metal rims.
    const slices=440;
    for(let n=0;n<slices;n++) {
      const a=-Math.PI/2+n*Math.PI/slices,b=-Math.PI/2+(n+1)*Math.PI/slices;
      const position=phase+a/STEP;
      const slot=Math.floor(position+.5),u=position-slot+.5;
      const texture=textures[wrap(slot,stories.length)];
      const x=CX+R*Math.sin(a),nextX=CX+R*Math.sin(b);
      const y=TOP+18+RY*Math.cos(a);
      const nextY=TOP+18+RY*Math.cos(b);
      const sourceWidth=Math.min(600-u*600,600*(b-a)/STEP+1);
      ctx.save();ctx.transform(1,(nextY-y)/Math.max(.01,nextX-x),0,1,x,y);
      ctx.drawImage(texture,u*600,0,Math.max(.1,sourceWidth),360,0,0,nextX-x+.65,PANEL);
      ctx.fillStyle='rgba(42,22,80,'+(Math.pow(Math.abs(Math.sin(a)),5)*.14)+')';ctx.fillRect(0,0,nextX-x+.65,PANEL);
      ctx.restore();
    }
    rail(TOP+18+PANEL);lamps(TOP+18+PANEL+9);
    rail(TOP);lamps(TOP+9);
    // A thin illuminated seam follows the selected curved panel, rather than a flat outline.
    if(light>.01){
      const center=(Math.round(phase)-phase)*STEP;
      ctx.save();ctx.strokeStyle='rgba(165,139,201,'+light*.85+')';ctx.lineWidth=2;ctx.shadowColor='#a58bc9';ctx.shadowBlur=7*light;
      for(const edge of [-.5,.5]){const a=center+edge*STEP;const x=CX+R*Math.sin(a),y=TOP+19+RY*Math.cos(a);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y+PANEL-2);ctx.stroke();}ctx.restore();
    }
  }
  function resize() { const ratio=Math.min(window.devicePixelRatio||1,1.75);canvas.width=Math.round(canvas.clientWidth*ratio);canvas.height=Math.round(canvas.clientHeight*ratio);ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);render(); }
  const observer=new ResizeObserver(resize);observer.observe(canvas);
  const click=(event)=>{const box=canvas.getBoundingClientRect();const x=(event.clientX-box.left)/box.width*W;const y=(event.clientY-box.top)/box.height*H;const a=Math.asin(Math.max(-1,Math.min(1,(x-CX)/R)));const top=TOP+18+RY*Math.cos(a);if(y>=top&&y<=top+PANEL)onSelect(wrap(Math.round(phase+a/STEP),stories.length));};
  canvas.addEventListener('click',click);resize();
  return { render(nextPhase,nextLight,reduce=false){phase=nextPhase;light=nextLight;reducedMotion=reduce;render();},dispose(){disposed=true;observer.disconnect();canvas.removeEventListener('click',click);} };
}
