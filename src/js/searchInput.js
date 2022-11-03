import ThemoviedbAPI from './themoviedbAPI';
import { createMarkup } from './galleryMarkup';
import { refs } from './refs';
import initPage from './initPage';
// import { options } from 'options-notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const filmsApi = new ThemoviedbAPI();

refs.searchFormRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();

  if (searchQuery === '') {
    Notify.failure('Enter a search query!');
    return;
  }

  try {
    filmsApi.query = searchQuery;
    const searchFilms = await filmsApi.getMovieByName();
    console.log('27', searchFilms);
    if (searchFilms.total_results !== 0) {
      console.log('29', searchFilms);
      Notify.success(
        `We found ${searchFilms.total_results} movies for your query`
      );
      refs.galleryItem.innerHTML = '';
      createMarkup(searchFilms);
      refs.searchFormRef.reset();
    } else if (searchFilms.total_results === 0) {
      console.log('38', searchFilms);
      Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
      initPage();
    }
    Loading.standard({
      svgSize: '150px',
    });
  } catch (error) {
    Notify.failure('Something went wrong! Please retry');
    console.log(error);
  }
  Loading.remove();
}
