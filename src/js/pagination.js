import ThemoviedbAPI from './themoviedbAPI';
import { refs } from './refs';
import createMarkup from './galleryMarkup';
const API = new ThemoviedbAPI();

  let currentPage = 1;
  let perPage;
 
 

 export function createPagination({total_pages}){
    for (let i = 0; i < 20; i+=1) {
        const liEl = createPaginationBtn(i + 1);
        refs.paginationList.appendChild(liEl)
      }
}
function createPaginationBtn(page) {
    
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination__item--active');

    liEl.addEventListener('click', () => {
      currentPage = page;
      perPage = 20;
      main();
      async function main() {
      const popularMovies = await API.getPopularMovies();
      console.log(popularMovies);
      // createMarkup(popularMovies);
      displayRandomPage(popularMovies, perPage, currentPage)
      console.log(popularMovies);
      }


      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');

      liEl.classList.add('pagination__item--active');
    })

    return liEl;
  }


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


function displayRandomPage(response, perPage, page) {
  console.log(response);
  refs.paginationList.innerHTML = "";
  page -= 1;

  const start = perPage * page;
  console.log(start);
  const end = start + perPage;
  console.log(end);
  const paginatedData = response.slice(start, end);
  console.log(paginatedData); // Почему массив пустой??
  createMarkup(paginatedData);
  
}