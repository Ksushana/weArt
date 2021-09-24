var list = document.querySelectorAll('input[type=checkbox]:checked');
var reset = document.querySelector('#reset');
for (let index = 0; index < list.length; index++) {
  const checkbox = list[index];

  checkbox.onclick = function(){
    (this.checked) ? reset.classList.remove('is-disabled') : reset.classList.add('is-disabled');
    }
}
// console.log(list)
// if (list) {
//   alert(1)
// }
// document.getElementById('chck').onclick = function(){
// (this.checked) ? but.classList.remove('btn-disable') : but.classList.add('btn-disable');
// }
function uncheckAll() {
  document.querySelectorAll('.filter__form input[type="checkbox"]')
  .forEach(el => el.checked = false);
}
  
document.querySelector('#reset').addEventListener('click', uncheckAll)
