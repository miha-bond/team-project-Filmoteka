/* When the user clicks on the button,
toggle between hiding and showing the genres content */
function myFunction() {
  document.getElementById('myGenres').classList.toggle('show');
}

function myFunction() {
  var ul, li, a, i;
  div = document.getElementById('myGenres');
  a = div.getElementsByTagName('a');
  for (i = 0; i < a.length; i++) {
    if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = '';
    } else {
      a[i].style.display = 'none';
    }
  }
}
