const burger = document.querySelector('.header__nav-toggler'),
      body = document.body;

burger.addEventListener('click', (e) => {
  e.preventDefault();

  body.classList.toggle('nav-open');
});
