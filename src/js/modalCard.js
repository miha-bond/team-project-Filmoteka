// import ThemoviedbAPI from './themoviedbAPI';
import { renderModal } from './renderModal';

import { load, save } from './storage';
import { refs } from './refs';

// const API = new ThemoviedbAPI();

if (refs.renderModal) {
  refs.renderModal.addEventListener('click', showCard);
}

// window.addEventListener('keydown', closeModalHandler);

function closeModalHandler(e) {
  if (e.code === 'Escape') {
    refs.backdrop.classList.add('is-hidden');
    refs.body.classList.toggle('no-scroll');
    window.removeEventListener('keydown', closeModalHandler);
  }
}

function showCard(e) {
  e.preventDefault();
  window.addEventListener('keydown', closeModalHandler);

  if (e.target.nodeName === 'DIV') {
    return;
  }
  const selectedCardId = Number(e.target.id);
  const getCurrentPage = load('currentPage');

  getCurrentPage.forEach(element => {
    if (selectedCardId === element.id) {
      renderModal(element);
      let closeModal = document.querySelector('[data-modal-close]');
      closeModal.addEventListener('click', onCloseBtn);

      function onCloseBtn() {
        window.removeEventListener('keydown', closeModalHandler);
        refs.body.classList.toggle('no-scroll');
        refs.backdrop.classList.add('is-hidden');
      }
    }
  });

  refs.backdrop.classList.remove('is-hidden');
  refs.body.classList.toggle('no-scroll');
}
