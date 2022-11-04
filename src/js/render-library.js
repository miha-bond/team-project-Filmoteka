import {Notify} from 'notiflix';
import { refs } from "./refs";
import { load } from "./storage";
import { createMarkupElement} from "./galleryMarkup";
import {showCard} from "./modalCard";



const text = 'Add movie to library!';
const params = {
    position: 'center-center',
    width: '55vw',
    fontSize: '75px',
    fontFamily:'Verdana',
    failure: {
        background: '#000000dd',
      textColor: '#ff0000',
    }
    };
if(document.title === 'Page Queue') {
resetLibrary();
libraryClassInspect();

refs.galleryItem.innerHTML = '';

initLibrary()

}


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
        refs.galleryItem.innerHTML = '';
        currentP.map( createMarkupElement);
        refs.galleryItem.addEventListener('click', showCard)
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
    refs.galleryItem.innerHTML = '';
    currentP.map( createMarkupElement);
    refs.galleryItem.addEventListener('click', showCard)
    } 



function isValid (v) {
    if (load(v) && load(v) !== 0) {
        return load(v);
    }
}
function resetLibrary () {
    if(! isValid('watched') && ! isValid('queue')) {
        itsNotMovies();
           }

}

function initLibrary () {
    let currentP = load('currentPage');

            if( load('watched').length !==0 &&  load('queue').length === 0 || load('watched').length !==0 && ! load('queue')) {

                document.querySelector('[data-queue]').disabled = true;
let library = load('watched');
library = library.map(el => Number(el));
library =  currentP.filter(el => library.includes(el.id));
currentP.map( createMarkupElement);
refs.galleryItem.addEventListener('click', showCard);
refs.watcLbBtn.addEventListener('click', viewWt);
return
} else if(load('queue').length !==0 && load('watched').length === 0 || load('queue').length !==0 && ! load('watched')) {
            document.querySelector('[data-watched]').disabled = true;
            let library = load('queue')
            library = library.map(el => Number(el));
            library =  currentP.filter(el => library.includes(el.id));
            library.map( createMarkupElement);
            refs.galleryItem.addEventListener('click', showCard);
            refs.queBtn.addEventListener('click', viewQue);
            return
         } else {
            let library = [...load('watched'), ... load('queue')];
            library = library.map(el => Number(el));
        currentP =  currentP.filter(el => library.includes(el.id));
        currentP.map( createMarkupElement);
        refs.galleryItem.addEventListener('click', showCard);
        refs.watcLbBtn.addEventListener('click', viewWt);
        refs.queBtn.addEventListener('click', viewQue);
        return
        }
      return
}


function libraryClassInspect () { 
   
        if(document.querySelector('[data-watched]').classList.contains('is-on')){
            document.querySelector('[data-watched]').classList.remove('is-on'); 
        }else if (document.querySelector('[data-queue]').classList.contains('is-on')){
            document.querySelector('[data-queue]').classList.remove('is-on');  
        }
    
return
}

export function itsNotMovies (){
    Notify.failure(text, params);
    setTimeout(() => {
       document.querySelector('[data-href]').dispatchEvent(new MouseEvent('click'));
    }, 1800);
}