const openbtn = document.querySelector('.header__link--burger');
const closebtn = document.querySelector('.header__menu-close');
const menu = document.querySelector('.header__menu'); 
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
function openMenu() {
    menu.classList.add("opened");
    disableBodyScroll(menu);
}
function closeMenu() {
    menu.classList.remove("opened");
    enableBodyScroll(menu);
}

openbtn.addEventListener("click", openMenu);
closebtn.addEventListener("click", closeMenu);