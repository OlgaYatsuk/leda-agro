const burger = document.querySelector('.header__nav-toggler'),
      body = document.body;

burger.addEventListener('click', (e) => {
  e.preventDefault();

  body.classList.toggle('nav-open');
});

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
