import Swiper, { Navigation} from 'swiper';
const breakpoint = window.matchMedia( '(min-width:768px)' );

if ( breakpoint.matches === true ) {
    Swiper.use([Navigation]);
    const swiper = new Swiper(".tab-panes__list", {
    navigation: {
        nextEl: ".tab-panes__button-next",
        prevEl: ".tab-panes__button-prev",
    },
    breakpoints: {
        320: {
        slidesPerView: 1,
        spaceBetween: 120
        },
        768: {
        slidesPerView: "auto",
        spaceBetween: 12
        }
    }
    });  
}