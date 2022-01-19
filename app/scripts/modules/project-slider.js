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
if(window.innerWidth  > 767)
new Swiper(".item__more-list", {
  navigation: {
    nextEl: ".item__more__button-next",
    prevEl: ".item__more__button-prev"
  },
  spaceBetween: 24,
  slidesPerView: "auto"
});  

if(window.innerWidth  > 767) {
new Swiper(".projects__slider", {
  navigation: {
    nextEl: ".projects-slider__button-next",
    prevEl: ".projects-slider__button-prev"
  },
  spaceBetween: 24,
  slidesPerView: "auto"
});  
}