import ThemoviedbAPI from './themoviedbAPI';
import { renderModal, backdrop } from './renderModal';

import createMarkup from './galleryMarkup';
import { load, save } from './storage';

//refs
const refs = {
  renderModal: document.querySelector('.gallery__list'),
};

const apiService = new ThemoviedbAPI();

if (refs.renderModal) {
  refs.renderModal.addEventListener('click', showCard);
}

window.addEventListener('keydown', closeModalHandler);

function closeModalHandler(e) {
  if (e.code === 'Escape') {
    backdrop.classList.add('is-hidden');
  }
}

function showCard(e) {
  e.preventDefault();

  if (e.target.nodeName === 'LI') {
    return;
  }

  backdrop.classList.remove('is-hidden');

  fetchGallery(
    '/' +
      e.target.src.substring(
        e.target.src.lastIndexOf('/') + 1,
        e.target.src.length
      )
  );
}

function fetchGallery(params) {
  apiService
    // .fetchImage()
    .getUpcomingMovies()
    .then(data => {
      save(data.page, data.results);

      console.log('fetchGallery 1 then', data);
      return data.results;
    })
    .then(result => {
      console.log('result 123', result);

      result.forEach(element => {
        renderModal(element);
        let closeModal = document.querySelector('[data-modal-close]');
        closeModal.addEventListener('click', onCloseBtn);

        function onCloseBtn() {
          backdrop.classList.add('is-hidden');
        }
      });
    });
}
