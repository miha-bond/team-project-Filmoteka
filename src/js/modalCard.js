import { renderModal } from './renderModal';

import { load } from './storage';
import { refs } from './refs';
import {
  initStorage,
  closeModalHandler,
  modalListener,
} from './storage-proceccing';




export function showCard(e) {
  e.preventDefault();
  
  if (
    e.target.nodeName === 'IMG' ||
    e.target.nodeName === 'H2' ||
    e.target.nodeName === 'P'
  ) {e.currentTarget.id
    const parentContainer = sortedTargetElement(e);
    const selectedCardId = Number(parentContainer.id);
    const getCurrentPage = load('currentPage');
    const getCardData = getCurrentPage.find(
      element => element.id === selectedCardId
    );
    createModalByPageData(e.currentTarget.id).innerHTML = renderModal(getCardData); 
    
  window.addEventListener('keydown', closeModalHandler);
  document.querySelector('.modal').addEventListener('click' ,modalListener);
  refs.backdrop.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
  
const addTWtchBtn = document.querySelector('#watched');
    const addToQueBtn = document.querySelector('#queue');
    const STORAGE_LIBR_KEY1 = addTWtchBtn.id;
    const STORAGE_LIBR_KEY2 = addToQueBtn.id;
     initStorage(
       STORAGE_LIBR_KEY1,
       selectedCardId,
       document.querySelector('#watched')
     );
     initStorage(
       STORAGE_LIBR_KEY2,
       selectedCardId,
       document.querySelector('#queue')
     );


}
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
function createModalByPageData (id) {

  if (id === 'gL') {
return document.querySelector('#bL');
  }
return document.querySelector('#bH');
}


