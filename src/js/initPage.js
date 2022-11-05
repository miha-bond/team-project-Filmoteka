import { createMarkup } from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { renderPaginationOnPopular } from './paginationRequests';
import { refs } from './refs';
import { showCard } from './modalCard';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  createMarkup(popularMovies, refs.galleryItem );
   refs.galleryItem.addEventListener('click', showCard);
  renderPaginationOnPopular(API.page);
}
