import { save, remove } from "./storage";

 export default function localStorageRecharge(arr) {
      const C_R = 'current response';
      if (localStorage.length !== 0) {
    remove(C_R);
     }
      
        save(C_R, JSON.stringify(arr));
    }
