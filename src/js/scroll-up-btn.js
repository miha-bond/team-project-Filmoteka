const scrollBtnEl = document.getElementById('scroll-up');
// console.log(document.getElementById('scroll-up'));

if(scrollBtnEl) {
scrollBtnEl.addEventListener('click', onScrollUp)};

function onScrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if(scrollBtnEl) {
window.addEventListener('scroll', function () {
  scrollBtnEl.hidden = scrollY < document.documentElement.clientHeight;
})};