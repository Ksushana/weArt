function uncheckAll() {
  document.querySelectorAll('.filter__form input[type="checkbox"]')
  .forEach(el => el.checked = false);
}
  
document.querySelector('#reset').addEventListener('click', uncheckAll)