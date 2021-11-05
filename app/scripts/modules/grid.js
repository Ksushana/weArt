import Swiper, { Navigation } from "swiper";
// import {$,jQuery} from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery;
const breakpoint = window.matchMedia("(min-width:768px)");
const togglebtn = document.querySelector(".filter__grid");
const swiperWrapper = document.querySelector(
  ".tab-panes__list .swiper-wrapper"
);
function changeGrid() {
  const pane = document.querySelector(".tab-panes");
  Swiper.use([Navigation]);
  const iconGrid = document.querySelector(".svg-icon--grid");
  const iconSlider = document.querySelector(".svg-icon--slider");
  let gallery;
  const galleryWrapper = document.querySelector(".swiper-wrapper");
  function createNew() {
    gallery = new Swiper(".tab-panes__list", {
      navigation: {
        nextEl: ".tab-panes__button-next",
        prevEl: ".tab-panes__button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 12,
        },
        480: {
          slidesPerView: "auto",
          spaceBetween: 12,
        },
      },
    });
  }

  function destroy() {
    galleryWrapper.classList.add("disabled");
  }

  function delMasonry() {
    msnry.destroy();
    const swiperSlide = document.querySelector(
      ".tab-panes__list .swiper-slide"
    );
  }
  const elem = document.querySelector(".grid");
  const msnry = new Masonry(elem, {
    itemSelector: ".grid-item",
  });

  if (!pane.classList.contains("masonry")) {
    destroy();
    pane.classList.add("masonry");
    const msnry = new Masonry(elem, {
      itemSelector: ".grid-item",
    });
    iconGrid.style.display = "none";
    iconSlider.style.display = "block";
    togglebtn.classList.add("gridView");
    togglebtn.classList.remove("sliderView");
  } else {
    galleryWrapper.classList.remove("disabled");
    pane.classList.remove("masonry");
    if (breakpoint.matches === true) {
      createNew();
    }
    delMasonry();
    iconGrid.style.display = "block";
    iconSlider.style.display = "none";

    togglebtn.classList.remove("gridView");
    togglebtn.classList.add("sliderView");
  }
}

if (togglebtn !== null) {
  togglebtn.addEventListener("click", changeGrid);
}

function uploadMoreMasonryItems() {
  const elem = document.querySelector(".grid");
  const msnry = new Masonry(elem, {
    itemSelector: ".grid-item",
  });
}

window.uploadMore = uploadMoreMasonryItems;

// function appendMoreMasonryItems() {
//     var elems = [];
//     var fragment = document.createDocumentFragment();
//     for ( var i = 0; i < 3; i++ ) {
//       var elem = getItemElement();
//       fragment.appendChild( elem );
//       elems.push( elem );
//     }
//     grid.appendChild( fragment );
//     msnry.appended( elems );
// }

// window.uploadMoreAppend = uploadMoreMasonryItems;
