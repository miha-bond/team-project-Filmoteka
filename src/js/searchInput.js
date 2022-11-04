import ThemoviedbAPI from './themoviedbAPI';
import { createMarkup } from './galleryMarkup';
import { refs } from './refs';
import initPage from './initPage';
import { options } from './options_notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderPaginationOnSearch } from './paginationRequests';

const filmsApi = new ThemoviedbAPI();

refs.searchFormRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (searchQuery === '') {
    Notify.failure('Enter a search query!', options);
    return;
  }

  try {
    filmsApi.query = searchQuery;
    const searchFilms = await filmsApi.getMovieByName();
    if (searchFilms.total_results !== 0) {
      Notify.success(
        `We found ${searchFilms.total_results} movies for your query`,
        options
      );
      refs.galleryItem.innerHTML = '';
      createMarkup(searchFilms);
      renderPaginationOnSearch(filmsApi.page, filmsApi.query);
      refs.searchFormRef.reset();
    } else if (searchFilms.total_results === 0) {
      Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.',
        options
      );
      initPage();
    }
    Loading.standard({
      svgSize: '150px',
    });
  } catch (error) {
    Notify.failure('Something went wrong! Please retry', options);
  }
  Loading.remove();
}
