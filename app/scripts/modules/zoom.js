const imageContainers = document.querySelectorAll('.zoom');

function is_touch_enabled() {
  return ( 'ontouchstart' in window ) ||
         ( navigator.maxTouchPoints > 0 ) ||
         ( navigator.msMaxTouchPoints > 0 );
}

imageContainers.forEach(imageContainer => {
  // const image = imageContainer.querySelector('img');
  if( !is_touch_enabled()) {
    if (imageContainer ) {
      imageContainer.classList.add('is-styled')
      imageContainer.onmousemove = (event) => {zoom(event)};
      imageContainer.onmouseenter = () => {showImage()};
      imageContainer.onmouseleave = () => {hideImage()};
      const zoom = (e) => {
        let imageZoom = e.currentTarget;
        e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
        e.offsetY ? offsetY = e.offsetY : offsetY = e.touches[0].pageY;
        x = offsetX/imageZoom.offsetWidth * 100;
        y = offsetY/imageZoom.offsetHeight * 100;
        imageZoom.style.backgroundPosition = x + '% ' + y + '%';
      };
    
      const showImage = () => {
        const src = imageContainer.getAttribute('data-src');
        imageContainer.style.backgroundImage = 'url(' + src + ')';
      }
    
      const hideImage = () => {
        imageContainer.style.backgroundImage = 'none';
      }
    }
  }
  
});

