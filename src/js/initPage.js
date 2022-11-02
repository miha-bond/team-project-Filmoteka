import {createMarkup} from './galleryMarkup';
import ThemoviedbAPI from './themoviedbAPI';

const API = new ThemoviedbAPI();
initPage();
export default async function initPage() {
  const popularMovies = await API.getPopularMovies();
  createMarkup(popularMovies);

}




