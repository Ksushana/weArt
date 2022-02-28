import Swiper, { Navigation, Thumbs } from 'swiper';
Swiper.use([Navigation, Thumbs]);

const itemSlides = document.querySelectorAll('.item__img-slider .swiper-slide');
const itemNavigation = document.querySelector('.item__img-slider-navigation');
if (itemSlides.length > 1) {
  itemNavigation.classList.add('is-shown');
  const galleryThumbs = new Swiper(".item__img-slider-thumbs", {
    spaceBetween: 12,
    slidesPerView: 3,
    freeMode: true,
    centeredSlides: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,  
    loop: true,
    breakpoints: {
      320: {
        spaceBetween: 5
      },
      769: {
        spaceBetween: 12
      },
    }
  }); 
  
  const galleryTop = new Swiper(".item__img-slider", {
    navigation: {
      nextEl: ".item__img-slider-next",
      prevEl: ".item__img-slider-prev"
    },
    spaceBetween: 24,
    slidesPerView: 1,
    loop: true,
    thumbs: {
      swiper: galleryThumbs,
    },
  }); 

  
}
