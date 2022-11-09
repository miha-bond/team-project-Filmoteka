import { genres } from './ganresId';
import { save } from './storage';

 function createMarkup({ results }, el) {
  save('currentPage', results);
  results.map((res) => {
    createMarkupElement(res, el);
  })
   
 
  
}

function createMarkupElement({
  poster_path,
  title,
  genre_ids,
  release_date,
  id,
}, el) {
  const genres = getGenresByIds(genre_ids);
  const date = new Date(release_date);
  const releaseDate = date.getFullYear();
  const poster = getPoster(poster_path);
  const markupString = `
  <li class="gallery__item"  id="${id}">
<div class="card">
<img class='img'  src="${poster}" alt="${title}"  />
<div class="film_info">
        <h2 class="film_title"> ${title} </h2>
        <p class="film_text"> <span class='film_text_border'>${genres}</span> ${releaseDate}</p>
    </div>
</div>
</li>`;
  el.insertAdjacentHTML('beforeend', markupString);
}

function getGenresByIds(ids) {
  const genresArr = ids.map(id =>
    genres.filter(genre => genre.id === id).map(genre => genre.name)
  );
  if (genresArr.length > 2) {
    return genresArr.slice(0, 2).join(', ') + ', Other';
  } else if (genresArr.length < 1) {
    return 'Genres are N/A';
  }
  {
    return genresArr.join(', ');
  }
}
function getPoster(poster) {
  if (poster === null) {
    return 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
  } else {
    return `https://image.tmdb.org/t/p/w300/${poster}`;
  }
}
export { getGenresByIds, createMarkup, createMarkupElement };
