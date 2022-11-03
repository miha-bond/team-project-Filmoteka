import { Notify } from 'notiflix';
import { refs } from './refs';
import { load } from './storage';
import { initStorage } from './storage-proceccing';
import { createMarkupElement } from './galleryMarkup';
import initPage from './initPage';
import { buttonIsOnClassName } from './modalCard';

if (refs.watcLbBtn === null || refs.queBtn === null) return;

if (refs.watcLbBtn.classList.contains(buttonIsOnClassName)) {
  refs.watcLbBtn.classList.remove(buttonIsOnClassName);
} else if (refs.queBtn.classList.contains(buttonIsOnClassName)) {
  refs.queBtn.classList.remove(buttonIsOnClassName);
}

refs.watcLbBtn.addEventListener('click', viewWt);
refs.queBtn.addEventListener('click', viewQue);

export function viewQue() {
  let queStorageData = load('queue');
  let currentStorageData = load('currentPage');

  if (queStorageData.length !== 0) {
    refs.queBtn.classList.add(buttonIsOnClassName);

    if (refs.watcLbBtn.classList.contains(buttonIsOnClassName)) {
      refs.watcLbBtn.classList.remove(buttonIsOnClassName);
    }
    queStorageData = queStorageData.map(el => Number(el));
    currentStorageData = currentStorageData.filter(el =>
      queStorageData.includes(el.id)
    );
    refs.galleryItem.innerHTML = '';
    currentStorageData.map(createMarkupElement);
  } else {
    Notify.failure('Add movie to QUEUE!', {
      position: 'center-center',
      width: '45vw',
      fontSize: '50px',
      fontFamily: 'Verdana',
      failure: {
        background: '#000000dd',
        textColor: '#ff0000',
      },
    });
    initPage();
    return;
  }
}

export function viewWt() {
  let watchedStorageData = load('watched');
  let currentStorageData = load('currentPage');

  if (watchedStorageData.length !== 0) {
    refs.watcLbBtn.classList.add(buttonIsOnClassName);

    if (refs.queBtn.classList.contains(buttonIsOnClassName)) {
      refs.queBtn.classList.remove(buttonIsOnClassName);
    }
    watchedStorageData = watchedStorageData.map(el => Number(el));
    currentStorageData = currentStorageData.filter(el =>
      watchedStorageData.includes(el.id)
    );
    refs.galleryItem.innerHTML = '';
    currentStorageData.map(createMarkupElement);
  } else {
    Notify.failure('Add movie to WATCHED!', {
      position: 'center-center',
      width: '45vw',
      fontSize: '50px',
      fontFamily: 'Verdana',
      failure: {
        background: '#000000dd',
        textColor: '#ff0000',
      },
    });
    initPage();
    return;
  }
}
