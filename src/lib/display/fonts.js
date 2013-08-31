define([],
  function() {

    var WebFontConfig = {
      google: {
        families: ['Arvo:700italic']
      },
      active: function() {
        console.log("google webfonts loaded!");
        init();
      }
    };

    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
    
  }
);