 import { Notify } from 'notiflix';
 import { save, load } from './storage';
import { createMarkup, createMarkupElement } from './galleryMarkup';
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
 const dataS1 = [...load(KEYWORD)];
 const dataS2 = [...load(keyword2)];
 const findElement = finded('currentPage', elementId);
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
 if(! finded(KEYWORD, elementId) || dataS1.length === 0){
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

 let findElLb1 = finded(KEYWORD, elementId);
  if(! findElLb1 || dataS1.length === 0){
   ifNotIncludes(params);
   findElLb1 = finded(KEYWORD, elementId)
   document.getElementById(elementId.toString()).remove();
   createMarkupElement(findElLb1, refs.galleryItemsL);
document.querySelector(`[data-${KEYWORD}]`).disabled = false;
  } else {
  ifIncludes(params);
  
  if(finded(KEYWORD, elementId)) {

  }
  if (load(KEYWORD).length === 0 && load(keyword2).length === 0) {
    itsNotMovies();
  }else if (load(KEYWORD).length === 0 && load(keyword2).length !== 0){
    document.querySelector(`[data-${KEYWORD}]`).classList.remove('is-on');
    document.querySelector(`[data-${KEYWORD}]`).disabled = true;
    document.querySelector(`[data-${keyword2}]`).disabled = false;
    document.querySelector(`[data-${keyword2}]`).classList.add('is-on');
    refs.galleryItemsL.innerHTML = '';
    let dataLB = [...load(keyword2)];
    dataLB.map(el => createMarkupElement(el, refs.galleryItemsL));
    
   
  }document.getElementById(elementId.toString()).remove();
  e.target.parentNode.parentNode.parentNode.removeEventListener('click', modalListener);
  refs.body.classList.toggle('no-scroll');
  refs.backdrop.classList.toggle('is-hidden');
  window.removeEventListener('keydown', closeModalHandler);

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
  dataS1.pop(findElement);
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
  if (finded(keyword2, elementId)) {
    ifSbincl ({ 
      findElement,
      dataS2,
      keyword2,
       })
  }
  return 
}

function ifSbincl ({ 
  findElement,
  dataS2,
  keyword2,
   }) {
  document.querySelector(`#${keyword2}`).classList.remove('is-on');
const curBtnText = document.querySelector(`#${keyword2}`).textContent;
document.querySelector(`#${keyword2}`).textContent = changeBtnText(keyword2, curBtnText);
dataS2.pop(findElement)
save(keyword2, dataS2);
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
 