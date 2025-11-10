// Mini Quest: play as 'L' (Link), fight moblins (M), save the princess (P)
(function(){
  var G = document.getElementById('game');
  var PLY = document.getElementById('player');
  var HP = document.getElementById('hp');
  var MOBCOUNT = document.getElementById('mobcount');
  var message = document.getElementById('message');

  var keys = {left:false,right:false,up:false,down:false,attack:false};
  var player = {x:40,y:420,w:36,h:36,vx:0,vy:0, speed:2.6, hp:5, facing:'right'};
  var enemies = [];
  var maxEnemies = 4;
  var princess = null;
  var playing = true;

  // utility
  function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
  function rect(e){ return {l:e.x, r:e.x+e.w, t:e.y, b:e.y+e.h}; }
  function intersect(a,b){ return !(b.l>a.r||b.r<a.l||b.t>a.b||b.b<a.t); }

  // spawn princess
  function spawnPrincess(){
    var p = document.createElement('div'); p.className='entity princess'; p.textContent='P';
    p.style.left = '720px'; p.style.top = '60px'; G.appendChild(p);
    princess = {el:p,x:720,y:60,w:36,h:36};
  }

  // spawn enemies (moblins)
  function spawnEnemies(){
    for(var i=0;i<maxEnemies;i++){
      var ex = 200 + i*120;
      var ey = 100 + (i%2)*180;
      var el = document.createElement('div'); el.className='entity enemy'; el.textContent='M';
      el.style.left = ex+'px'; el.style.top = ey+'px'; G.appendChild(el);
      enemies.push({el:el,x:ex,y:ey,w:36,h:36,hp:2,vx:(Math.random()>0.5?0.6:-0.6)});
    }
    MOBCOUNT.textContent = enemies.length;
  }

  // reset game
  function reset(){
    // clear enemies/princess
    enemies.forEach(function(e){ try{e.el.remove();}catch(e){} }); enemies = [];
    if(princess && princess.el){ try{princess.el.remove();}catch(e){} }
    princess = null;
    // reset player
    player.x = 40; player.y = 420; player.vx = 0; player.vy = 0; player.hp = 5; player.facing = 'right';
    PLY.style.left = player.x+'px'; PLY.style.top = player.y+'px';
    HP.textContent = player.hp;
    // spawn
    spawnEnemies(); spawnPrincess(); playing = true; message.textContent = 'Defeat moblins and save the princess!';
  }

  // attack
  function doAttack(){
    if(!playing) return;
    var a = document.createElement('div'); a.className='attack';
    var ax = player.x + (player.facing==='right'? player.w : -28);
    var ay = player.y+4;
    a.style.left = ax+'px'; a.style.top = ay+'px'; G.appendChild(a);
    setTimeout(function(){ a.remove(); }, 180);
    // check hit
    enemies.forEach(function(en){
      var eRect = rect(en);
      var aRect = {l:ax, r:ax+28, t:ay, b:ay+28};
      if(intersect(eRect,aRect)){
        en.hp -= 1;
        if(en.hp <= 0){ en.el.remove(); en.dead = true; }
      }
    });
    enemies = enemies.filter(function(e){ return !e.dead; });
    MOBCOUNT.textContent = enemies.length;
  }

  // input handlers
  window.addEventListener('keydown', function(ev){
    if(ev.code==='ArrowLeft') keys.left = true;
    if(ev.code==='ArrowRight') keys.right = true;
    if(ev.code==='ArrowUp') keys.up = true;
    if(ev.code==='ArrowDown') keys.down = true;
    if(ev.code==='Space'){ keys.attack = true; ev.preventDefault(); }
    if(ev.code==='KeyR') reset();
  });
  window.addEventListener('keyup', function(ev){
    if(ev.code==='ArrowLeft') keys.left = false;
    if(ev.code==='ArrowRight') keys.right = false;
    if(ev.code==='ArrowUp') keys.up = false;
    if(ev.code==='ArrowDown') keys.down = false;
    if(ev.code==='Space'){ keys.attack = false; }
  });

  // game loop
  function update(){
    if(!playing) return;
    // movement
    var mx = 0, my = 0;
    if(keys.left) { mx = -player.speed; player.facing='left'; }
    if(keys.right) { mx = player.speed; player.facing='right'; }
    if(keys.up) { my = -player.speed; }
    if(keys.down) { my = player.speed; }
    // normalize diagonal
    if(mx !==0 && my !==0){ mx *= 0.707; my *= 0.707; }
    player.x = clamp(player.x + mx, 0, G.clientWidth - player.w);
    player.y = clamp(player.y + my, 0, G.clientHeight - player.h);
    PLY.style.left = player.x+'px'; PLY.style.top = player.y+'px';
    // attack
    if(keys.attack){ doAttack(); }

    // enemies AI: patrol and chase if near
    enemies.forEach(function(en){
      var dx = player.x - en.x, dy = player.y - en.y;
      var dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 160){ // chase
        en.vx += (dx>0?0.06:-0.06);
        en.vx = clamp(en.vx, -1.8, 1.8);
        en.x += en.vx; en.y += (dy>0?0.4:-0.4);
      } else {
        en.x += en.vx;
        // bounce on edges
        if(en.x < 0 || en.x > G.clientWidth - en.w){ en.vx *= -1; }
      }
      en.el.style.left = Math.round(en.x)+'px'; en.el.style.top = Math.round(en.y)+'px';
      // collision with player
      if(intersect(rect(player), rect(en))){
        // damage player
        player.hp -= 1; HP.textContent = player.hp; en.hp = 0; en.el.remove(); en.dead = true;
      }
    });
    enemies = enemies.filter(function(e){ return !e.dead; });
    MOBCOUNT.textContent = enemies.length;

    // check win (reach princess only if no enemies left)
    if(princess && enemies.length === 0){
      if(intersect(rect(player), rect(princess))){
        // win
        playing = false;
        var win = document.createElement('div'); win.className='win'; win.textContent='You saved the princess! 🎉 Press R to play again.'; document.body.appendChild(win);
      }
    }
    // check lose
    if(player.hp <= 0){ playing = false; var lose = document.createElement('div'); lose.className='win'; lose.textContent='You were defeated. Press R to try again.'; document.body.appendChild(lose); }

    requestAnimationFrame(update);
  }

  // start
  reset(); requestAnimationFrame(update);
})();
