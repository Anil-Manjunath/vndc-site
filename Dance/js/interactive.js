// Interactive UI: hero parallax and card tilt
(function(){
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');
  const heroText = document.querySelector('.hero-text');

  if(hero && heroVideo && heroText){
    let raf = null;
    hero.addEventListener('mousemove', (e)=>{
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if(raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        heroVideo.style.transform = `translate(${x * 10}px, ${y * 8}px) scale(1.02)`;
        heroText.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
      });
    });
    hero.addEventListener('mouseleave', ()=>{
      heroVideo.style.transform = '';
      heroText.style.transform = '';
    });
  }

  // Card tilt and sheen
  const cards = document.querySelectorAll('.interactive-card');
  cards.forEach(card=>{
    // ensure a sheen element exists
    if(!card.querySelector('.card-shine')){
      const shine = document.createElement('div');
      shine.className = 'card-shine';
      card.appendChild(shine);
    }

    const shine = card.querySelector('.card-shine');

    let width, height, rect;
    function updateBounds(){ rect = card.getBoundingClientRect(); width = rect.width; height = rect.height; }
    updateBounds();
    window.addEventListener('resize', updateBounds);

    function handleMove(e){
      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) / width - 0.5; // -0.5..0.5
      const y = (clientY - rect.top) / height - 0.5;
      const rotX = (y * 12).toFixed(2);
      const rotY = (x * -12).toFixed(2);
      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
      // update sheen position
      const posX = (x + 0.5) * 100;
      const posY = (y + 0.5) * 100;
      shine.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255,255,255,0.12), rgba(255,255,255,0) 30%)`;
    }

    function reset(){ card.style.transform = ''; shine.style.background = ''; }

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchstart', (e)=>{ updateBounds(); handleMove(e); }, {passive:true});
    card.addEventListener('touchmove', (e)=>{ handleMove(e); }, {passive:true});
    card.addEventListener('touchend', reset);
  });

  // Gentle section tilt for larger sections
  const sections = document.querySelectorAll('.interactive-section');
  sections.forEach(section=>{
    let rect = section.getBoundingClientRect();
    let w = rect.width, h = rect.height;
    function updateBounds(){ rect = section.getBoundingClientRect(); w = rect.width; h = rect.height; }
    window.addEventListener('resize', updateBounds);

    function handle(e){
      const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
      const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) / w - 0.5; // -0.5..0.5
      const y = (clientY - rect.top) / h - 0.5;
      const rotX = (y * 6).toFixed(2);
      const rotY = (x * -6).toFixed(2);
      section.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
    }
    function resetS(){ section.style.transform = ''; }

    section.addEventListener('mousemove', handle);
    section.addEventListener('mouseleave', resetS);
    section.addEventListener('touchstart', (e)=>{ updateBounds(); handle(e); }, {passive:true});
    section.addEventListener('touchmove', handle, {passive:true});
    section.addEventListener('touchend', resetS);
  });

})();