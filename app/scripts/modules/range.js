const rangeInputs = document.querySelectorAll('input[type="range"]')
if (rangeInputs !== null && rangeInputs.length > 0) {

  function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
      target = document.getElementById('range')
    } 
    const min = target.min
    const max = target.max
    const val = target.value
    
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
    const newVal = new Intl.NumberFormat('de-DE').format(val)
    rangenumber.value = newVal;

  }

  rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
  })
}


