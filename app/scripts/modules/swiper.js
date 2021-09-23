import Swiper from 'swiper';
Swiper.use([]);
const swiper = new Swiper(".tab-panes__list", {
  slidesPerView: 'auto', 
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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