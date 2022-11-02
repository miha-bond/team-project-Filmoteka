import ThemoviedbAPI from './themoviedbAPI';
import createMarkup from './galleryMarkup';
import { refs } from './refs';

const API = new ThemoviedbAPI();
renderMoviebyGenre();
export function renderMoviebyGenre() {
  const genresItem = document.querySelector('#genres');
  genresItem.addEventListener('change', e => {
    API.genreId = genresItem.value;

    main();
  });
}

async function main() {
  const movieByGenre = await API.getMoviebyGenre();
  refs.galleryItem.innerHTML = '';
  createMarkup(movieByGenre);
}
