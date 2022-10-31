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
    refs.nextBtn.disabled = true;
  } else {
    refs.nextBtn.disabled = false;
  }
  if(total_pages === 1) {
    refs.prevBtn.style.visibility = "hidden";
    refs.nextBtn.style.visibility = "hidden";
  } else {
    refs.prevBtn.style.visibility = "visible";
    refs.nextBtn.style.visibility = "visible";
  }
}

function createArr(start, end) {
  const arr = [];

  for (let i = start - 2; i <= start + 2; i += 1) {
    if (i >= 1 && i <= end) {
      arr.push(i);
    }
  }

  if (arr[0] === 2) arr.unshift(1);
  if (arr[0] > 3) arr.unshift(1, 0);

  if (arr[arr.length - 1] < end) arr.push(0, end);
  if (arr[arr.length - 1] === end - 2) arr.push(end - 1);
  if (arr[arr.length - 1] === end - 3) arr.push(end - 2);

  return arr;
}

function renderPagination(arr, currentPage, lastPage) {
  const markup = arr.map(index => {
    if (index === 0)
      return `<li class="pagination__item">
            <div class="???">...</div>
          </li>`;
    if (index === 1)
      return `
        <li class = "pagination__item">
          <button class = "${
            index === currentPage ? 'pagination__item--active' : ''
          }" type = "button" id = '${index}'>1</button>
        </li>
      `;
    if (index === lastPage)
      return `
        <li class="pagination__item">
          <button class="${
            index === currentPage ? 'pagination__item--active' : ''
          }" type = "button" id = '${index}'>
            ${lastPage}
          </button>
        </li>
      `;

    return `
        <li class="pagination__item">
          <button class="${
            index === currentPage ? 'pagination__item--active' : ''
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
      API.page = e.target.id;
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
  API.incrementPage();
  main();
}

refs.prevBtn.addEventListener('click', prevPage);

refs.nextBtn.addEventListener('click', nextPage);

// let currentPage = API.page;
// let perPage;

// const LS_CURRENT_PAGE_KEY = currentPage;

// export function createPaginationLayout({ page, total_pages }) {
//   const dataSet = createArr(page, total_pages);
//   console.log(dataSet);
//   renderPagination(dataSet, page, total_pages);
// }
// function renderPagination(arr, currentPage, lastPage) {
//   const markup = arr
//     .map(index => {
//       console.log(index);
//       if (index === 0)
//         return `<li class = "pagination__item"><div class = "???">...</div></li>`;
//       if (index === 1)
//         return `
//         <li class = "pagination__item">
//           <button class = "${
//             index === currentPage ? 'pagination__item--active' : ''
//           }" type = "button">1</button>
//         </li>
//       `;
//       if (index === lastPage)
//         return `
//         <li class="pagination__item">
//           <button class="${
//             index === currentPage ? 'pagination__item--active' : ''
//           }" type = "button">
//             ${lastPage}
//           </button>
//         </li>
//       `;

//       return `
//         <li class="pagination__item">
//           <button class="${
//             index === currentPage ? 'pagination__item--active' : ''
//           }" type = "button">
//             ${index}
//           </button>
//         </li>
//       `;
//     })
//     .join(' ');
//     console.log(markup);
//   refs.paginationList.innerHTML = '';
//   refs.paginationList.insertAdjacentHTML('beforeend', markup);
//   console.log(markup);
//   createPaginationBtn(currentPage);
// }

// export function createPagination({ results }) {
//   //тут приходит массив фильмов, в зависимости от длины массива - рендарится кол-во кнопок
//   for (let i = 0; i < results.length; i += 1) {
//     const liEl = createPaginationBtn(i + 1);
//     refs.paginationList.appendChild(liEl);
//   }
// }

// function createPaginationBtn(page) {
//   const liEl = document.createElement('li');
//   liEl.classList.add('pagination__item');
//   liEl.textContent = page;

//   if (currentPage === page) liEl.classList.add('pagination__item--active');

//   liEl.addEventListener('click', () => {
//     API.page = page;
//     currentPage = API.page;
//     perPage = API.perPage;
//     main();

//     async function main() {
//       const popularMovies = await API.getPopularMovies();
//       refs.galleryItem.innerHTML = '';
//       createMarkup(popularMovies);
//     }

//     let currentItemLi = document.querySelector('li.pagination__item--active');
//     currentItemLi.classList.remove('pagination__item--active');

//     liEl.classList.add('pagination__item--active');
    
//   });

//   return liEl;
// }

// refs.prevBtn.addEventListener('click', prevPage);

// refs.nextBtn.addEventListener('click', nextPage);
// async function prevPage() {
//   refs.galleryItem.innerHTML ="";
  
//     API.decrementPage();
//     const data = await API.getPopularMovies();
//     createMarkup(data);
  
  
//   // if(currentPage === 1) {
//   //   refs.prevBtn.classList.add('is-hidden')
//   // }
// }
// async function nextPage() {
//   refs.galleryItem.innerHTML ="";
//   API.incrementPage();
//   const data = await API.getPopularMovies();
//   createMarkup(data);


  
  
  // function createArr(start, end) {
  //   const arr = [];
  
  //   for (let i = start - 2; i <= start + 2; i += 1) {
  //     if (i >= 1 && i <= end) {
  //       arr.push(i);
  //     }
  //   }
  
  //   if (arr[0] === 2) arr.unshift(1);
  //   if (arr[0] > 3) arr.unshift(1, 0);
  
  //   if (arr[arr.length - 1] < end) arr.push(0, end);
  //   if (arr[arr.length - 1] === end - 2) arr.push(end - 1);
  //   if (arr[arr.length - 1] === end - 3) arr.push(end - 2);
  
  //   return arr;
  // }







// function renderPagination(arr, currentPage, totalPages) {
//   const markup = arr.map(index => {
//     console.log(index);
//     if (index === 0) <li>...</li>;
//     if (index === 1) <li class= ${(1 === currentPage ? 'active' : '')} > 1</li >;
//     if (index === totalPages) <li class= ${(totalPages === currentPage ? 'active' : '')} > ${ totalPages }</li >;

//     return <li class= ${(${index} === currentPage ? 'active' : '')} > ${ index }</li >
//   });
// }
  
  // let currentItemLi = document.querySelector('li.pagination__item--active');
  //   currentItemLi.classList.remove('pagination__item--active');

  //   if (currentPage) liEl.classList.add('pagination__item--active');
  
  // if (!data.page < data.total_pages){
  //   console.log(data.page);
  //   console.log(data.total_pages);
  //   refs.nextBtn.classList.add('is-hidden')
  // }
// }

// export function createPagination({page, total_pages}) {
//     let liTag = '';
//     let active;
//     let beforePage = page - 1;
//     let afterPage = page + 1;

//     if(page > 1){ 
//         liTag += `<li class="btn prev"><span><svg width="16px" height ="16px"><use href="/src/img/symbol-defs.svg#icon-arrow-right2"></use></svg></span></li>`;
//       }
      
//       if(page > 2){ 
//         liTag += `<li class="first numb"><span>1</span></li>`;
//         if(page > 3){  
//           liTag += `<li class="dots"><span>...</span></li>`;
//         }
//       }

//       
//   if (page === total_pages) {
//     beforePage = beforePage - 2;
//   } else if (page === total_pages - 1) {
//     beforePage = beforePage - 1;
//   }
//   if (page === 1) {
//     afterPage = afterPage + 2;
//   } else if (page === 2) {
//     afterPage  = afterPage + 1;
//   }

//   for (let i = beforePage; i <= afterPage; i+=1) {
//     if (i > total_pages) { 
//       continue;
//     }
//     if (i === 0) { 
//       i = i + 1;
//     }
//     if(page === i){ 
//       active = "active";
//     }else{ 
//       active = "";
//     }
//     liTag += `<li class="numb ${active}"><span>${i}</span></li>`;
//   }
//   if(page < total_pages - 1){ 
//     if(page < total_pages - 2){  
//       liTag += `<li class="dots"><span>...</span></li>`;
//     }
//     liTag += `<li class="last numb"><span>${total_pages}</span></li>`;
//   }
//   if (page < total_pages) { 
//     liTag += `<li class="btn next"><span><svg width="16px" height ="16px"><use href="/src/img/symbol-defs.svg#icon-arrow-right2"></use></svg></span></li>`;
//   }
//   refs.paginationList.innerHTML = liTag; 
//   return liTag; //reurn the li tag
// }

// // export function displayPagination({page, total_pages}){
// //     refs.paginationList.innerHTML = createPagination(total_pages, page);
// // }
// function createPaginationBtn({page}) {
//     refs.paginationList.addEventListener('click', onClick);

//     function onClick(event) {
//         if (event.target.nodeName !== 'LI')  {
//             return;
//         }
//         createMarkup(data);

//     }
// }
// function createMarkupPerPage(page) {

// }


// let perPage = 20;
// let currentPage = 1;
  

// refs.prevBtn.addEventListener('click', prevPage);

// refs.nextBtn.addEventListener('click', nextPage);

// export function createPagination(data){
//     for (let i = 0; i < data.results.length; i += 1) {
//         const liEl = createPaginationBtn(i + 1);
//         refs.nextBtnItem.before(liEl)
//       }
// }
// function createPaginationBtn(page) {
    
//     const liEl = document.createElement("li");
//     liEl.classList.add('pagination__item')
//     liEl.innerText = page

//     if (API.page == page) liEl.classList.add('pagination__item--active');

//     liEl.addEventListener('click', () => {
//       currentPage = page;
//       // perPage = 20;
//       main();
//       async function main() {
//       const popularMovies = await API.getPopularMovies();
//       console.log(popularMovies);
//       // createMarkup(popularMovies);


//       displayRandomPage(popularMovies, perPage, currentPage)
//       console.log(popularMovies);
//       }


//       let currentItemLi = document.querySelector('li.pagination__item--active');
//       currentItemLi.classList.remove('pagination__item--active');

//       liEl.classList.add('pagination__item--active');
//     })

//     return liEl;
//   }




// function displayRandomPage(response, perPage, page) {
//   console.log(response);
//   refs.paginationList.innerHTML = "";
//   page -= 1;

//   const start = perPage * page;
//   console.log(start);
//   const end = start + perPage;
//   console.log(end);
//   console.log(response);
//   const paginatedData = response.slice(start, end);
//   console.log(paginatedData); // Почему массив пустой??
//   createMarkup(paginatedData);
  
// }

// function createPaginationLayout({ page, total_pages }) {
//   const dataSet = createArr(page, total_pages);
//   console.log(dataSet);
//   // renderPagination(dataSet, page, total_pages);
// }

// function createArr(start, end) {
//   const arr = [];

//   for (let i = start - 2; i <= start + 2; i += 1) {
//     if (i >= 1 && i <= end) {
//       arr.push(i);
//     }
//   }

//   if (arr[0] === 2) arr.unshift(1);
//   if (arr[0] > 3) arr.unshift(1, 0);

//   if (arr[arr.length - 1] < end) arr.push(0, end);
//   if (arr[arr.length - 1] === end - 2) arr.push(end - 1);
//   if (arr[arr.length - 1] === end - 3) arr.push(end - 2);

//   return arr;
// }