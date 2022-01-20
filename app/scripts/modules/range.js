const rangeInput = document.querySelector('#rangenumber')
const filters = document.querySelectorAll('.filter__inner');
import noUiSlider from 'nouislider';

if (rangeInput !== null) {

  const low =  rangeInput.getAttribute("data-low")
  const heigh =  rangeInput.getAttribute("data-heigh")
  const min =  rangeInput.getAttribute("data-min")
  const max =  rangeInput.getAttribute("data-max")
  noUiSlider.create(rangeInput, {
    start: [low, heigh],
    connect: true,
    range: {
      'min': [0],
      'max': [800000]
    }
  });

  const inputNumberLow = document.querySelector('.filter__inner--price-low');
  const inputNumberHeigh = document.querySelector('.filter__inner--price-heigh');

  rangeInput.noUiSlider.on('update', function (values) {

    const valueLow = values[0];
    const valueHeigh = values[1];
    inputNumberLow.innerHTML = Math.round(valueLow).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    inputNumberHeigh.innerHTML = Math.round(valueHeigh).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
  });


  inputNumberLow.addEventListener('change', function () {
      rangeInput.noUiSlider.set([this.innerHTML, null]);
  });

  inputNumberHeigh.addEventListener('change', function () {
    rangeInput.noUiSlider.set([null, this.innerHTML]);
    filter.classList.add("is-shown");
});
}


