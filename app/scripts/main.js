
// const burger = document.querySelector('.header__nav-toggler'),
//       body = document.body;

// burger.addEventListener('click', (e) => {
//   e.preventDefault();
//
//   body.classList.toggle('nav-open');
// });
//


  // $('.js-blog').masonry({
  //   itemSelector: '.js-post',
  //   columnWidth: 200
  // });

const $mainSlider = $('.js-main-slider');

class Slider {
  constructor(sliderSelector, config) {
    const defaultConfig = {
      autoplaySpeed: 4000,
      autoplay: true,
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
      fade: true,
      dots: true
    }
  }
];

sliders.filter((slider) => slider.isEnabled).forEach((slider) => slider.isEnabled && new Slider(slider.selector, slider.config));


//calendar slider

const calendarSlider = document.querySelector('.calendar__slider'),
      calendarContent = document.querySelector('.calendar__scrolled-content'),
      calendarTable = document.querySelectorAll('.calendar__table'),
      calendarButton = document.querySelectorAll('.calendar__navigation-button');

function buildSlider(slider, content, items, buttons) {
  let sliderWidth = slider.clientWidth,
      itemsCount = items.length,
      currentPosition = 0;

  items.forEach((el) => {
    el.style.width =   sliderWidth + 'px';
  });

  content.style.width = (sliderWidth * itemsCount) + 'px';

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let eTarget;

      if(e.toElement.classList.contains('calendar__navigation-left')) eTarget = 'left';
      else eTarget = 'right';
      console.log(eTarget);

      if(eTarget === 'left') scrollLeft();
      else scrollRight();
    });
  });

  function scrollLeft() {
    if(Math.abs(currentPosition - sliderWidth) <= sliderWidth * (itemsCount - 1)) currentPosition = currentPosition - sliderWidth;
    content.style.transform = 'translateX(' + currentPosition + 'px)';
  }

  function scrollRight() {
    if (currentPosition + sliderWidth <= 0) currentPosition = currentPosition + sliderWidth;
    content.style.transform = 'translateX(' + currentPosition + 'px)';
  }
}

buildSlider(calendarSlider, calendarContent, calendarTable, calendarButton);
