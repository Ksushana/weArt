import Swiper, { Navigation} from 'swiper';
const breakpoint = window.matchMedia( '(min-width:768px)' );
const togglebtn = document.querySelector(".filter__grid");
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
                spaceBetween: 12
                },
                480: {
                slidesPerView: "auto",
                spaceBetween: 12
                }
            }
            });
    }

    function destroy() {
        galleryWrapper.classList.add( "disabled" );
    }

    function delMasonry() {
        const swiperWrapper = document.querySelector(".tab-panes__list .swiper-wrapper");
        const swiperSlide = document.querySelector(".tab-panes__list .swiper-slide");
        swiperWrapper.classList.remove("flexmasonry");
        swiperWrapper.classList.remove("flexmasonry-responsive");
        swiperWrapper.classList.remove("flexmasonry-cols-3");
        swiperWrapper.classList.remove("flexmasonry-cols-1");
        swiperSlide.classList.remove("flexmasonry-item");
    }

    if (pane.classList.contains("masonry")) {
        galleryWrapper.classList.remove( "disabled" );
        pane.classList.remove("masonry");
        if ( breakpoint.matches === true ) {
            createNew();
        }  
        FlexMasonry.destroyAll();
        delMasonry()
        iconGrid.style.display="block";
        iconSlider.style.display="none";
       
        togglebtn.classList.remove("gridView");
        togglebtn.classList.add("sliderView");
    } else {
        
        destroy();
        pane.classList.add("masonry");
        FlexMasonry.init('.tab-panes__list .swiper-wrapper', {
            responsive: true,
            breakpointCols: {
                'min-width: 768px': 3,
                'min-width: 576px': 2,
                'min-width: 320px': 1,
            },
        });
        iconGrid.style.display="none";
        iconSlider.style.display="block";
        togglebtn.classList.add("gridView");
        togglebtn.classList.remove("sliderView");
    }
}

if (togglebtn !== null)  {
  togglebtn.addEventListener("click", changeGrid);
}

function uploadMoreMasonryItems() {
    FlexMasonry.init('.tab-panes__list .swiper-wrapper', {
        responsive: true,
        breakpointCols: {
            'min-width: 768px': 3,
            'min-width: 576px': 2,
            'min-width: 320px': 1,
        },
    });
}

window.changeGrid = uploadMoreMasonryItems;
