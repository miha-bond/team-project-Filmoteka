import ThemoviedbAPI from './themoviedbAPI';
import { refs } from './refs';
import {createMarkup} from './galleryMarkup';
import { createPaginationLayout } from './paginationMarkup';
import { createPaginationLayoutGenre } from './paginationMarkupGenre';
import { smoothScroll } from './smoothScroll';

const API = new ThemoviedbAPI();

export async function renderPaginationOnSearch(page, query) {
  API.query = query;
  API.page = page;
  const movie = await API.getMovieByName();
  refs.galleryItem.innerHTML = '';
  createMarkup(movie);
  
  
  createPaginationLayout(movie, query);
  
}

export async function renderPaginationOnPopular(page) {
  API.page = page;
  const movie = await API.getPopularMovies();
  refs.galleryItem.innerHTML = '';
  createMarkup(movie);
  
  createPaginationLayout(movie);
  
}

export async function renderPaginationOngenreId(page, genreId) {
  API.page = page;
  API.genreId = genreId;
  const movie = await API.getMoviebyGenre();
  refs.galleryItem.innerHTML = '';
  createMarkup(movie);
  
  createPaginationLayoutGenre(movie, genreId);
  
}