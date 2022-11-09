 import { Notify } from 'notiflix';
 import { save, load } from './storage';
import { createMarkupElement } from './galleryMarkup';
import { refs } from './refs';

export function initStorage (key, id) {
  let text = 'remove from';
  let d = key.toLowerCase();
if(finded(key, id)){
  document.querySelector(`#${key}`).classList.add('is-on');
document.querySelector(`#${key}`).textContent =  `${text} ${d}`;
  }
  isInStorageInspector(key, id);
}
export function isInStorageInspector (key) {
  if (! load(key)) {
    save(key, []);
      } 

    }
export function finded (key, elId) {
      if (load(key) && load(key).length !== 0) {
        return load(key).find(e => e.id === elId);
      }
      }
export function toggleTo (e) {
 const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
 const keyword2 = toDetermine(e);
 const  KEYWORD  = e.target.id;
 const data = [...load('currentPage')]
 const dataS1 = [...load(KEYWORD)];
 const dataS2 = [...load(keyword2)];
 const findElement = findedLb(data, elementId);
const params = {
   findElement,
dataS1,
dataS2,
KEYWORD,
 keyword2,
 elementId,
}
 e.target.classList.toggle('is-on');
e.target.textContent = changeBtnText(KEYWORD, e.target.textContent);
 if(! findedLb(dataS1, elementId)){
  ifNotIncludes(params);
 return
} else {
 ifIncludes(params);

} 
 }
 export function toggleToLb (e) {
  const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
  const keyword2 = toDetermine(e);
  const  KEYWORD  = e.target.id;
  const dataS1 = [...load(KEYWORD)];
  const dataS2 = [...load(keyword2)];
  const data = [...dataS1, ...dataS2];
  const findElement = findedLb(data, elementId);
 const params = {
  findElement,
  dataS1,
dataS2,
KEYWORD,
 keyword2,
 elementId,
 }
 e.target.classList.toggle('is-on');
 e.target.textContent = changeBtnText(KEYWORD, e.target.textContent);

 let findElLb1 = findedLb(dataS1, elementId);
  if(! findElLb1){
   ifNotIncludes(params);
   if(load(keyword2).length === 0) {
    document.querySelector(`[data-${keyword2}]`).classList.remove('is-on');
    document.querySelector(`[data-${keyword2}]`).disabled = true;
    refs.galleryItemsL.innerHTML = '';
    [...load(KEYWORD),...load(keyword2)].map(el => createMarkupElement(el, refs.galleryItemsL));
   }
   findElLb1 = finded(KEYWORD, elementId)
   document.getElementById(elementId.toString()).remove();
   createMarkupElement(findElLb1, refs.galleryItemsL);
document.querySelector(`[data-${KEYWORD}]`).disabled = false;
  } else {
  ifIncludes(params);
  if (load(KEYWORD).length === 0 && load(keyword2).length === 0) {
    itsNotMovies();
  } else if (load(KEYWORD).length === 0 && load(keyword2).length !== 0){
    document.querySelector(`[data-${KEYWORD}]`).classList.remove('is-on');
    document.querySelector(`[data-${KEYWORD}]`).disabled = true;
    document.querySelector(`[data-${keyword2}]`).disabled = false;
    
    refs.galleryItemsL.innerHTML = '';
    [...load(keyword2)].map(el => createMarkupElement(el, refs.galleryItemsL));
    }
    refs.galleryItemsL.innerHTML = '';
    [...load(KEYWORD),...load(keyword2)].map(el => createMarkupElement(el, refs.galleryItemsL));

return
   } 
}
function  changeBtnText (value, textCont) {
  let text = textCont.toLowerCase();
  let text1 = 'add to';
  let text2 = 'remove from';

if (text.includes(text2)) {
 return `${text1} ${value}`;
} 
return `${text2} ${value}`;
}
export function modalListener (e) {
    if(e.currentTarget.parentNode.id === 'bH' && 
    e.target.id === 'watched' ||
    e.currentTarget.parentNode.id === 'bH'&&
    e.target.id === 'queue'){
      toggleTo(e);
      return
    }else if(e.currentTarget.parentNode.id === 'bL'&&
    e.target.id === 'watched' ||
    e.currentTarget.parentNode.id === 'bL'&&
    e.target.id === 'queue') {
      toggleToLb(e);
      return
    } else if(e.target.nodeName === 'svg' ||
    e.target.nodeName === 'use'){
onCloseBtn(e);
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
function ifIncludes ({findElement, dataS1, KEYWORD}) {
  const dataS1Element = dataS1.find(e => e.id === findElement.id);
  dataS1.pop(dataS1Element);
  save(KEYWORD, dataS1);
}
function ifNotIncludes ({ 
  findElement,
  dataS1,
  dataS2,
  KEYWORD,
  keyword2,
  elementId,
   }) {
  
  dataS1.push(findElement);
  save (KEYWORD, dataS1);
  ifSbincl ({ 
      findElement,
      dataS2,
      keyword2,
      elementId,
       })
 
  return 
}
function ifSbincl ({ 
  findElement,
  dataS2,
  keyword2,
  elementId,
   }) {
    if (findedLb(dataS2, elementId)) {
     
      const dataS2Element = dataS2.find(e => e.id === findElement.id);
  document.querySelector(`#${keyword2}`).classList.remove('is-on');
const curBtnText = document.querySelector(`#${keyword2}`).textContent;
document.querySelector(`#${keyword2}`).textContent = changeBtnText(keyword2, curBtnText);
dataS2.pop(dataS2Element);
save(keyword2, dataS2);
}
return
}

function toDetermine (e) {
  let id1 = 'watched';
  let id2 = 'queue';
if(e.target.id === 'watched') {
  return  id2;
}
  if (e.target.id === 'queue') {
    return id1;
  }
}
function findedLb (arr, elId) {
  
    if (arr.length !== 0) {
      return arr.find(e => e.id === elId);
    }
    }
 