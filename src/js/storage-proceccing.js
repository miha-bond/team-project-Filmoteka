import { save } from "./storage";


export const saveData = arr => arr.map(el => {
    save(el.title, JSON.stringify(el));
    
     }) ;