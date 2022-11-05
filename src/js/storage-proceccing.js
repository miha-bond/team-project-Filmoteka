 import { Notify } from 'notiflix';
 import { save, load } from './storage';
import { createMarkupElement } from './galleryMarkup';
import { refs } from './refs';


export function initStorage (key, id, el) {
  
isInStorageInspector(key);
if(load(key).includes((id))){
el.classList.add('is-on');
el.textContent =  isRemoveBtnTxtData(key);
  }
}

export function isInStorageInspector (key) {
  if (! load(key)) {
    save(key, []);
      } 



}export function toggleToWatched (e) {
 
  const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
    const KEYWORD = e.target.id;
    const KEYWORD_SIBLING = e.target.nextElementSibling.id;
    let watched = load(KEYWORD);
    let queue = load(KEYWORD_SIBLING);
    e.target.classList.toggle('is-on');
    if(e.target.textContent = isRemoveBtnTxtData(KEYWORD)) {
      e.target.textContent = isRemoveBtnTxtData(KEYWORD_SIBLING);
    }
    e.target.textContent = isRemoveBtnTxtData(KEYWORD);

     if(watched.includes(elementId)) {
  watched.pop(elementId);
      save (KEYWORD, watched);
   return
     } else {
   
    e.target.textContent = isRemoveBtnTxtData(KEYWORD);
  watched.push(elementId);
    save(KEYWORD, watched);
if(queue.includes(elementId)) {
      e.target.nextElementSibling.classList.remove('is-on');
      e.target.nextElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
      queue.pop(elementId);
      save(KEYWORD_SIBLING, queue);
      } 
    } return
  }

  export function toggleToWatchedLb (e) {
 
    const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
      const KEYWORD = e.target.id;
      const KEYWORD_SIBLING = e.target.nextElementSibling.id;
      let watched = load(KEYWORD);
      let queue = load(KEYWORD_SIBLING);
      e.target.classList.toggle('is-on');
      if(e.target.textContent = isRemoveBtnTxtData(KEYWORD)) {
        e.target.textContent = isRemoveBtnTxtData(KEYWORD_SIBLING);
      }
      e.target.textContent = isRemoveBtnTxtData(KEYWORD);
       if(watched.includes(elementId)) {
        
         watched.pop(elementId);
        save (KEYWORD, watched);
        document.getElementById(elementId.toString()).remove();
        if (load('watched').length === 0 && load('queue').length === 0) {
         document.querySelector('.modal__icon-close').dispatchEvent(new MouseEvent('click'));
     itsNotMovies();
         
        }
        if (load('watched').length === 0 && load('queue').length !==0) {
         document.querySelector('[data-watched]').classList.remove('is-on');
     document.querySelector('[data-watched]').disabled = true;
         document.querySelector('[data-queue]').dispatchEvent(new MouseEvent('click'));
        }
       return
     } else {
      
    watched.push(elementId);
      save(KEYWORD, watched);
      if(load('watched').length === 1) {
        document.querySelector('[data-watched]').disabled = false;
      } 
      if (! load('queue').includes(elementId)) {
        createMarkupElement(load('currentPage').find(el => Number(el.id) === elementId), refs.galleryItemsL);
    } 
      if(queue.includes(elementId)) {
        e.target.nextElementSibling.classList.remove('is-on');
        e.target.nextElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
        queue.pop(elementId);
        save(KEYWORD_SIBLING, queue);
        if (load('queue').length === 0) {
          document.querySelector('[data-queue]').classList.remove('is-on');
         document.querySelector('[data-queue]').disabled = true;
          document.querySelector('[data-watched]').dispatchEvent(new MouseEvent('click'));
  
        }
      } 
    return
      }
    }
    

export function toggleToQueue (e) {
 const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
 const KEYWORD_SIBLING = e.target.previousElementSibling.id;
 const  KEYWORD  = e.target.id;
 let watched = load(KEYWORD_SIBLING);
 let queue = load(KEYWORD);
 e.target.classList.toggle('is-on');
 if(e.target.textContent = isRemoveBtnTxtData(KEYWORD)) {
   e.target.textContent = isRemoveBtnTxtData(KEYWORD_SIBLING);
 }
 e.target.textContent = isRemoveBtnTxtData(KEYWORD);
 if(queue.includes(elementId)) {
queue.pop(elementId);
 save (KEYWORD, queue);
 return
 } else {
  queue.push(elementId);
  save(KEYWORD, queue);
if(watched.includes(elementId)) {
    e.target.previousElementSibling.classList.remove('is-on');
    e.target.previousElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
    watched.pop(elementId)
    save(KEYWORD_SIBLING, watched);
  }
  return
} 
 }


