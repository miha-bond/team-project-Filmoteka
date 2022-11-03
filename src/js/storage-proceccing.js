
import { save, load } from './storage';
import { buttonIsOnClassName } from './modalCard';

export function initStorage (key, id, el) {
  const stD = load(key);
  if (! stD) {
save(key, []);
  } else  if( isIn(stD, id)){
el.classList.add(buttonIsOnClassName);
el.textContent =  isRemoveBtnTxtData(key);
  }
}

export function toggleToWatched (e) {
  const elementId = e.target.parentNode.parentNode.parentNode.id;
  const KEYWORD = e.target.id;
  const KEYWORD_SIBLING = e.target.nextElementSibling.id;
  console.log(KEYWORD_SIBLING);
  console.log(KEYWORD);
  let watched = load(KEYWORD);
  let queue = load(KEYWORD_SIBLING);

if(! isIn(watched, elementId)) {
e.target.classList.add(buttonIsOnClassName);
e.target.textContent = isRemoveBtnTxtData(KEYWORD);
watched.push(elementId);
if(isIn(queue, elementId)) {
    e.target.nextElementSibling.classList.remove(buttonIsOnClassName);
    e.target.nextElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
    queue.pop(elementId)
    save(KEYWORD_SIBLING, queue);
  } 
  save(KEYWORD, watched);
return
} else {e.target.textContent = noAddBtnTxtData(KEYWORD);
     e.target.classList.remove(buttonIsOnClassName);
   watched.pop(elementId);
save (KEYWORD, watched);
}
}


export function toggleToQueue (e) {
 const elementId = e.target.parentNode.parentNode.parentNode.id;
 console.log(elementId);
 const KEYWORD_SIBLING = e.target.previousElementSibling.id;
 const  KEYWORD  = e.target.id;
 let watched = load(KEYWORD_SIBLING);
 let queue = load(KEYWORD);

 if(! isIn(queue, elementId)) {
 e.target.classList.add(buttonIsOnClassName);
 e.target.textContent = isRemoveBtnTxtData(KEYWORD);
 queue.push(elementId);
 if(isIn(watched, elementId)) {
   e.target.previousElementSibling.classList.remove(buttonIsOnClassName);
   e.target.previousElementSibling.textContent = noAddBtnTxtData(KEYWORD_SIBLING);
   watched.pop(elementId)
   save(KEYWORD_SIBLING, watched);
 } 
 save(KEYWORD, queue);
 return
 } else {e.target.textContent = noAddBtnTxtData(KEYWORD);
    e.target.classList.remove(buttonIsOnClassName);
  queue.pop(elementId);
 save (KEYWORD, queue);
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


function isIn (arr, el) {
return arr.includes(el);
}



