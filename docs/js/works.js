(function(){
  'use strict';

  function openModal(videoUrl){
    var modal = document.getElementById('video-modal');
    if(!modal) return;
    var iframe = modal.querySelector('iframe');
    iframe.src = videoUrl + (videoUrl.indexOf('?') > -1 ? '&autoplay=1' : '?autoplay=1');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    // focus for accessibility
    modal.querySelector('.video-modal__close').focus();
  }

  function closeModal(){
    var modal = document.getElementById('video-modal');
    if(!modal) return;
    var iframe = modal.querySelector('iframe');
    iframe.src = '';
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }

  // Delegate play button clicks
  document.addEventListener('click', function(e){
    var play = e.target.closest('.play-overlay, .work-card .btn');
    if(play && play.dataset && play.dataset.video){
      e.preventDefault();
      openModal(play.dataset.video);
      return;
    }

    if(e.target.closest('.video-modal__close') || e.target.classList.contains('video-modal__backdrop')){
      closeModal();
      return;
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });

  // Optional: stop playback and close if iframe sends a message (not necessary for basic use)
})();
