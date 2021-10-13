const filter = document.querySelectorAll('.filter');
const filters = document.querySelectorAll('.filter__inner');
const openbtns = document.querySelectorAll('.filter__item');
const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const popupCover = document.querySelector('.popup-cover');

const breakpoint = window.matchMedia( '(max-width:768px)' );
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function closeAllFilters() {
    filters.forEach(filter => {
        filter.classList.remove("is-shown");
        popupCover.classList.remove("is-shown");
    });
}
if (filter !== null)  {
    openbtns.forEach(btn => {
        const parent = btn.parentNode;
        const filter = parent.querySelector('.filter__inner');
        
        function openFilter() {
            closeAllFilters();
            filter.classList.add("is-shown");
            popupCover.classList.add("is-shown");
            if ( breakpoint.matches === true ) {
            disableBodyScroll(filter);
            }
        }

        function closeFilter() {
            filter.classList.remove("is-shown");
            popupCover.classList.remove("is-shown");
            if ( breakpoint.matches === true ) {
            enableBodyScroll(filter);
            }
        }

        if (filter) {
            filter.addEventListener('touchstart', function(event) {
                touchstartX = event.changedTouches[0].screenX;
                touchstartY = event.changedTouches[0].screenY;
            }, false);
    
            filter.addEventListener('touchend', function(event) {
                touchendX = event.changedTouches[0].screenX;
                touchendY = event.changedTouches[0].screenY;
                handleGesture();
            }, false); 
        }

      

        function handleGesture() {
            if (touchendY > touchstartY + 50) {
                closeFilter();
            }
        }
        
        btn.addEventListener("click", openFilter);
        document.addEventListener('swiped-down', closeFilter);
    });
}
