import {navSetup} from './navbar.js';
import {loadContentGuide} from './content.js';
import {loadCardsItem, loadCardsCharacter, loadCardsEnemies} from './cards.js';

/*
Esse arquivo é o arquivo principal do projeto.
Ele contém funções para execução do menu e para mudança do conteúdo da página.
*/
let logo = document.querySelector('.logo');
let inicial = document.querySelector('.inicial');

let itens_consumiveis = document.querySelector('.itens-consumiveis');
let itens_armaduras = document.querySelector('.itens-armaduras');
let itens_armas = document.querySelector('.itens-armas');
let itens_magias = document.querySelector('.itens-magias');

let personagens = document.querySelector('.personagens');

let inimigos_normais = document.querySelector('.inimigos-normais');
let inimigos_chefes = document.querySelector('.inimigos-chefes');

let guia_gameplay = document.querySelector('.guia-gameplay');
let guia_finais = document.querySelector('.guia-finais');

async function changePage(page, pageContent){
	let content = document.querySelector('.content');
	content.innerHTML = await fetch(`./html/${page}.html`).then(res => res.text());

	if(page === 'cards'){
		if(pageContent.split('_')[0] === 'itens'){
			loadCardsItem(pageContent);
		}
		else if(pageContent === 'personagens'){
			loadCardsCharacter(pageContent);
		}
		else if(pageContent.split('_')[0] === 'inimigos'){
			loadCardsEnemies(pageContent.split('_')[0], pageContent.split('_')[1]);
		}
	}

	return;
}

addEventListener('load', ()=>{
	navSetup();
	changePage('home');
});
inicial.addEventListener('click', ()=>{
	changePage('home');
});
logo.addEventListener('click', ()=>{
	changePage('home');
});
itens_consumiveis.addEventListener('click', ()=>{
	changePage('cards', 'itens_consumiveis');
});
itens_armaduras.addEventListener('click', ()=>{
	changePage('cards', 'itens_armaduras');
});
itens_armas.addEventListener('click', ()=>{
	changePage('cards', 'itens_armas');
});
itens_magias.addEventListener('click', ()=>{
	changePage('cards', 'itens_magias');
});
personagens.addEventListener('click', ()=>{
	changePage('cards', 'personagens');
});
inimigos_normais.addEventListener('click', ()=>{
	changePage('cards', 'inimigos_Comuns');
});
inimigos_chefes.addEventListener('click', ()=>{
	changePage('cards', 'inimigos_Chefes');
});
guia_gameplay.addEventListener('click', ()=>{
	changePage('gameplay');
});
guia_finais.addEventListener('click', ()=>{
	changePage('finais');
});