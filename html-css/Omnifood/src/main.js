const header = document.querySelector('.header');
const btnMenu = document.querySelector(".icon-mobile-nav[name='menu-outline']");
const btnClose = document.querySelector(
    ".icon-mobile-nav[name='close-outline']"
);

btnMenu.addEventListener('click', function () {
    header.classList.add('nav-open');
});

btnClose.addEventListener('click', function () {
    header.classList.remove('nav-open');
});
