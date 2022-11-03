import ThemoviedbAPI from './themoviedbAPI';
import createMarkup from './galleryMarkup';
import { refs } from './refs';
import { options } from './options-notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const filmsApi = new ThemoviedbAPI();

refs.searchFormRef.addEventListener('submit', onFormSubmit);
// loadRef.addEventListener('click', onLoadClick);

async function onFormSubmit(evt) {
  evt.preventDefault();
  const searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (searchQuery === "") {
    Notify.failure('Enter a search query!', options);
    return;
  }
  try {
    filmsApi.query = searchQuery 
    const searchFilms = await filmsApi.getMovieByName();
    if (searchFilms.total_results !== 0) {
      Notify.success(`We found ${searchFilms.total_results} movies for your query`, options)
    }
    Loading.standard({
      svgSize: '150px',
    });
    
    console.log(filmsApi);
    refs.galleryItem.innerHTML = '';
    createMarkup(searchFilms);
    searchFormRef.reset();
  } catch (error) {
    // Notify.failure('Something went wrong! Please retry', options);
    console.log(error);
    // if (films.total_results.length === 0) {
    //   Notify.failure(
    //     'Sorry, there are no movies matching your search query. Please try again.'
    //   );
    // }
  }
  Loading.remove();
}
