const burger = document.querySelector('.header__nav-toggler'),
  body = document.body,
  productsToggler = document.querySelector('.products__dropdown-toggler'),
  productsFilter = document.querySelectorAll('.products .js-form-item label');


burger.addEventListener('click', (e) => {
  e.preventDefault();

  body.classList.toggle('nav-open');
});

document.addEventListener('scroll', () => {
  let scrollTop = $(window).scrollTop();

  if(scrollTop > 50) {
    body.classList.add('header-fill');
  }
  else {
    body.classList.remove('header-fill');
  }
});


// scripts for catalog page
if(productsToggler) {
  if(document.body.clientWidth < 768) {
    document.querySelector('.products').style.minHeight = document.querySelector('#views-exposed-form-catalog-page-1').clientHeight + 'px';
  }

  productsToggler.addEventListener('click', (e) => {
    productsToggler.classList.toggle('active');
  });
}

if(productsFilter.length)
  productsFilter.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('active');
      productsToggler.classList.remove('active');
    });
  });
// end scripts for catalog page

const $mainSlider = '.js-main-slider';
const $personsSlider = '.js-person-slider';
const $mediaSlider = $('.js-media');
const $productsSlider = '.js-products-slider';
const $gallerySlider = '.js-gallery-slider';
const $arrows = $('.js-arrows');

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
      prevArrow: '<a href="#" class="arrow-link arrow-link--prev"><img class="arrow-link__img" src="/themes/new/images/svg/arrow-right.svg" alt="previous"></a>',
      nextArrow:  '<a href="#" class="arrow-link arrow-link--next"><img class="arrow-link__img" src="/themes/new/images/svg/l_arrow.svg" alt="next"></a>'
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
      dots: true,
      appendArrows: $arrows,
    }
  },
  {
    selector: $gallerySlider,
    isEnabled: true,
    config: {
      pauseOnHover: false,
      fade: false,
      dots: true,
      appendArrows: $arrows,
    }
  },
  {
    selector: $productsSlider,
    isEnabled: true,
    config: {
      pauseOnHover: false,
      fade: true,
      dots: false,
      appendArrows: $arrows,
    }
  },
  {
    selector: $personsSlider,
    isEnabled: true,
    config: {
      pauseOnHover: false,
      fade: true,
      dots: true,
      appendArrows: $arrows,
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
    if(sliderWidth > 569) {
      el.style.width =   sliderWidth + 'px';
    } else {
      el.style.width = '440px';
    }
  });

  content.style.width = (sliderWidth * itemsCount + 10) + 'px';

  if(sliderWidth <= 569) {
    content.style.width = (sliderWidth * itemsCount + 500) + 'px';
  }

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
window.addEventListener('resize', () => {
  if(calendarSlider) buildSlider(calendarSlider, calendarContent, calendarTable, calendarButton);
});


//fix about slider
$(document).ready(() => {
  if(document.querySelector('.peoples-slider__wrapper')) {
    let sliderHeight = document.querySelector('.peoples-slider__wrapper').clientHeight;

    document.querySelectorAll('.js-slider-img').forEach((el) => {
      el.style.height = sliderHeight + 'px';
    });
  }
});


function changeArrowsContent(selector) {
  let nextIndex, prevIndex, currnetIndex, lastIndex;
  let prevButtonContent = '',
    nextButtonContent = '';

  console.log(selector);

  currnetIndex = $(selector + ' .slick-active').attr('data-slick-index');
  lastIndex = $(selector + ' .slick-slide').length - 1;
  nextIndex = parseInt(currnetIndex) + 1;
  prevIndex = parseInt(currnetIndex) - 1;

  if(currnetIndex == lastIndex) nextIndex = 0;
  if(currnetIndex == 0) prevIndex = lastIndex;

  let prevPersonName = document.querySelector(selector + ' .slick-slide[data-slick-index="' + prevIndex +'"] .js-slider-name').innerHTML;
  let nextPersonName = document.querySelector(selector + ' .slick-slide[data-slick-index="' + nextIndex +'"] .js-slider-name').innerHTML;

  prevButtonContent = '<p>' + prevPersonName + '</p>';
  nextButtonContent = '<p>' + nextPersonName + '</p>';

  if($('.js-slider-img').length > 0) {
    let prevPersonImg = document.querySelector(selector + ' .slick-slide[data-slick-index="' + prevIndex +'"] .js-slider-img').outerHTML,
      nextPersonImg = document.querySelector(selector + ' .slick-slide[data-slick-index="' + nextIndex +'"] .js-slider-img').outerHTML;

    prevButtonContent = prevButtonContent + prevPersonImg;
    nextButtonContent = nextButtonContent + nextPersonImg;
  }

  document.querySelector('.js-arrows .arrow-link--prev')
    .innerHTML = '<img class="arrow-link__img" src="../images/svg/arrow-right.svg" alt="previous">' + prevButtonContent;
  document.querySelector('.js-arrows .arrow-link--next')
    .innerHTML = nextButtonContent + '<img class="arrow-link__img" src="../images/svg/l_arrow.svg" alt="next">';
}

$($productsSlider).on('afterChange', () => {
  changeArrowsContent($productsSlider);
});

$($personsSlider).on('afterChange', () => {
  changeArrowsContent($personsSlider);
});

$($mainSlider).on('afterChange', () => {
  changeArrowsContent($mainSlider);
});

const $nameContainer = $('.js-name-container');
// const $activeSlide = $('.slick-active');

function changeName() {
  let $name = $('.slick-active').find($('.js-slider-name'));
  $nameContainer.text($name.text());
}

$($gallerySlider).on('afterChange', changeName);

if($($personsSlider).length) changeArrowsContent($personsSlider);
if($($mainSlider).length) changeArrowsContent($mainSlider);
if($($productsSlider).length) changeArrowsContent($productsSlider);
if($($gallerySlider).length)  changeName();

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

const $gallery = $('.js-gallery');
const $popUp = $('.js-pop-up');
const $close = $('.js-close');

$gallery.on('click', showGallery);
$close.on('click', hideGallery);

function showGallery () {
  $popUp.addClass('is-visible');
}

function hideGallery  () {
  $popUp.removeClass('is-visible');
}

const $productNum = document.location.search.slice(-1);
const $selectedFilter = $('.js-form-item-tid-'+ $productNum);
$selectedFilter.find('.option').addClass('active');

$selectedFilter.on('click', resetSearch);

function resetSearch () {
  location.search = "";
}
