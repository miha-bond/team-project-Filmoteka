import ThemoviedbAPI from './themoviedbAPI';
import { refs } from './refs';
import createMarkup from './galleryMarkup';
const API = new ThemoviedbAPI();

export function createPaginationLayout({ page, total_pages }) {
  const dataSet = createArr(page, total_pages);
  renderPagination(dataSet, page, total_pages);
  
  if(page - 1 === 0) {
    refs.prevBtn.disabled = true;
    } else {
      refs.prevBtn.disabled = false;
    } 
  if(page + 1 > total_pages) {
    refs.nextBtn.disabled =true;
  } else {
    refs.nextBtn.disabled = false;
  }
  if(total_pages === 1)  {
    refs.prevBtn.style.visibility = "hidden";
    refs.nextBtn.style.visibility = "hidden";
  } else {
    refs.prevBtn.style.visibility = "visible";
    refs.nextBtn.style.visibility = "visible";
  }
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

function renderPagination(arr, currentPage, lastPage) {
  console.log(arr);
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

  // markup.unshift`(<li class="pagination__item">${refs.prevBtn.outerHTML}</li>)`;
  // markup.push`(<li class="pagination__item">${refs.nextBtn.outerHTML}</li>)`;

  refs.paginationList.innerHTML = '';
  refs.paginationList.insertAdjacentHTML('beforeend', markup.join(' '));

  createPaginationBtn();
}

function createPaginationBtn() {
  const paginationItem = document.querySelectorAll('.pagination__item button');
  paginationItem.forEach(item => {
    item.addEventListener('click', e => {
      if (e.currentTarget.id === 'prevBtn') return prevPage();
      if (e.currentTarget.id === 'nextBtn') return nextPage();
      if(e.target.id === 'dots_next') {
        const numberApiPage = Number(API.page);
        console.log(numberApiPage);
        API.page = numberApiPage + 3
        
        
        }
        else if (e.target.id === 'dots_prev') {
          const numberApiPage = Number(API.page);
          console.log(numberApiPage);
          API.page = numberApiPage - 3;
          
          } else {
          API.page = e.target.id;
        }
      
      main();
    });
  });
}

async function main() {
  const popularMovies = await API.getPopularMovies();
  refs.galleryItem.innerHTML = '';
  createMarkup(popularMovies);
  createPaginationLayout(popularMovies);
}

async function prevPage() {
  API.decrementPage();
  main();
}

async function nextPage() {
  API.page = Number(API.page);
  API.incrementPage();
  main();
}

refs.prevBtn.addEventListener('click', prevPage);

refs.nextBtn.addEventListener('click', nextPage);

// 