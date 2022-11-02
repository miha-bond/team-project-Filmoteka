import ThemoviedbAPI from './themoviedbAPI';
import {createMarkup }from './galleryMarkup';
import { refs } from './refs';

const filmsApi = new ThemoviedbAPI();

refs.searchFormRef.addEventListener('submit', onFormSubmit);
async function onFormSubmit(evt) {
  evt.preventDefault();

  try {
    filmsApi.query = evt.currentTarget.elements.searchQuery.value.trim();
    if (filmsApi.query === '') return;

    const films = await filmsApi.getMovieByName();
    refs.galleryItem.innerHTML = '';
    createMarkup(films);
    searchFormRef.reset();
  } catch (error) {
    console.log(error);
  }
}
