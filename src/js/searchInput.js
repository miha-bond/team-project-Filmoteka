import ThemoviedbAPI from './themoviedbAPI';
import { createMarkup } from './galleryMarkup';
import { refs } from './refs';


const filmsApi = new ThemoviedbAPI();
// const searchFormRef = document.querySelector('.films-header__input');
// const galleryRef = document.querySelector('.gallery');
// const paginationRef = document.querySelector('#pagination');
// const errorMessage = document.querySelector('.search-form__error');


refs.searchFormRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  try {
    filmsApi.query = evt.currentTarget.elements.searchQuery.value.trim();
    if (filmsApi.query === '') return;

    const films = await filmsApi.getMovieByName();
    if (films.length === 0) {
      addErrorStyles();
      errorMessage.style.display = 'block';
    } else {
      resetErrorStyles();
    }
    createMarkup(films);

    searchFormRef.reset();
  } catch (error) {
    console.log(error);
  }
}

export function resetErrorStyles() {
  galleryRef.classList.remove('wrong');
  paginationRef.style.display = 'flex';
  errorMessage.style.display = 'none';
}

export function addErrorStyles() {
  galleryRef.classList.add('wrong');
  paginationRef.style.display = 'none';
  errorMessage.style.display = 'block';
}
