import {Notify} from 'notiflix';
import { refs } from "./refs";
import { load } from "./storage";
import { createMarkupElement} from "./galleryMarkup";
 import {showCard} from "./modalCard";


    resetLibrary('watched', 'queue');
  




function viewQue () {
    let currentP = load('currentPage');
  let queStorageData = load('queue');
       refs.queBtn.classList.add('is-on');
       if(refs.watcLbBtn.classList.contains('is-on')) {
        refs.watcLbBtn.classList.remove('is-on')
       }
        queStorageData = queStorageData.map(el => Number(el));
        currentP =
        currentP.filter(el => queStorageData.includes(el.id));
        refs.galleryItemsL.innerHTML = '';
        currentP.map( el => createMarkupElement(el, refs.galleryItemsL));
        refs.galleryItemsL.addEventListener('click', showCard)
        }
    


 function viewWt() {
    let currentP = load('currentPage');
    let watchedStorageData = load('watched');
  refs.watcLbBtn.classList.add('is-on');
  if(refs.queBtn.classList.contains('is-on')) {
  refs.queBtn.classList.remove('is-on');
} 
    watchedStorageData = watchedStorageData.map(el => Number(el));
    currentP =
    currentP.filter(el => watchedStorageData.includes(el.id));
    refs.galleryItemsL.innerHTML = '';
    currentP.map( el => createMarkupElement(el, refs.galleryItemsL));
    refs.galleryItemsL.addEventListener('click', showCard)
    } 



function resetLibrary (v1, v2) {
    const w = load(v1);
    const q = load(v2);
    if(! w && ! q || w === 0 && q === 0 || ! w && q === 0 || w === 0 && ! q  )  {
        NotMovies();
           }
           initLibrary ();
}

function initLibrary () {
    if (load('watched').length === 0 && load('queue').length === 0) {
        NotMovies();
    }
    let currentP = load('currentPage');
    libraryBtnDsbl ('watched', document.querySelector('[data-watched]'));
    libraryBtnDsbl ('queue', document.querySelector('[data-queue]'));
    
            if( load('watched').length !==0 &&  load('queue').length === 0 || load('watched').length !==0 && ! load('queue')) {
let library = load('watched');
library = library.map(el => Number(el));
library =  currentP.filter(el => library.includes(Number(el.id)));
library.map(el => createMarkupElement(el, refs.galleryItemsL));
refs.galleryItemsL.addEventListener('click', showCard);
refs.watcLbBtn.addEventListener('click', viewWt);
return
} else if(load('queue').length !==0 && load('watched').length === 0 || load('queue').length !==0 && ! load('watched')) {
    
            document.querySelector('[data-watched]').disabled = true;
            let library = load('queue')
            library = library.map(el => Number(el));
            library =  currentP.filter(el => library.includes(Number(el.id)));
            library.map(el => createMarkupElement(el, refs.galleryItemsL));
            refs.galleryItemsL.addEventListener('click', showCard);
            refs.queBtn.addEventListener('click', viewQue);
            return
         } else {
            
            let library = [...load('watched'), ... load('queue')];
            
        currentP.filter(el => library.map(el =>Number(el)).includes(Number(el.id))).map(el => createMarkupElement(el, refs.galleryItemsL));
        refs.galleryItemsL.addEventListener('click', showCard);
        refs.watcLbBtn.addEventListener('click', viewWt);
        refs.queBtn.addEventListener('click', viewQue);
        return
        }
}


function libraryBtnDsbl (v, bt) { 
    if (load(v).length === 0 ){
        bt.disabled = true;
    }
} 

function NotMovies (){
     
    document.querySelector('#data-href').dispatchEvent(new MouseEvent('click'));

  
    setTimeout(() => {
      Notify.failure('Add movie to library!',  {
        position: 'center-center',
        width: '55vw',
        fontSize: '75px',
        fontFamily:'Verdana',
        failure: {
            background: '#000000dd',
          textColor: '#ff0000',
        }
        })
    }, 10)
}

