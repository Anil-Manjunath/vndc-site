(function(){
  'use strict';
  var splash = document.getElementById('splash');
  if(!splash) return;

  var logoTimer, titleTimer, vanishTimer, hideTimer;

  // Sequence: logo first -> title -> vanish -> hide (single smooth appearance, no pulse)
  logoTimer = setTimeout(function(){
    splash.classList.add('logo-show');
  }, 120);

  titleTimer = setTimeout(function(){
    splash.classList.add('title-show');
  }, 2000);

  // start vanish sequence after the title (slower, single smooth fade)
  vanishTimer = setTimeout(function(){
    splash.classList.add('vanish');
  }, 4200);

  hideTimer = setTimeout(function(){
    splash.classList.add('hide');
  }, 5600);

  // Remove from DOM after transition to keep things clean
  splash.addEventListener('transitionend', function(e){
    if(e.propertyName === 'opacity' && splash.classList.contains('hide')){
      splash.parentNode && splash.parentNode.removeChild(splash);
    }
  });

  // Allow users to skip the intro by tapping or pressing a key
  function skip(){
    clearTimeout(logoTimer); clearTimeout(titleTimer); clearTimeout(logoPulseTimer); clearTimeout(titleEmphTimer); clearTimeout(vanishTimer); clearTimeout(hideTimer);
    splash.classList.add('hide');
  }
  splash.addEventListener('click', skip);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') skip(); });
})();