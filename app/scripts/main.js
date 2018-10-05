// const burger = document.querySelector('.header__nav-toggler'),
//       body = document.body;
//
// burger.addEventListener('click', (e) => {
//   e.preventDefault();
//
//   body.classList.toggle('nav-open');
// });
//
// document.addEventListener('scroll', () => {
//   let scrollTop = $(window).scrollTop();
//
//   if(scrollTop > 50) {
//     body.classList.add('header-fill');
//   }
//   else {
//     body.classList.remove('header-fill');
//   }
// });

const $mainSlider = $('.js-main-slider');
const $personsSlider = $('.js-person-slider');
const $mediaSlider = $('.js-media');

class Slider {
  constructor(sliderSelector, config) {
    const defaultConfig = {
      autoplaySpeed: 4000,
      // autoplay: true,
      pauseOnHover: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      isEnabled: true,
      prevArrow: '<a href="#" class="arrow-link arrow-link--prev"><img class="arrow-link__img" src="../images/svg/arrow-right.svg" alt="previous"></a>',
      nextArrow:  '<a href="#" class="arrow-link arrow-link--next"><img class="arrow-link__img" src="../images/svg/l_arrow.svg" alt="next"></a>'
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
  },
  {
    selector: $personsSlider,
    isEnabled: true,
    config: {
      pauseOnHover: false,
      fade: true,
      dots: true,
      appendArrows: $('.peoples-slider__arrows')
    }
  },
  {
    selector: $mediaSlider,
    isEnabled: true,
    config: {
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 5,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>',
      speed: 300,
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

if(calendarSlider) buildSlider(calendarSlider, calendarContent, calendarTable, calendarButton);


//fix about slider
$(document).ready(() => {
  if(document.querySelector('.peoples-slider__wrapper')) {
    let sliderHeight = document.querySelector('.peoples-slider__wrapper').clientHeight;

    document.querySelectorAll('.peoples-slider__img').forEach((el) => {
      el.style.height = sliderHeight + 'px';
    });
  }
});


function changeArrowsContent() {
  let nextIndex, prevIndex, currnetIndex, lastIndex;
  let prevButtonContent = '',
    nextButtonContent = '';

  currnetIndex = $('.js-person-slider .slick-active').attr('data-slick-index');
  lastIndex = $('.js-person-slider .slick-slide').length - 1;
  nextIndex = parseInt(currnetIndex) + 1;
  prevIndex = parseInt(currnetIndex) - 1;

  if(currnetIndex == lastIndex) nextIndex = 0;
  if(currnetIndex == 0) prevIndex = lastIndex;

  let prevPersonImg = document.querySelector('.peoples-slider .slick-slide[data-slick-index="' + prevIndex +'"] .peoples-slider__img').outerHTML,
    prevPersonName = document.querySelector('.peoples-slider .slick-slide[data-slick-index="' + prevIndex +'"] .peoples-slider__name').innerHTML;
  let nextPersonImg = document.querySelector('.peoples-slider .slick-slide[data-slick-index="' + nextIndex +'"] .peoples-slider__img').outerHTML,
    nextPersonName = document.querySelector('.peoples-slider .slick-slide[data-slick-index="' + nextIndex +'"] .peoples-slider__name').innerHTML;

  prevButtonContent = '<p>' + prevPersonName + '</p>' + prevPersonImg;
  nextButtonContent = '<p>' + nextPersonName + '</p>' + nextPersonImg;

  document.querySelector('.peoples-slider__arrows .arrow-link--prev')
    .innerHTML = '<img class="arrow-link__img" src="../images/svg/arrow-right.svg" alt="previous">' + prevButtonContent;
  document.querySelector('.peoples-slider__arrows .arrow-link--next')
    .innerHTML = nextButtonContent + '<img class="arrow-link__img" src="../images/svg/l_arrow.svg" alt="next">';
}

const $menu = $('.js-contacts');
const $root = $('body,html');
const $tab = $('.js-tab-link');
const $tabContent = $('.js-tab-content');

init();

function init () {
  $menu.on('click', 'a', scrollToBlock);
  $tab.on('click', showTab);
  $tab.on('click', changeContent);
}

function scrollToBlock(e) {

  e.preventDefault();
  const id = $(this).attr('href');
  const top = $(id).offset().top;
  $root.animate({scrollTop: top}, 800);
}

function changeContent(e) {
  e.preventDefault();
  let a = $(this).data('id');

  $tabContent.each(function() {
    if (!$(this).hasClass(a)) {
      $(this).removeClass('is-active');
    }

  else
      $(this).addClass('is-active');
  });
}


function showTab() {
  $tab.removeClass('is-active');
  $tabContent.removeClass('is-active');

  $(this).addClass('is-active');
}

$personsSlider.on('afterChange', () => {
  changeArrowsContent();
});

if($('.peoples-slider')) changeArrowsContent();
