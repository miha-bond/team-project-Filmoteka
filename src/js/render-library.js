import {Notify} from 'notiflix';
import { refs } from "./refs";
import { load } from "./storage";
import { createMarkupElement} from "./galleryMarkup";
 import {showCard} from "./modalCard";
 import{finded} from "./storage-proceccing";

 notMovies();
 initLibrary (); 




function view (e) {

     if(e.target.nodeName === 'BUTTON'){
         let currentKey = e.target.textContent;
         currentKey = currentKey.toLowerCase();
           let queStorageData = load(`${currentKey}`);
           let currentAtrSblBtn =  deter(e);

           
                document.querySelector(`[data-${currentKey}]`).classList.toggle('is-on');
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

    libraryBtnDsbl (dataW, key1);
    libraryBtnDsbl (dataQ, key2);
 let library = [...dataW, ... dataQ];
            
 library.map(el => createMarkupElement(el, refs.galleryItemsL));
 refs.galleryItemsL.addEventListener('click', showCard);
 refs.libraryButtons.addEventListener('click', view)
 return
}


function libraryBtnDsbl (v, k) { 
    if (v.length === 0 ){
       document.querySelector(`[data-${k}]`).disabled = true;
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

// function render1 (key1, key2, fn) {
//     if( load(`${key1}`).length !==0 &&  load(`${key2}`).length === 0 || load(`${key1}`).length !==0 && ! load(`${key2}`)) {
//         const disBtn = document.querySelector(`[data-${key2}]`);
//         disBtn.classList.remove('is-on');
//        disBtn.disabled = true;
//        let library = load(`${key1}`);
//         library = library.map(el => Number(el));
//         library =  currentP.filter(el => library.includes(Number(el.id)));
//         library.map(el => createMarkupElement(el, refs.galleryItemsL));
//         refs.galleryItemsL.addEventListener('click', showCard);
//         refs.watcLbBtn.addEventListener('click', fn);
//        return
//         }
//         return
// }
