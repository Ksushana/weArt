import Swiper, { Navigation} from 'swiper';
Swiper.use([Navigation]);
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