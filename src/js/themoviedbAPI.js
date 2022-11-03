import axios from 'axios';
import KEY from './API_key';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// HTTP requests
export default class ThemoviedbAPI {
  #query = '';
  #page = 1;
  #params = {
    params: {
      api_key: KEY,
      language: 'en-US',
      include_adult: false,
    },
  };

  #perPage = 20;
  #genreId = '';

  async getTrendingMovies() {
    const urlAXIOS = `trending/movie/day?api_key=${KEY}&page=${this.#page}`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  async getPopularMovies() {
    const urlAXIOS = `trending/movie/day?api_key=${KEY}&page=${this.#page}`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  async getMovieByName() {
    const urlAXIOS = `search/movie?query=${this.#query}&page=${this.#page}`;
    const { data } = await axios.get(urlAXIOS, this.#params);
    return data;
  }

  async getPrimaryInfo(id) {
    const urlAXIOS = `movie/${id}?api_key=${KEY}&language=en-US`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  async getTrailer(id) {
    const urlAXIOS = `movie/${id}/videos?api_key=${KEY}&language=en-US`;
    const { data } = await axios.get(urlAXIOS);
    return data.results[0].key;
  }

  async getUpcomingMovies() {
    const urlAXIOS = `movie/upcoming?api_key=${KEY}&language=en-US&page=${
      this.#page
    }`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  async getMoviebyGenre() {
    const urlAXIOS = `/discover/movie?with_genres=${
      this.#genreId
    }&sort_by=vote_average.desc&api_key=${KEY}&language=en-US&page=${
      this.#page
    }`;
    const { data } = await axios.get(urlAXIOS);
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }
  get page() {
    return this.#page;
  }

  set page(newPage) {
    this.#page = newPage;
  }

  get genreId() {
    return this.#genreId;
  }

  set genreId(newGenreId) {
    this.#genreId = newGenreId;
  }

  get perPage() {
    return this.#perPage;
  }

  incrementPage() {
    this.#page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.#page = 1;
  }
}
