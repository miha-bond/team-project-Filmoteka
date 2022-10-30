import { refs } from './refs';
import { genres } from './ganresId';

export default function createMarkup({ results }) {
  let markup = results.map(
    ({ poster_path, title, genre_ids, release_date }) => {
      const genres = getGenresByIds(genre_ids);
      return `
    <li class="gallery__item">
    <div class="card">
        <img class='img'src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${''}"  />
            <div class="film_info">
                <h2 class="film_title"> ${title} </h2>
                <p class="film_text"> ${genres} <span> | </span> ${release_date}</p>
                <p class="film_text"></p>
            </div>
    </div>
    </li>`;
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
