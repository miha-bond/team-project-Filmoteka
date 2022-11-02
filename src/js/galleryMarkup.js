import { refs } from './refs';
import { genres } from './ganresId';
import {  save } from './storage';
import { createPaginationLayout } from './pagination';
import { dataElementStorageById } from './storage-proceccing';
import { showCard } from './modalCard';
function createMarkup({ results }) {
  save('currentPage', results);
dataElementStorageById(results);
results.map(createMarkupElement);
createPaginationLayout(results);
  refs.galleryItem.addEventListener('click', showCard);

}

 function createMarkupElement ({ poster_path, title, genre_ids, release_date, id }) {
  const date = new Date();
  const releaseYear = date.getFullYear(`${release_date}`);

  const genres = getGenresByIds(genre_ids);
const markupString = `
<li class="gallery__item" id="${id}">
<div class="card">
    <img class='img'src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${title}"  />
        <div class="film_info">
            <h2 class="film_title"> ${title} </h2>
            <p class="film_text"> ${genres} <span> | </span> ${releaseYear}</p>
        </div>
</div>
</li>`;
refs.galleryItem.insertAdjacentHTML('beforeend', markupString);

   }


 function getGenresByIds(ids) {
  const genresArr = ids.map(id =>
    genres.filter(genre => genre.id === id).map(genre => genre.name)
  );

  if (genresArr.length > 2) {
    return genresArr.slice(0, 2).join(', ') + ', Other';
  } else {
    return genresArr.join(', ');
  }
}

export {createMarkup, createMarkupElement, getGenresByIds};
