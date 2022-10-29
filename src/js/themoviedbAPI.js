import axios from 'axios';
import KEY from './API_key';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// HTTP requests
export default class ThemoviedbAPI {
  #query = '';
  #page = 1;
  
  async getTrendingMovies() {
    const urlAXIOS = `trending/movie/day?api_key=${KEY}&`;
    const { data } = await axios.get(urlAXIOS);
    console.log(data.results);
    return data.results;
  }

  async getPopularMovies() {
    const urlAXIOS = `trending/movie/day?api_key=${KEY}`;
    const { data } = await axios.get(urlAXIOS);
    return data.results;
  }

  async getMovieByName() {
    const params = {
      api_key: KEY,
      query: this.#query,
      language: 'en-US',
      page: this.#page,
      include_adult: false,
    };
    const urlAXIOS = `search/movie?${params}`;
    const { data } = await axios.get(urlAXIOS);
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
    return data;
  }

  async getUpcomingMovies() {
    const urlAXIOS = `movie/upcoming?api_key=${KEY}&language=en-US&page=${
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
