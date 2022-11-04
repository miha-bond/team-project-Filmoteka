import ThemoviedbAPI from './themoviedbAPI';
import { refs } from './refs';
import {
  renderPaginationOnSearch,
  renderPaginationOnPopular,
} from './paginationRequests';
import { onScrollUp } from './smoothScroll';

const API = new ThemoviedbAPI();

export function createPaginationLayout({ page, total_pages }, query) {
  const dataSet = createArr(page, total_pages);
  if (total_pages === 1 || total_pages < page) {
    return (refs.paginationList.innerHTML = '');
  }
  renderPagination(dataSet, page, total_pages, query);
}

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

function renderPagination(arr, currentPage, lastPage, query) {
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

  const nextPage = document.querySelector('button#nextBtn');
  const prevPage = document.querySelector('button#prevBtn');
  if (currentPage === 1) {
    prevPage.disabled = true;
  } else {
    prevPage.disabled = false;
  }
  if (currentPage + 1 > lastPage) {
    nextPage.disabled = true;
  } else {
    nextPage.disabled = false;
  }

  createPaginationBtn(currentPage, query);
}

function createPaginationBtn(page, query) {
  const paginationItem = document.querySelectorAll('.pagination__item button');

  paginationItem.forEach(item => {
    item.addEventListener(
      'click',
      e => {
        if (e.target.id === 'prevBtn') {
          API.page = Number(page);
          return prevPage(API.page, query);
        } else if (e.target.id === 'nextBtn') {
          API.page = Number(page);
          return nextPage(API.page, query);
        } else if (e.target.id === 'dots_next') {
          const numberApiPage = Number(page);
          API.page = numberApiPage + 3;
        } else if (e.target.id === 'dots_prev') {
          const numberApiPage = Number(page);
          API.page = numberApiPage - 3;
        } else {
          API.page = Number(e.target.id);
        }

        if (query === '' || query === undefined) {
          return renderPaginationOnPopular(API.page);
        } else {
          return renderPaginationOnSearch(API.page, query);
        }
      },
      onScrollUp()
    );
  });
}

function prevPage(page, query) {
  API.page = Number(page);
  API.decrementPage();
  if (query === '' || query === undefined)
    return renderPaginationOnPopular(API.page);
  renderPaginationOnSearch(API.page, query);
}
function nextPage(page, query) {
  API.page = Number(page);
  API.incrementPage();
  if (query === '' || query === undefined)
    return renderPaginationOnPopular(API.page);
  renderPaginationOnSearch(API.page, query);
}
