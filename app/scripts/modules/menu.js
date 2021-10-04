const openbtn = document.querySelector('.header__link--burger');
const menu = document.querySelector('.header__menu'); 
const bodyScrollLock = require('body-scroll-lock');
const popupCover = document.querySelector('.popup-cover');

const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;
function openMenu() {
    menu.classList.add("opened");
    popupCover.classList.add("is-shown");
    disableBodyScroll(menu);
}
function closeMenu() {
    menu.classList.remove("opened");
    popupCover.classList.remove("is-shown");
    enableBodyScroll(menu);
}

menu.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

menu.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendY > touchstartY + 50) {
        closeMenu();
    }
}


openbtn.addEventListener("click", openMenu);
document.addEventListener('swiped-down', closeMenu);