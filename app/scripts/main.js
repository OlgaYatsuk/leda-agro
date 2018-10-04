//
// const burger = document.querySelector('.header__nav-toggler'),
//       body = document.body;

// burger.addEventListener('click', (e) => {
//   e.preventDefault();
//
//   body.classList.toggle('nav-open');
// });

const $mainSlider = $('.js-main-slider');

class Slider {
  constructor(sliderSelector, config) {
    const defaultConfig = {
      autoplaySpeed: 4000,
      autoplay: false,
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      isEnabled: true,
      prevArrow: '<a href="#" class="arrow-link arrow-link--prev"><img src="../images/svg/arrow-right.svg" alt="previous"></a>',
      nextArrow:  '<a href="#" class="arrow-link arrow-link--next"><img src="../images/svg/l_arrow.svg" alt="next"></a>'
    };

    this.config = Object.assign({}, defaultConfig, config);
    this.$slider = $(sliderSelector);
    this.init();
  }

  init() {
    if (this.hasSlider()) this.$slider.slick(this.config);
  }

  hasSlider() {
    return this.$slider.length > 0;
  }
}

const sliders = [

  {
    selector: $mainSlider,
    isEnabled: true,
    config: {
      pauseOnHover: false,
      fade: true
    }
  }
];

sliders.filter((slider) => slider.isEnabled).forEach((slider) => slider.isEnabled && new Slider(slider.selector, slider.config));
