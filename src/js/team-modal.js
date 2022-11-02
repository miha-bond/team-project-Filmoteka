import * as basicLightbox from 'basiclightbox'

import mihabondUrl from '../img/team.jpg/miha-bond.jpg';
import OlesiaTrUrl from '../img/team.jpg/Olesia.jpg';
import TarasKovalyshynUrl from '../img/team.jpg/TarasKovalyshyn.jpg';
import SerhiyDmUrl from '../img/team.jpg/SerhiyDm.jpg';
import MaryKotliarUrl from '../img/team.jpg/MaryKotliar.jpg';
import SergeyPochapskiyUrl from '../img/team.jpg/SergeyPochapskiy.jpg';
import DmutriyUrl from '../img/team.jpg/Dmutriy.jpg';
import Evgenija26Url from '../img/team.jpg/Evgenija26.jpg';
import ihorettiUrl from '../img/team.jpg/ihoretti.jpg';
import perehrestvalentinaUrl from '../img/team.jpg/perehrestvalentina.jpg';
import AlexandreElMaissUrl from '../img/team.jpg/AlexandreElMaiss.jpg';
import githubUrl from '../img/symbol-defs.svg'

const markup = `<div class="team-wrapper">
    
    <div class="team-card">
        <a href="https://github.com/miha-bond" target="_blank" class="team-link">
            <img src="${mihabondUrl}" loading="lazy" alt="Miha" class="team-image">
            <p class="team-name">Misha</p>
            <p class="team-role">Team Lead</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>            
    </div>
    <div class="team-card">
       <a href="https://github.com/OlesiaTr" target="_blank" class="team-link">
            <img src="${OlesiaTrUrl}" loading="lazy" alt="Olesia" class="team-image">
            <p class="team-name">Olesia</p>
            <p class="team-role">Scrum Master</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>
    </div> 
    
    <div class="team-card">
        <a href="https://github.com/TarasKovalyshyn" target="_blank" class="team-link">
            <img src="${TarasKovalyshynUrl}" loading="lazy" alt="Taras" class="team-image">
            <p class="team-name">Taras</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a> 
    </div>
    <div class="team-card">
       <a href="https://github.com/SerhiyDm" target="_blank" class="team-link">
            <img src="${SerhiyDmUrl}" loading="lazy" alt="Serhiy" class="team-image">
            <p class="team-name">SerhiyDm</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>     
    </div>
    <div class="team-card">
        <a href="https://github.com/MaryKotliar" target="_blank" class="team-link">
            <img src="${MaryKotliarUrl}" loading="lazy" alt="MaryKotliar" class="team-image">
            <p class="team-name">Mary</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>   
    </div>
    <div class="team-card">
        <a href="https://github.com/SergeyPochapskiy" target="_blank" class="team-link">
            <img src="${SergeyPochapskiyUrl}" loading="lazy" alt="SergeyPochapskiy" class="team-image">
            <p class="team-name">Sergey</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a> 
    </div>
    <div class="team-card">
        <a href="https://github.com/Dmutriy" target="_blank" class="team-link">
            <img src="${DmutriyUrl}" loading="lazy" alt="Dmutriy" class="team-image">
            <p class="team-name">Dmutriy</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>  
    </div>
    
    <div class="team-card">
        <a href="https://github.com/Evgenija26" target="_blank" class="team-link">
            <img src="${Evgenija26Url}" loading="lazy" alt="Evgenija26" class="team-image">
            <p class="team-name">Evgenija</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>   
    </div>
    
    <div class="team-card">
        <a href="https://github.com/ihoretti" target="_blank" class="team-link">
            <img src="${ihorettiUrl}" loading="lazy" alt="ihor" class="team-image">
            <p class="team-name">Ihor</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>      
    </div>

       <div class="team-card">
        <a href="https://github.com/perehrestvalentina" target="_blank" class="team-link">
            <img src="${perehrestvalentinaUrl}" loading="lazy" alt="valentina" class="team-image">
            <p class="team-name">Valentina</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>      
    </div>
    
    <div class="team-card">
        <a href="https://github.com/AlexandreElMaiss" target="_blank" class="team-link">
            <img src="${AlexandreElMaissUrl}" loading="lazy" alt="AlexandreElMaiss" class="team-image">
            <p class="team-name">Alexandre</p>
            <p class="team-role">Developer</p>
            <svg class="github__icon" width="30" height="30">
                    <use href="${githubUrl}#github-icon"></use>
            </svg>
        </a>        
    </div>`;

const container = document.querySelector('.js-team-modal');
//  console.log(document.querySelector('.js-team-modal'));
container.addEventListener('click', openModal);

const modal = basicLightbox.create(markup);

function openModal(e) {
  modal.show(modal);
  

  window.addEventListener('keydown', closeModalHandler);
   
  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
