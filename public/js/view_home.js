'use static';

(function(window) {

  window.STMN = window.STMN || {};

  function initView(data) {

    var bigSmallGlopElements = document.querySelectorAll(data.bigSmallGlop.selector + ' .glop-park'),
        parkShape, parkElement;

    for(var i=0; bigSmallGlopElements.length > i; i++) {

      parkElement = bigSmallGlopElements[i];

      parkShape = new STMN.ParkShape(
        parkElement, 
        data.bigSmallGlop.shapes[data.bigSmallGlop.idPrefix + parkElement.getAttribute('data-park-id')]

      );

      parkShape.init();

    }

  }

  //Public interface
  STMN.initView = initView;

}(window));