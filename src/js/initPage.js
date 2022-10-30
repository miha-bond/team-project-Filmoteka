import createMarkup from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { localStorageInitPage } from './storage-proceccing';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  // localStorageRecharge(popularMovies);
  createMarkup(popularMovies);
}
