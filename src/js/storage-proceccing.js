import { save, remove } from './storage';

 export function localStorageInitPage(arr) {
      const C_R = 'current response';
      if (localStorage.length !== 0) {
    remove(C_R);
     }
      
        save(C_R, JSON.stringify(arr));
    }

    

   export function LocalStorageDataSave (arr, currentPage) {
      const currentKey = `${currentPage} response`;
    if (!load(currentKey)) {
save(currentKey, JSON.stringify(arr))
    } return
    }

    export function localStorageClear () {
    let keys = Object.keys(localStorage);
    for(let key of keys) {
      localStorage.remove(`${key}`);
    }
    }