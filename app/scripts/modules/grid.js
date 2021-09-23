import Swiper, { Navigation} from 'swiper';
function changeGrid() {
    const pane = document.querySelector(".tab-panes");
    Swiper.use([Navigation]);
    const iconGrid = document.querySelector(".svg-icon--grid");
    const iconSlider = document.querySelector(".svg-icon--slider");
    if (pane.classList.contains("masonry")) {
        pane.classList.remove("masonry");
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
        FlexMasonry.destroyAll();

        const swiperWrapper = document.querySelector(".tab-panes__list .swiper-wrapper");
        const swiperSlide = document.querySelector(".tab-panes__list .swiper-slide");
        swiperWrapper.classList.remove("flexmasonry");
        swiperWrapper.classList.remove("flexmasonry-responsive");
        swiperWrapper.classList.remove("flexmasonry-cols-3");
        swiperSlide.classList.remove("flexmasonry-item");
        
        iconGrid.style.display="block";
        iconSlider.style.display="none";
    } else {
        pane.classList.add("masonry");
        // swiper.destroy( true, true );
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
    }
}
const togglebtn = document.querySelector(".filter__grid");
togglebtn.addEventListener("click", changeGrid)
