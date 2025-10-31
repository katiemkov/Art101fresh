const title = 'Hydration PSA', description = 'Remember to drink water throughout the day to stay hydrated and healthy!', backgroundColor = '#a0d8f1';
const elements = ['fire','water','earth','air'], locations = ['your room','classroom','park','gym'];
const environment = { title, description, backgroundColor, elements, locations, weather: { temperatureC: 18, condition: 'partly cloudy', humidityPercent: 60 }, 
sounds: ['dripping','wind','distant traffic'] };
const characters = [ { id: 'frogwater', name: 'Hydro the Frog', role: 'mascot', likes: ['water','flies'], position: { x: 120, y: 80 } }, 
{ id: 'waterdrop', name: 'Dew Drop', role: 'helper', likes: ['sunlight'], position: { x: 200, y: 50 } } ];
const randomFrom = a => a[Math.floor(Math.random()*a.length)];
const randomElement = randomFrom(elements), randomLocation = randomFrom(locations);
try{ if(typeof module!=='undefined') module.exports = { environment, characters }; }catch(e){}

document.addEventListener('DOMContentLoaded', () => {
  try{
    const bg = ['#fff8dc','#e6f7ff','#f0fff0','#fff0f6'];
    characters.forEach((ch,i)=>{
      const img = document.getElementById(ch.id); if(!img) return;
      const wrapper = img.closest('.char-wrapper') || (function(){ const w=document.createElement('div'); w.className='char-wrapper'; 
        Object.assign(w.style,{display:'inline-flex',alignItems:'center',gap:'10px'}); img.parentNode.insertBefore(w,img); w.appendChild(img); return w; })();
      const box = document.createElement('div'); box.className='char-info-box'; 
      Object.assign(box.style,{background:bg[i%bg.length],padding:'8px',minWidth:'140px',fontSize:'16px',display:'inline-block',verticalAlign:'top'});
      ['Name: '+ch.name,'Role: '+ch.role,'Likes: '+ch.likes.join(', ')].forEach((t,idx)=>{ const d=document.createElement('div'); if(idx===0) d.style.fontWeight='600'; 
        if(idx===3){ d.style.fontSize='0.85rem'; d.style.opacity='0.85'; } d.textContent=t; box.appendChild(d); });
      img.insertAdjacentElement('afterend',box);
    });
  }catch(err){ console.error('Error creating character boxes:', err); }
});

// lab 05 stuff
document.addEventListener('DOMContentLoaded', () => {
  const frog = document.getElementById('frogwater');
  if (!frog) return;
  const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'Pet Frog';
  frog.after(btn);
  btn.onclick = () => {
    const rib = document.createElement('span'); rib.textContent = ' ribbit'; btn.after(rib);
    setTimeout(() => rib.remove(), 1500);
  };
});

