$(document).ready(function(){
    $("#service-carousel").owlCarousel({
      items: 1,
      autoplay: true,
      loop: true,
      dots: true,
      mouseDrag: true,
      nav: false,
      smartSpeed: 1000,
      transitionStyle: "fade",
      animateIn: 'fadeIn',
      animateOut: 'fadeOutLeft'
    });
  
    // Horizontaal scrollen met muis
    var owl = $('#service-carousel');
    owl.on('mousedown', function(event) {
      var startX = event.pageX;
      var scrollLeft = owl.scrollLeft();
  
      owl.on('mousemove', function(event) {
        var moveX = startX - event.pageX;
        owl.scrollLeft(scrollLeft + moveX);
      });
  
      $(document).on('mouseup', function() {
        owl.off('mousemove');
      });
    });
  });
  