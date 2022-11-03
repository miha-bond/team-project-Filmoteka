import { createMarkup } from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { renderPaginationOnPopular } from './paginationRequests';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  createMarkup(popularMovies);
  renderPaginationOnPopular(API.page);
}
