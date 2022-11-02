 import axios from 'axios';
import { Notify } from 'notiflix';


 const KEY = 'fa9336959a89576934623c53459652e9';


 const genres = [
     {
       "id": 28,
       "name": "Action"
     },
     {
       "id": 12,
       "name": "Adventure"
     },
     {
       "id": 16,
       "name": "Animation"
     },
     {
       "id": 35,
       "name": "Comedy"
     },
     {
       "id": 80,
       "name": "Crime"
     },
     {
       "id": 99,
       "name": "Documentary"
     },
     {
       "id": 18,
       "name": "Drama"
     },
     {
       "id": 10751,
       "name": "Family"
     },
     {
       "id": 14,
       "name": "Fantasy"
     },
     {
       "id": 36,
       "name": "History"
     },
     {
       "id": 27,
       "name": "Horror"
     },
     {
       "id": 10402,
       "name": "Music"
     },
     {
       "id": 9648,
       "name": "Mystery"
     },
     {
       "id": 10749,
       "name": "Romance"
     },
     {
       "id": 878,
       "name": "Science Fiction"
     },
     {
       "id": 10770,
       "name": "TV Movie"
     },
     {
       "id": 53,
       "name": "Thriller"
     },
     {
       "id": 10752,
       "name": "War"
     },
     {
       "id": 37,
       "name": "Western"
     },
   ]

 axios.defaults.baseURL = 'https://api.themoviedb.org/3/';


  class ThemoviedbAPI {
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

   async getTrendingMovies() {
     const urlAXIOS = `trending/movie/day?api_key=${KEY}&page=${
       this.#page}`;
     const { data } = await axios.get(urlAXIOS);
     return data;
   }

   async getPopularMovies() {
     const urlAXIOS = `trending/movie/day?api_key=${KEY}&page=${
       this.#page}`;
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
   get page() {
     return this.#page;
   }

   set page(newPage) {
     this.#page = newPage;
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



   const save = (key, value) => {
     try {
       const serializedState = JSON.stringify(value);
       localStorage.setItem(key, serializedState);
     } catch (error) {
       console.error('Set state error: ', error.message);
     }
   };

    const load = key => {
     try {
       const serializedState = localStorage.getItem(key);
       return serializedState === null ? undefined : JSON.parse(serializedState);
     } catch (error) {
       console.error('Get state error: ', error.message);
     }
   };

    const remove = key => {
     try {
       return localStorage.removeItem(key);
     } catch (error) {
       console.error('Remove state error: ', error.message);
     }
   };




  const refs = {
     prevBtn: document.querySelector('#prevBtn'),
     nextBtn: document.querySelector('#nextBtn'),
     galleryItem: document.querySelector('.gallery__list'),
     searchFormRef: document.querySelector('.films-header__search-form'),
     backdrop: document.querySelector('.backdrop'),
     body: document.querySelector('body'),
     watchedBtn: document.querySelector('[data-action="add to watch"]'),
     queBtn: document.querySelector('[data-action="add to queue"]'),
   };
  const watchedBtn =  refs.watchedBtn;
  const queueBtn = refs.queBtn;
  const gallery = refs.galleryItem;
 
         watchedBtn.addEventListener('click', renderWatchedLibrary);
  queueBtn.addEventListener('click', renderQueueLibrary);
 



       function dataElementStorageById (arr) {
  arr.map(obj => {
    save(`${obj.id}`, obj);
  })
      }
 
 
  function getStorageData (e) {
       if(localStorage.length !==0){
        let keys = Object.keys(localStorage);
        keys = keys.filter(el =>
          el.includes(e.target.textContent.toLowerCase()));
          if (keys.length === 0) {
            Notify.failure('The library is empty!', {
                position: 'center-center',
                width: '45vw',
                fontSize: '50px',
                fontFamily:'Verdana',
                failure: {
                    background: '#000000dd',
                  textColor: '#ff0000',
                }
                }); initPage();
                return
          } 
          return keys;
       }  Notify.failure('Add movie to queue!', {
        position: 'center-center',
        width: '45vw',
        fontSize: '50px',
        fontFamily:'Verdana',
        failure: {
            background: '#000000dd',
          textColor: '#ff0000',
        }
        }); initPage();
      return
         }
 
   
 

  const API = new ThemoviedbAPI();
 initPage();
 async function initPage() {
   const popularMovies = await API.getPopularMovies();
   createMarkup(popularMovies);
 }
initPage();

 function createMarkup({ results }) {
     save('currentPage', results);
   dataElementStorageById(results);
   results.map(createMarkupElement);
 
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

    function renderModal({
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
     let genres = getGenresByIds(genre_ids);
     let poster = getPoster(poster_path);

     if (!genres) {
       genres = 'not available';
     }

     const markup =  `<div class="modal">
                           <button type="button" class="modal__btn-close" data-modal-close>
                               <svg class="modal__icon-close" width="14" height="14">
                               <use href="../img/symbol-defs.svg#icon-close-modal-btn"></use>
                               </svg>
                           </button>
                           <div class="modal__image-thumb">
                           <img class="modal__image" src="${poster}" alt="${title} poster">
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
                           <td class="modal__info-value">${genres}</td>
                           </tr>
                           </table>
                
                           <h3 class="modal__about">About</h3>
                           <p class="modal__about-text">${overview}</p>
                           <div class="modal__btn-container" id="${id}">
                           <button id="watched" type="button" class="modal__btn modal__btn-watched">add to Watched</button>
                           <button id="queue" type="button" class="modal__btn modal__btn-queue">add to queue</button>
                           </div>
                           </div>
                       </div>`;
                       document.querySelector('.backdrop').innerHTML = markup;
   }
   function getPoster(poster) {
     if (poster === null) {
       return 'https://upload.wikimedia.org/wikipedia/commons/6/64/Poster_not_available.jpg';
     } else {
       return `https://image.tmdb.org/t/p/w300/${poster}`;
     }
   }




   function showCard(e) {
     e.preventDefault();
    
      if(e.target.nodeName === "IMG" || e.target.nodeName === "H2" || e.target.nodeName === "P" ) {
     window.addEventListener('keydown', closeModalHandler);
     console.log(e.target.nodeName);
     refs.backdrop.classList.remove('is-hidden');
    const parentContainer = sortedTargetElement(e);
     const selectedCardId = Number(parentContainer.id);
   const getCurrentPage = load('currentPage');
     const getCardData = getCurrentPage.find(element => element.id === selectedCardId);
        renderModal(getCardData);


          refs.body.classList.add('no-scroll');
          document.querySelector('[data-modal-close]').addEventListener('click', onCloseBtn);
          document.querySelector('.modal__btn-watched').addEventListener('click', addToWatch);
          document.querySelector('.modal__btn-queue').addEventListener('click', addToQue);

          if(load(`watched ${selectedCardId}`)) {
           document.querySelector('.modal__btn-watched').classList.add('is-on');
          } else if (load(`queue ${selectedCardId}`)) {
           document.querySelector('.modal__btn-queue').classList.add('is-on');
          }


      }
     }
          function onCloseBtn() {
            refs.body.classList.remove('no-scroll');
            refs.backdrop.classList.add('is-hidden');
            document.querySelector('.modal__btn-queue').removeEventListener('click', addToQue);
            document.querySelector('.modal__btn-watched').removeEventListener('click', addToWatch);
            document.querySelector('[data-modal-close]').removeEventListener('click', onCloseBtn);
          }

      
   function sortedTargetElement (e) {
     let element = null;
     if (e.target.nodeName === 'IMG') {
       element = e.target.parentNode.parentNode;
     } else if (e.target.nodeName === 'P' || e.target.nodeName === 'H2') {
       element = e.target.parentNode.parentNode.parentNode;
     } else {
       return
     }
  
       return element;
     }
 
     function addToWatch (e) {
       const elementId = e.target.parentNode.id;
       const KEY_WT = `watched ${elementId}`;
       const KEY_QUE = `queue ${elementId}`;
       const dataElement = load(`${elementId}`);
       if (localStorage.length !== 0) {
         let keys = Object.keys(localStorage);
         if (!keys.find(el => el === KEY_WT)) {
             e.target.classList.add('is-on');
          save(`${KEY_WT}`, dataElement);
          if (load(`${KEY_QUE}`)) {
           remove(`${KEY_QUE}`);
           e.target.nextElementSibling.classList.remove('is-on');
           }
          } return
         }
   }

   function addToQue (e) {
     const elementId = e.target.parentNode.id;
     const KEY_WT = `watched ${elementId}`;
     const KEY_QUE = `queue ${elementId}`;
     const dataElement = load(`${elementId}`);
  
     if (localStorage.length !== 0) {
       let keys = Object.keys(localStorage);
      if (!keys.find(el => el === KEY_QUE)) {
           e.target.classList.add('is-on');
        save(`${KEY_QUE}`, dataElement);
        if (load(`${KEY_WT}`)) {
         remove(`${KEY_WT}`);
         e.target.previousElementSibling.classList.remove('is-on');
        }
        } return
       }
   }

   function closeModalHandler(e) {
     if (e.code === 'Escape') {
       refs.backdrop.classList.add('is-hidden');
       refs.body.classList.add('no-scroll');
       window.removeEventListener('keydown', closeModalHandler);
     }
   }


    function renderWatchedLibrary (e) { 
        gallery.innerHTML = '';
        watchedBtn.classList.add('is-on');
        if (queueBtn.classList.contains('is-on')) {
            queueBtn.classList.toggle('is-on');
        }
            
      renderCards(e);
     
  document.querySelector('.gallery').addEventListener('click', showCard);
      watchedBtn.removeEventListener('click', renderWatchedLibrary);
      queueBtn.addEventListener('click', renderQueueLibrary);
 
     }
     function renderQueueLibrary(e) {
        gallery.innerHTML = '';
        queueBtn.classList.add('is-on');
        if (watchedBtn.classList.contains('is-on')) {
            watchedBtn.classList.toggle('is-on');
        }
        renderCards(e);
        
  refs.galleryItem.addEventListener('click', showCard);
        queueBtn.removeEventListener('click', renderQueueLibrary);
        watchedBtn.addEventListener('click', renderWatchedLibrary);
 
     } 
    function renderCards (e) { 
   getStorageData(e).map(el =>  createMarkupElement(load(`${el}`)));
}
  

