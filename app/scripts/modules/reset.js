var list = document.querySelectorAll('input[type=checkbox]');
var reset = document.querySelector('#reset');
if (reset !== null)  {
  function uncheckAll() {
    document.querySelectorAll('.filter__form input[type="checkbox"]')
    .forEach(el => el.checked = false);
    reset.classList.add('is-disabled');
  }
    
  reset.addEventListener('click', uncheckAll)

  for (let index = 0; index < list.length; index++) {
    const checkbox = list[index];
  
    checkbox.onclick = function(){
      console.log(list);
      reset.classList.remove('is-disabled');
      }
  }
}


