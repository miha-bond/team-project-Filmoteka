import { renderModal } from './renderModal';

import { load } from './storage';
import { refs } from './refs';

import {
  initStorage,
  toggleToWatched,
  toggleToQueue,
} from './storage-proceccing';

const buttonIsOnClassName = 'is-on';
export async function showCard(e) {
  e.preventDefault();
  if (
    e.target.nodeName === 'IMG' ||
    e.target.nodeName === 'H2' ||
    e.target.nodeName === 'P'
  ) {
    const parentContainer = sortedTargetElement(e);
    const selectedCardId = Number(parentContainer.id);
    const getCurrentPage = load('currentPage');
    const getCardData = getCurrentPage.find(
      element => element.id === selectedCardId
    );
    renderModal(getCardData);

    const addTWtchBtn = document.querySelector('#watched');
    const addToQueBtn = document.querySelector('#queue');
    const STORAGE_LIBR_KEY1 = addTWtchBtn.id;
    const STORAGE_LIBR_KEY2 = addToQueBtn.id;
    initStorage(
      STORAGE_LIBR_KEY1,
      parentContainer.id,
      document.querySelector('#watched')
    );
    initStorage(
      STORAGE_LIBR_KEY2,
      parentContainer.id,
      document.querySelector('#queue')
    );

    refs.backdrop.classList.remove('is-hidden');
    refs.body.classList.add('no-scroll');
    document
      .querySelector('[data-modal-close]')
      .addEventListener('click', onCloseBtn);
    addTWtchBtn.addEventListener('click', toggleToWatched);
    addToQueBtn.addEventListener('click', toggleToQueue);
    window.addEventListener('keydown', closeModalHandler);
    refs.backdrop.addEventListener('click', ClickCheck);
  }
}

function ClickCheck(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  onCloseBtn(e);

  return;
}

function onCloseBtn(e) {
  const card = document.getElementById(e.target.parentNode.parentNode.id);
  if (
    (document.title === 'Page Queue' &&
      document
        .querySelector('[data-watched]')
        .classList.contains(buttonIsOnClassName) &&
      document
        .querySelector('#queue')
        .classList.contains(buttonIsOnClassName)) ||
    (document.title === 'Page Queue' &&
      document
        .querySelector('[data-queue]')
        .classList.contains(buttonIsOnClassName) &&
      document
        .querySelector('#watched')
        .classList.contains(buttonIsOnClassName)) ||
    (document.title === 'Page Queue' &&
      document
        .querySelector('[data-watched]')
        .classList.contains(buttonIsOnClassName) &&
      !document
        .querySelector('#watched')
        .classList.contains(buttonIsOnClassName)) ||
    (document.title === 'Page Queue' &&
      document
        .querySelector('[data-queue]')
        .classList.contains(buttonIsOnClassName) &&
      !document.querySelector('#queue').classList.contains(buttonIsOnClassName))
  ) {
    setTimeout(() => {
      card.remove();
    }, 700);
  }
  refs.body.classList.remove('no-scroll');
  refs.backdrop.classList.add('is-hidden');
  document
    .querySelector('#watched')
    .removeEventListener('click', toggleToWatched);
  document.querySelector('#queue').removeEventListener('click', toggleToQueue);
  document
    .querySelector('[data-modal-close]')
    .removeEventListener('click', onCloseBtn);
}

function sortedTargetElement(e) {
  let element = null;
  if (e.target.nodeName === 'IMG') {
    element = e.target.parentNode.parentNode;
  } else if (e.target.nodeName === 'P' || e.target.nodeName === 'H2') {
    element = e.target.parentNode.parentNode.parentNode;
  } else {
    return;
  }
  return element;
}

function closeModalHandler(e) {
  if (e.code === 'Escape') {
    refs.backdrop.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    window.removeEventListener('keydown', closeModalHandler);
  }
}
