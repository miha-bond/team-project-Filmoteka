import {Notify} from 'notiflix';
import { refs } from "./refs";
import { load } from "./storage";
import { createMarkupElement} from "./galleryMarkup";
 import {showCard} from "./modalCard";

 notMovies();
 initLibrary (); 
function view (e) {

     if(e.target.nodeName === 'BUTTON'){
         let currentKey = e.target.textContent;
         currentKey = currentKey.toLowerCase();
           let queStorageData = load(`${currentKey}`);
           let currentAtrSblBtn =  deter(e);

           
                document.querySelector(`[data-${currentKey}]`).classList.add('is-on');
                if( document.querySelector(`[data-${currentAtrSblBtn}]`).classList.contains('is-on')) {
                    document.querySelector(`[data-${currentAtrSblBtn}]`).classList.remove('is-on');
                   }
               
                refs.galleryItemsL.innerHTML = ''
                 queStorageData = queStorageData.map(el => createMarkupElement(el, refs.galleryItemsL));
                 refs.galleryItemsL.addEventListener('click', showCard)
     }
}
function deter(e) {
    let text1 =  'watched';
    let text2 = 'queue';
if (e.target.textContent === 'watched'){
    return text2;
}
if (e.target.textContent === 'queue'){
    return text1;
}
    } 
function initLibrary () {
    const key1 = 'watched';
    const key2 = 'queue';
    const dataW = [...load(key1)];
    const dataQ = [...load(key2)];

    libraryBtnDsbl ( key1);
    libraryBtnDsbl ( key2);
 let library = [...dataW, ... dataQ];
            
 library.map(el => createMarkupElement(el, refs.galleryItemsL));
 refs.galleryItemsL.addEventListener('click', showCard);
 refs.libraryButtons.addEventListener('click', view)
 return
}
function libraryBtnDsbl (k) { 
    if (load(k).length === 0 ){
        document.querySelector(`[data-${k}]`).disabled = true;
        document.querySelector(`[data-${k}]`).classList.remove('is-on');
    }
} 
function notMovies (){
    if(! load('watched') && ! load('queue') ||
    load('queue').length === 0 && load('watched').length === 0 ) {
        Notify.failure('Add movie to library!',  {
            width: '55vw',
            fontSize: '75px',
            fontFamily:'Verdana',
            failure: {
                background: '#000000dd',
              textColor: '#ff0000',
            }
            })     
    document.querySelector('#data-href').dispatchEvent(new MouseEvent('click'));
           }
 
}