export function toggleToQueueLb (e) {
  const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
  const KEYWORD_SIBLING = e.target.previousElementSibling.id;
  const  KEYWORD  = e.target.id;
  let watched = load(KEYWORD_SIBLING);
  let queue = load(KEYWORD);

  e.target.classList.toggle('is-on');
  if(e.target.textContent = isRemoveBtnTxtData(KEYWORD)) {
    e.target.textContent = isRemoveBtnTxtData(KEYWORD_SIBLING);
  }
  e.target.textContent = isRemoveBtnTxtData(KEYWORD);
  if(queue.includes(elementId)) {
   queue.pop(elementId);
  save (KEYWORD, queue);
  document.getElementById(elementId.toString()).remove();
  if (load('queue').length === 0 && load('watched').length === 0) {
   document.querySelector('.modal__icon-close').dispatchEvent(new MouseEvent('click'));
   itsNotMovies();
 
 }
 if (load('queue').length === 0 && load('watched').length !== 0){
     document.querySelector('[data-queue]').classList.remove('is-on');
     document.querySelector('[data-queue]').disabled = true;
    document.querySelector('[data-watched]').dispatchEvent(new MouseEvent('click'));
   } 
 return
  } else {
   queue.push(elementId);
   save(KEYWORD, queue);
  if(load('queue').length === 1 ) {
     document.querySelector('[data-queue]').disabled = false;
    } 
   if ( ! load('watched').includes(elementId)) {
     createMarkupElement(load('currentPage').find(el => Number(el.id) === elementId));
     return
     }
 if(watched.includes(elementId)) {
     e.target.previousElementSibling.classList.remove('is-on');
     e.target.previousElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
     watched.pop(elementId)
     save(KEYWORD_SIBLING, watched);
     if (load('watched').length === 0 &&  load('queue').length !==0) {
       document.querySelector('[data-watched]').classList.remove('is-on');
       document.querySelector('[data-watched]').disabled = true;
       document.querySelector('[data-queue]').dispatchEvent(new MouseEvent('click'));
      } 
      }
   return
     } 
  
  
 }
 


 function  isRemoveBtnTxtData (value) {
const valValue = value.toUpperCase();
let text = 'remove from';
text = text.toUpperCase();
text = `${text} ${valValue}`;
return text;
}


function  noAddBtnTxtData (value) {
const valValue = value.toUpperCase();
let text = 'add to';
text = text.toUpperCase();
text = `${text} ${valValue}`;
return text;
}

export function modalListener (e) {
    if(e.currentTarget.parentNode.id === 'bH'
    && e.target.id === 'watched'){
      toggleToWatched(e);
    } else if(e.currentTarget.parentNode.id === 'bH' &&
    e.target.id === 'queue') {
      toggleToQueue(e);
    } else if(e.currentTarget.parentNode.id === 'bL'
    && e.target.id === 'watched') {
      toggleToWatchedLb(e);
    } else if(e.currentTarget.parentNode.id === 'bL' &&
    e.target.id === 'queue') {
      toggleToQueueLb(e);
    } else if(e.currentTarget.childNodes[1].firstElementChild === e.target ||
      e.currentTarget.childNodes[1].firstElementChild.firstElementChild === e.target){
onCloseBtn(e);
    } else {
      return
    }
  
   }


   function onCloseBtn(e) {
     e.target.parentNode.parentNode.removeEventListener('click', modalListener);
     refs.body.classList.toggle('no-scroll');
     refs.backdrop.classList.toggle('is-hidden');
     window.removeEventListener('keydown', closeModalHandler);

    
     }
   
    export function closeModalHandler(e) {
      if (e.code === 'Escape') {
        refs.bskDrp.classList.toggle('is-hidden');
        refs.body.classList.toggle('no-scroll');
        window.removeEventListener('keydown', closeModalHandler);
      }
    }


     function itsNotMovies (){
 
    
       document.querySelector('#data-href').dispatchEvent(new MouseEvent('click'));

  
      setTimeout(() => {
        Notify.failure('Add movie to library!',  {
          position: 'center-center',
          width: '57vw',
          fontSize: '75px',
          fontFamily:'Verdana',
          failure: {
              background: '#000000dd',
            textColor: '#ff0000',
          }
          })
      }, 300)
    
  return
  }
    
