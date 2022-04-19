import {navSetup} from './navbar.js';
import {loadCards} from './cards.js';
import {loadContent} from './content.js';

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
let guia_online = document.querySelector('.guia-online');
let guia_finais = document.querySelector('.guia-finais');
let guia_ngplus = document.querySelector('.guia-ngplus');

async function changePage(page){
	let content = document.querySelector('.content');
	content.innerHTML = await fetch(`./html/${page}.html`).then(res => res.text());
	return;
}
function changePageCard(content){
	changePage('cards').then(loadCards(content).then(loadContent(content)))
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
	changePageCard('itens_consumiveis');
});
itens_armaduras.addEventListener('click', ()=>{
	changePageCard('itens_armaduras');
});
itens_armas.addEventListener('click', ()=>{
	changePageCard('itens_armas');
});