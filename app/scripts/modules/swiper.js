import Swiper, { Navigation} from 'swiper';
const breakpoint = window.matchMedia( '(min-width:768px)' );
Swiper.use([Navigation]);
if ( breakpoint.matches === true ) {
const swiper = new Swiper(".tab-panes__list", {
  navigation: {
    nextEl: ".tab-panes__button-next",
    prevEl: ".tab-panes__button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 12
    },
    480: {
      slidesPerView: "auto",
      spaceBetween: 12
    }
  }
});  
}