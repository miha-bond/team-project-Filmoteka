import createMarkup from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { createPagination, createPaginationBtn, main } from './pagination';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  createMarkup(popularMovies);
  // localStorageRecharge(popularMovies);
  createPagination(popularMovies);
  
}
