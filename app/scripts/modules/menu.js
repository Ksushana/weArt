const openbtn = document.querySelector('.header__link--burger');
const closebtn = document.querySelector('.header__menu-close');
const menu = document.querySelector('.header__menu'); 
function openMenu() {
    menu.classList.add("opened");
}
function closeMenu() {
    menu.classList.remove("opened");
}

openbtn.addEventListener("click", openMenu);
closebtn.addEventListener("click", closeMenu);