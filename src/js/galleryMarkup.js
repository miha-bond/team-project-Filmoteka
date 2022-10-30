import { refs } from './refs';
import { genres } from './ganresId';


export default function createMarkup({results}) {
  let markup = results.map(
    ({ poster_path, title, genres_ids, release_date }) => {
      return `<div class="card">
    <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="${''}"  />
  <div class="film_info">
  <ul class="film_list">
   <li class="film_list"> ${title} </li>
    <li class="film_list"> ${genres_ids}</li>
     <li class="film_list">${release_date}</li>
  </ul>
  </div>
    </div>`;
    }
  );
  refs.galleryItem.insertAdjacentHTML('beforeend', markup.join(''));
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
