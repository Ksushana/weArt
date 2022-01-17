import Swiper, { Navigation} from 'swiper';
Swiper.use([Navigation]);
const swiper = new Swiper(".project-item__slider .swiper", {
  loop: true,
  navigation: {
    nextEl: ".project-item__slider-next",
    prevEl: ".project-item__slider-prev"
  },
  slidesPerView:1
});  