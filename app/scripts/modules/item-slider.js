import Swiper, { Navigation} from 'swiper';
Swiper.use([Navigation]);



const galleryTop = new Swiper(".item__img-slider", {
  navigation: {
    nextEl: ".item__img-slider-next",
    prevEl: ".item__img-slider-prev"
  },
  spaceBetween: 24,
  slidesPerView: 1,
  // thumbs: {
  //   swiper: galleryThumbs,
  // },
}); 

const galleryThumbs = new Swiper(".item__img-slider-thumbs", {
  spaceBetween: 12,
  slidesPerView: 3,
  freeMode: true,
  centeredSlides: true,
  watchSlidesProgress: true,
  breakpoints: {
    320: {
      spaceBetween: 5
    },
    768: {
      spaceBetween: 12
    },
  }
}); 

galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;
// console.log(galleryTop);
// console.log(galleryThumbs);