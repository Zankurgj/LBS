document.addEventListener('DOMContentLoaded', function() {
  new WOW().init();
  // console.log($('.block--3-slide'));
  // console.log(
  //   document.getElementsByClassName('block--3-slide')[0].style.backgroundImage
  // );
  $('.block--3-slider').slick({
    dots: true,
    infinite: true,
    // swipe: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    autoplay: true,
    fade: true,
    autoplaySpeed: 5000,
    appendDots: $('.block--3-slider-pagin'),
    customPaging: function(slider, i) {
      return (
        '<div class="pagin-img pagin-img--' +
        i +
        '"></div><div class="pagin-text">Lorem ipsum dolor</div>'
      );
    }
  });
});

window.addEventListener('scroll', function(event) {
  var depth,
    i,
    layer,
    layers,
    len,
    movement,
    topDistance,
    translate3d,
    parallaxBlock;
  topDistance = this.pageYOffset;
  layers = document.querySelectorAll("[data-type='parallax']");
  parallaxBlock = document.querySelector('.block--1').clientHeight;
  if (topDistance <= parallaxBlock) {
    for (i = 0, len = layers.length; i < len; i++) {
      layer = layers[i];
      depth = layer.getAttribute('data-depth');
      movement = -(topDistance * depth);
      translate3d = 'translate3d(0, ' + movement + 'px, 0)';
      layer.style['-webkit-transform'] = translate3d;
      layer.style['-moz-transform'] = translate3d;
      layer.style['-ms-transform'] = translate3d;
      layer.style['-o-transform'] = translate3d;
      layer.style.transform = translate3d;
    }
  }
});
