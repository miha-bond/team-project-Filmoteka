import ThemoviedbAPI from './themoviedbAPI';
import createMarkup from './galleryMarkup';
import { refs } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const filmsApi = new ThemoviedbAPI();

refs.searchFormRef.addEventListener('submit', onFormSubmit);
async function onFormSubmit(evt) {
  evt.preventDefault();

  try {
    filmsApi.query = evt.currentTarget.elements.searchQuery.value.trim();
    if (filmsApi.query === '') return;
     
      const films = await filmsApi.getMovieByName();
       
      Loading.standard({
      svgSize: '150px',
      });
    console.log(filmsApi);
    refs.galleryItem.innerHTML = '';
      createMarkup(films);
      Notify.success(`We found ${films.total_results} movies for your query`);
    searchFormRef.reset();
  } catch (error) {
      console.log(error);
    // if (films.total_results.length === 0) {
    //   Notify.failure(
    //     'Sorry, there are no movies matching your search query. Please try again.'
    //   );
      
    // }
    
  }
    Loading.remove();
}
