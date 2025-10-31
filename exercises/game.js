// Minimal platformer: move with ← →, jump with Space, collect letters to increase score
const G = document.getElementById('game'), P = document.getElementById('player'), SCORE = document.getElementById('score');
const W = G.clientWidth, H = G.clientHeight;
let score = 0;
// player state
const player = { x:40, y:360, w:20, h:36, vx:0, vy:0, onGround:false };
const GRAV = 0.8, FRICTION = 0.85, MOVE = 3.2, JUMP = -14;

// simple level platforms
const platforms = [
  {x:0,y:420,w:880},
  {x:120,y:340,w:180},
  {x:360,y:280,w:140},
  {x:560,y:220,w:220},
  {x:720,y:340,w:120}
];

// create platform nodes
platforms.forEach(p => {
  const d = document.createElement('div'); d.className='platform'; d.style.left = p.x+'px'; d.style.top = p.y+'px'; d.style.width = p.w+'px'; G.appendChild(d);
});

// collectibles: place on some platforms
let collects = [];
function randLetter(){ const a = 'abcdefghijklmnopqrstuvwxyz'; let c = a[Math.floor(Math.random()*a.length)]; return c=== 'i' ? 'j' : c; }

function spawnCollects(){
  // remove old collect nodes
  collects.forEach(c=>{ try{ c.el.remove(); }catch(e){} }); collects = [];
  [1,2,3,4].forEach((_,i)=>{
    const p = platforms[(i+1)%platforms.length];
    const cEl = document.createElement('div'); cEl.className = 'collect';
    cEl.textContent = randLetter();
    const startX = p.x + 20 + i*30;
    const startY = p.y - 28;
    cEl.style.left = startX + 'px'; cEl.style.top = startY + 'px'; G.appendChild(cEl);
    // give each collect a small horizontal patrol range on its platform
    const minX = p.x + 10;
    const maxX = p.x + Math.max(40, p.w - 30);
    const vx = (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random()*1.2);
    collects.push({el: cEl, x: startX, y: startY, vx, minX, maxX});
  });
}

// initial spawn
spawnCollects();

// input
const keys = {left:false,right:false,up:false};
window.addEventListener('keydown', e=>{
  if(e.code==='ArrowLeft') keys.left=true;
  if(e.code==='ArrowRight') keys.right=true;
  if(e.code==='Space'){ if(player.onGround){ player.vy = JUMP; player.onGround=false; } e.preventDefault(); }
  if(e.code==='KeyR') { resetGame(); }
});
window.addEventListener('keyup', e=>{ if(e.code==='ArrowLeft') keys.left=false; if(e.code==='ArrowRight') keys.right=false; });

function rect(a){ return {l:a.x, r:a.x+a.w, t:a.y, b:a.y+a.h}; }
function intersect(r1,r2){ return !(r2.l>r1.r||r2.r<r1.l||r2.t>r1.b||r2.b<r1.t); }

// reset / restart game state
function resetGame(){
  // reset player
  player.x = 40; player.y = 360; player.vx = 0; player.vy = 0; player.onGround = false;
  P.style.left = player.x + 'px'; P.style.top = player.y + 'px';
  // reset score
  score = 0; SCORE.textContent = score;
  // respawn collectibles
  spawnCollects();
}

function update(){
  // horizontal input
  if(keys.left) player.vx = Math.max(player.vx - 0.6, -MOVE*1.5);
  else if(keys.right) player.vx = Math.min(player.vx + 0.6, MOVE*1.5);
  else player.vx *= FRICTION;

  player.vy += GRAV; // gravity
  player.x += player.vx; player.y += player.vy;

  // bounds
  if(player.x < 0){ player.x = 0; player.vx = 0; }
  if(player.x + player.w > G.clientWidth){ player.x = G.clientWidth - player.w; player.vx = 0; }
  if(player.y + player.h > G.clientHeight){ player.y = G.clientHeight - player.h; player.vy = 0; player.onGround = true; }

  // platform collision (simple: check when falling)
  player.onGround = false;
  const pr = rect(player);
  platforms.forEach(p=>{
    const plat = {l:p.x, r:p.x+p.w, t:p.y, b:p.y+14};
    if(pr.r > plat.l && pr.l < plat.r){
      // check coming down onto platform
      if(player.vy >= 0 && pr.b > plat.t && (player.y - player.vy) + player.h <= plat.t + 6){
        player.y = plat.t - player.h; player.vy = 0; player.onGround = true;
      }
    }
  });

  // update player element
  P.style.left = player.x + 'px'; P.style.top = player.y + 'px';

  // collectibles collision
  // move collectibles (patrol) and check collision
  collects.forEach(c => {
    c.x += c.vx;
    if(c.x < c.minX || c.x > c.maxX){ c.vx *= -1; c.x = Math.max(c.minX, Math.min(c.x, c.maxX)); }
    c.el.style.left = c.x + 'px';
  });
  collects = collects.filter(c=>{
    const crect = {l:c.x, r:c.x + c.el.offsetWidth, t:c.y, b:c.y + c.el.offsetHeight};
    if(intersect(pr, crect)){
      c.el.remove(); score++; SCORE.textContent = score; return false;
    }
    return true;
  });

  requestAnimationFrame(update);
}

// start
requestAnimationFrame(update);
