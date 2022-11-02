import ThemoviedbAPI from './themoviedbAPI';

import iconURL from '../img/symbol-defs.svg';
import { save } from './storage';

import { refs } from './refs';
import { genres } from './ganresId';
const API = new ThemoviedbAPI();
async function key(id) {
  const keyFilms1 = await API.getTrailer(id).then(keyFilm => keyFilm);
  save('wotchTrailer', keyFilms1);
  console.log('keyFilms1', keyFilms1);
}

// Функція для рендеру модального вікна
export function renderModal({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genre_ids,
  overview,
  name,
  original_name,
  id,
}) {
  let genresForModal = getGenresByIds(genre_ids);

  key(id);
  let poster = getPoster(poster_path);

  // перевірка на наявність жанрів
  if (genresForModal.length === 0) {
    genresForModal = 'not available';
  }

  const markup = /*html*/ `<div class="modal">
                        <button type="button" class="modal__btn-close" data-modal-close>
                            <svg class="modal__icon-close" width="25px" height="25px">
                            <use href="${iconURL}#icon-close_menu"></use>
                            </svg>
                        </button>
                        <div class="modal__image-thumb portfolio__top-wrap">
                        <img class="modal__image" src="${poster}" alt="${title} poster">
                        <button id="watched" type="button" class="modal__btn portfolio__hover-text modal__btn-watched">
                          <a href="https://youtu.be/hf8EYbVxtCY" class="card__link  link tube">Watch ${title} trailer</a>
                        </button>
                        </div>
                        <div class="modal__info-thumb">
                        <h2 class="modal__title">${
                          name || original_title || original_name
                        }</h2>
                        <table class="modal__info">
                        <tr class="modal__info-entry">
                        <td class="modal__info-key">Vote / Votes</td>
                        <td><span class="modal__info-value-vote modal__info-value-vote--accent">${vote_average.toFixed(
                          1
                        )}</span> / <span class="modal__info-value-vote">${vote_count}</span></td>
                        </tr>
                        <tr class="modal__info-entry">
                        <td class="modal__info-key">Popularity</td>
                        <td class="modal__info-value">${popularity.toFixed(
                          1
                        )}</td>
                        </tr>
                        <tr class="modal__info-entry">
                        <td class="modal__info-key">Original Title</td>
                        <td class="modal__info-value modal__info-value-title">${
                          name || original_title || original_name
                        }</td>
                        </tr>
                        <tr class="modal__info-entry">
                        <td class="modal__info-key">Genre</td>
                        <td class="modal__info-value">${genresForModal}</td>
                        </tr>
                        </table>
                
                        <h3 class="modal__about">About</h3>
                        <p class="modal__about-text">${overview}</p>
                        <div class="modal__btn-container">
                        <button id="watched" type="button" class="modal__btn modal__btn-watched">add to Watched</button>
                        <button id="queue" type="button" class="modal__btn modal__btn-queue">add to queue</button>
                        </div>
                        </div>
                    </div>`;
  refs.backdrop.innerHTML = markup;
}

//Функція для заміни постера у випадку його відсутності
function getPoster(poster) {
  if (poster === null) {
    return 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  } else {
    return `https://image.tmdb.org/t/p/w300/${poster}`;
  }
}

//Функція для виведення жанрів у модальне вікно
function getGenresByIds(ids) {
  return ids.map(id =>
    genres.filter(genre => genre.id === id).map(genre => genre.name)
  );
}
