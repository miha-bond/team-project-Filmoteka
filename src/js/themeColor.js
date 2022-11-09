import { load, save } from './storage';

const themeParams = {
  key: 'theme',
    light: 'light-theme',
    dark: 'dark-theme',
  };
  
  const bodyRef = document.querySelector('body');
  const toggleRef = document.querySelector('#theme-switch-toggle');
  const footerDarktheme = document.querySelector('footer');
  initTheme(themeParams);

  function initTheme ({key, light, dark}){
 let dataTh = load(key);

 if(! dataTh){
  save(key, light);

 } 
if(dataTh === dark){
    toggleRef.setAttribute('checked', true);
bodyRef.classList.add(dark);
    footerDarktheme.classList.add(dark);
    save(key, dark);
  }
  toggleRef.addEventListener('change', toggleTheme);
}

function toggleTheme () {
    let key = 'theme';
    let light = 'light-theme';
    let dark = 'dark-theme';
    let value = load(key);
   if (value === dark ){
     save(key, light);
     bodyRef.classList.toggle(dark);
     footerDarktheme.classList.toggle(dark);
     return
    }
    save(key, dark);
    bodyRef.classList.toggle(dark);
    footerDarktheme.classList.toggle(dark);
    return
   }
export { bodyRef, toggleRef, footerDarktheme };