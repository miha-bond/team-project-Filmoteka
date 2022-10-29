import { save } from "./storage";


export const saveData = el => save('current response', JSON.stringify(el));
    