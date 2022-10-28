
export {refs, createMarkup, test}
import ThemoviedbAPI from './themoviedbAPI';

const API = new ThemoviedbAPI();

const refs = {
  galleryItem: document.querySelector('.gallery__item'),
};

test();

function createMarkup(response) {
  let markup = response.map(
    ({ poster_path, title, genres_ids, release_date }) => {
      return `<div class="card">
    <img src="https://image.tmdb.org/t/p/w200/${ poster_path }" alt="${''}"  />
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

async function test() {
  const movies = await API.getTrendingMovies();
  createMarkup(movies);
}


