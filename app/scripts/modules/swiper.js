import Swiper, { Navigation } from "swiper";
const breakpoint = window.matchMedia("(min-width:768px)");
const mainSlider = document.querySelector(".tab-panes__list");
const itemSlider = document.querySelector(".item__more-list");
if (mainSlider !== null) {
  if (breakpoint.matches === true) {
    Swiper.use([Navigation]);
    const swiper = new Swiper(".tab-panes__list", {
      navigation: {
        nextEl: ".tab-panes__button-next",
        prevEl: ".tab-panes__button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 12,
        },
      },
    });
  }
}
if (itemSlider !== null) {
  Swiper.use([Navigation]);
  const swiper = new Swiper(".item__more-list", {
    navigation: {
      nextEl: ".item__more__button-next",
      prevEl: ".item__more__button-prev",
    },
    slidesPerView: "auto",
    spaceBetween: 12,
  });
}
