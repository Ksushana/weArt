// var list = document.querySelectorAll('input[type=checkbox]:checked')
// console.log(list)
// if (list) {
//   alert(1)
// }

function uncheckAll() {
  document.querySelectorAll('.filter__form input[type="checkbox"]')
  .forEach(el => el.checked = false);
}
  
document.querySelector('#reset').addEventListener('click', uncheckAll)
