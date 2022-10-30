import iconURL from '../src/img/symbol-defs.svg#';
export const backdrop = document.querySelector('.backdrop');

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
}) {
  const markup = `<div class="modal">
                        <button type="button" class="modal__btn-close" data-modal-close>
                            <svg class="modal__icon-close" width="14" height="14">
                            <use href="${iconURL}#icon-close-modal-btn"></use>
                            </svg>
                        </button>
                        <div class="modal__image-thumb">
                        <img class="modal__image" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title} poster">
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
                        <td class="modal__info-value">${genre_ids}</td>
                        </tr>
                        </table>
                
                        <h3 class="modal__about">About</h3>
                        <p class="modal__about-text">${overview}</p>
                        <div class="modal__btn-container">
                        <button id="watched" type="button" class="modal__btn modal__btn-watched"></button>
                        <button id="queue" type="button" class="modal__btn modal__btn-queue"></button>
                        </div>
                        </div>
                    </div>`;
  backdrop.innerHTML = markup;
}