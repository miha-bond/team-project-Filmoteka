import { save, load } from './storage';
import { createMarkupElement } from './galleryMarkup';
export function initStorage(key, id, el) {
  isInStorageInspector(key);
  if (load(key).includes(Number(id))) {
    el.classList.add('is-on');
    el.textContent = isRemoveBtnTxtData(key);
  }
}

export function isInStorageInspector(key) {
  if (!load(key)) {
    save(key, []);
  }
}

export function toggleToWatched(e) {
  const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
  const KEYWORD = e.target.id;
  const KEYWORD_SIBLING = e.target.nextElementSibling.id;
  let watched = load(KEYWORD);
  let queue = load(KEYWORD_SIBLING);

  if (watched.includes(elementId)) {
    e.target.textContent = noAddBtnTxtData(KEYWORD);
    e.target.classList.remove('is-on');
    watched.pop(elementId);
    save(KEYWORD, watched);
    if (document.title === 'Page Queue') {
      document.getElementById(elementId.toString()).remove();
    } else if (document.title === 'Page Queue' && watched.length === 0) {
      document.querySelector('[data-watched]').disabled = true;
    }
    return;
  } else if (!watched.includes(elementId)) {
    e.target.classList.add('is-on');
    e.target.textContent = isRemoveBtnTxtData(KEYWORD);
    watched.push(elementId);
    save(KEYWORD, watched);
    if (queue.includes(elementId)) {
      e.target.nextElementSibling.classList.remove('is-on');
      e.target.nextElementSibling.textContent =
        noAddBtnTxtData(KEYWORD_SIBLING);
      if (document.title === 'Page Queue' && !queue.includes(elementId)) {
        createMarkupElement(
          load('currentPage').find(el => Number(el.id) === elementId)
        );
      } else if (document.title === 'Page Queue' && queue.length === 0) {
        document.querySelector('[data-queue]').disabled = true;
      }
      queue.pop(elementId);
      save(KEYWORD_SIBLING, queue);
    } else if (document.title === 'Page Queue' && watched.length === 1) {
      document.querySelector('[data-watched]').disabled = false;
    }
    return;
  }
}

export function toggleToQueue(e) {
  const elementId = Number(e.target.parentNode.parentNode.parentNode.id);
  const KEYWORD_SIBLING = e.target.previousElementSibling.id;
  const KEYWORD = e.target.id;
  let watched = load(KEYWORD_SIBLING);
  let queue = load(KEYWORD);
  if (queue.includes(elementId)) {
    e.target.textContent = noAddBtnTxtData(KEYWORD);
    e.target.classList.remove('is-on');
    queue.pop(elementId);
    save(KEYWORD, queue);
    if (document.title === 'Page Queue') {
      document.getElementById(elementId.toString()).remove();
    } else if (document.title === 'Page Queue' && queue.length === 0) {
      document.querySelector('[data-queue]').disabled = true;
    }
    return;
  } else if (!queue.includes(elementId)) {
    e.target.classList.add('is-on');
    e.target.textContent = isRemoveBtnTxtData(KEYWORD);
    queue.push(elementId);
    save(KEYWORD, queue);
    if (watched.includes(elementId)) {
      e.target.previousElementSibling.classList.remove('is-on');
      e.target.previousElementSibling.textContent =
        noAddBtnTxtData(KEYWORD_SIBLING);
      if (document.title === 'Page Queue' && !watched.includes(elementId)) {
        createMarkupElement(
          load('currentPage').find(el => Number(el.id) === elementId)
        );
      } else if (document.title === 'Page Queue' && watched.length === 0) {
        document.querySelector('[data-watched]').disabled = true;
      }
      watched.pop(elementId);
      save(KEYWORD_SIBLING, watched);
    } else if (document.title === 'Page Queue' && queue.length === 1) {
      document.querySelector('[data-queue]').disabled = false;
    }
    return;
  }
}

function isRemoveBtnTxtData(value) {
  const valValue = value.toUpperCase();
  let text = 'remove from';
  text = text.toUpperCase();
  text = `${text} ${valValue}`;
  return text;
}

function noAddBtnTxtData(value) {
  const valValue = value.toUpperCase();
  let text = 'add to';
  text = text.toUpperCase();
  text = `${text} ${valValue}`;
  return text;
}
