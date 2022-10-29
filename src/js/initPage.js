import createMarkup from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';
import { saveData } from './storage-proceccing';

const API = new ThemoviedbAPI();
initPage();

export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  saveData(popularMovies);
  createMarkup(popularMovies);
}
