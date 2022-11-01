import { refs } from "./refs";
import { load } from "./storage";
import { getStorageData } from "./storage-proceccing";
import {createMarkupElement} from './galleryMarkup';
import initPage from "./initPage";

const queueBtn = refs.queueButton;
const watchedBtn = refs.watchedButton;
const gallery = refs.galleryItem;
initPage();
    if (document.title === 'Page Queue') {
        watchedBtn.addEventListener('click', renderWatchedLibrary);
queueBtn.addEventListener('click', renderQueueLibrary);
    }
 


 function renderWatchedLibrary (e) {
     
    gallery.innerHTML = '';
    watchedBtn.classList.add('is-on');
    if(queueBtn.classList.contains('is-on')) {
        queueBtn.classList.remove('is-on');
    }

 renderCards(e);
 watchedBtn.removeEventListener('click', renderWatchedLibrary);
 queueBtn.addEventListener('click', renderQueueLibrary);

 
 }
  
 function renderQueueLibrary(e) {
    gallery.innerHTML = '';
    queueBtn.classList.add('is-on');
    if(watchedBtn.classList.contains('is-on')){
        watchedBtn.classList.remove('is-on');
    }
    renderCards(e);
    queueBtn.removeEventListener('click', renderQueueLibrary);
    watchedBtn.addEventListener('click', renderWatchedLibrary);

 }
   
function renderCards (e) {
    const nameKey = e.target.textContent.toLowerCase();
 getStorageData(nameKey).map(el => {
   const getStorageData = load(`${el}`);
 return  createMarkupElement(getStorageData);
});
}


 refs.navHeader.addEventListener('click', exit);

 function exit (e) {
     if(e.target.nodeName === 'A') {
        refs.navHeader.removeEventListener('click', exit);
        watchedBtn.removeEventListener('click', renderWatchedLibrary);
        queueBtn.removeEventListener('click', renderQueueLibrary);
         }
     }
 

