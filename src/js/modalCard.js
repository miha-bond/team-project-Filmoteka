// import ThemoviedbAPI from './themoviedbAPI';
import { renderModal } from './renderModal';

import { load, remove, save } from './storage';
import { refs } from './refs';





export function showCard(e) {
  e.preventDefault();
   if(e.target.nodeName === "IMG" || e.target.nodeName === "H2" || e.target.nodeName === "P" ) {
  window.addEventListener('keydown', closeModalHandler);
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

  


  