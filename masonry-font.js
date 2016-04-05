$(function() {
  WebFontConfig = {
    google: { families: [ 'Roboto:400,100,500:latin' ] },
    active: function() {
      $('#grid').masonry({
          columnWidth: '.grid-item',
          itemSelector: '.grid-item'
      });
    }
  };

  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
  });