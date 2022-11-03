import ThemoviedbAPI from './themoviedbAPI';
import { refs } from './refs';
import {
  renderPaginationOnSearch,
  renderPaginationOnPopular,
} from './paginationRequests';
import { renderPaginationOngenreId } from './paginationRequests';
import { onScrollUp } from './smoothScroll';

const API = new ThemoviedbAPI();

export function createPaginationLayoutGenre({ page, total_pages }, genreId) {
  const dataSet = createArr(page, total_pages);
  if (total_pages === 1 || total_pages < page) {
    return (refs.paginationList.innerHTML = '');
  }
  renderPagination(dataSet, page, total_pages, genreId);
}

  // if (page === 1) {
  //   console.log(refs.prevBtn);
  //   refs.prevBtn.disabled = true;
  // } else {
  //   refs.prevBtn.disabled = false;
  // }
  // if (page + 1 > total_pages) {
  //   refs.nextBtn.disabled = true;
  // } else {
  //   refs.nextBtn.disabled = false;
  // }
  // if (total_pages === 1) {
  //   refs.prevBtn.style.visibility = 'hidden';
  //   refs.nextBtn.style.visibility = 'hidden';
  // } else {
  //   refs.prevBtn.style.visibility = 'visible';
  //   refs.nextBtn.style.visibility = 'visible';
  // }
  


function createArr(start, end) {
  const screenWidth = window.screen.width;

  const arr = [];
  if (screenWidth > 768) {
    for (let i = start - 2; i <= start + 2; i += 1) {
      if (i >= 1 && i <= end) {
        arr.push(i);
      }
    }
  } else {
    for (let i = start - 1; i <= start + 1; i += 1) {
      if (i >= 1 && i <= end) {
        arr.push(i);
      }
    }
  }

  if (arr[0] === 2) arr.unshift(1);
  if (arr[0] > 3) arr.unshift(1, -1);

  if (arr[arr.length - 1] < end) arr.push(0, end);
  if (arr[arr.length - 1] === end - 2) arr.push(end - 1);
  if (arr[arr.length - 1] === end - 3) arr.push(end - 2);

  return arr;
}

function renderPagination(arr, currentPage, lastPage, genreId) {
  const markup = arr.map(index => {
    if (index === -1)
      return `<li class="pagination__item">
    <button class="pagination__button dots" type = "button" id = "dots_prev">...</button>
  </li>`;
    if (index === 0)
      return `<li class="pagination__item">
            <button class="pagination__button dots" type = "button" id = "dots_next">...</button>
          </li>`;
    if (index === 1)
      return `
        <li class = "pagination__item">
          <button class = "pagination__button ${
            index === currentPage ? 'pagination__button--active' : ''
          }" type = "button" id = '${index}'>1</button>
        </li>
      `;
    if (index === lastPage)
      return `
        <li class="pagination__item">
          <button class="pagination__button ${
            index === currentPage ? 'pagination__button--active' : ''
          }" type = "button" id = '${index}'>
            ${lastPage}
          </button>
        </li>
      `;

    return `
        <li class="pagination__item">
          <button class="pagination__button ${
            index === currentPage ? 'pagination__button--active' : ''
          }" type = "button" id = '${index}'>
            ${index}
          </button>
        </li>
      `;

      
  });

  markup.unshift`<li class="pagination__item"><button class="pagination__button arrow" type = "button" id = "prevBtn"> < </button></li>`;
  markup.push`<li class="pagination__item"><button class="pagination__button arrow" type = "button" id = "nextBtn"> > </button></li>`;

  refs.paginationList.innerHTML = '';
  refs.paginationList.insertAdjacentHTML('beforeend', markup.join(' '));
  console.log(currentPage);
  let nextPage = document.querySelector('button#nextBtn');
  console.log(nextPage);
  let prevPage = document.querySelector('button#prevBtn');
  console.log(prevPage);
  console.log(currentPage);
  console.log(lastPage);
 
  if (currentPage === 1) {
    
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }
  if (currentPage === lastPage) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }
  createPaginationBtn(currentPage, genreId);
  
}

function createPaginationBtn(page, genreId) {
  
 
  const paginationItem = document.querySelectorAll('.pagination__item button');

  paginationItem.forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.id === 'prevBtn') {
        API.page = Number(page);
        return prevPage(API.page, genreId);
      } else if (e.target.id === 'nextBtn') {
        API.page = Number(page);
        return nextPage(API.page, genreId);
      } else if (e.target.id === 'dots_next') {
        const numberApiPage = Number(page);
        API.page = numberApiPage + 3;
      } else if (e.target.id === 'dots_prev') {
        const numberApiPage = Number(page);
        API.page = numberApiPage - 3;
      } else {
        API.page = Number(e.target.id);
      }
      if (genreId === '' ||  genreId === undefined) {
        return renderPaginationOnPopular(API.page);
      } else {
        return renderPaginationOngenreId(API.page, genreId);
      }
        
      
    }, onScrollUp(),);
  });
}

function prevPage(page, genreId) {
  API.page = Number(page);
  if (genreId === '' ||  genreId === undefined) {
    return renderPaginationOnPopular(API.page);
  } else {
    return renderPaginationOngenreId(API.page, genreId);
  }
}
function nextPage(page, genreId) {
  API.page = Number(page);
  API.incrementPage();
  if (genreId === '' ||  genreId === undefined) {
    return renderPaginationOnPopular(API.page);
  } else {
    return renderPaginationOngenreId(API.page, genreId);
  }
}
