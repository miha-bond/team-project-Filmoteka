import createMarkup from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { createPaginationLayout, createPaginationBtn, main } from './paginationMarkup';
import { localStorageInitPage } from './storage-proceccing';
import { renderPaginationOnPopular } from './paginationRequests';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  // localStorageRecharge(popularMovies);
  createMarkup(popularMovies);
  renderPaginationOnPopular(API.page);
  
}
