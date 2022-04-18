export function navSetup(){
	let menuOpenBtn = document.querySelector('.navbar .bx-menu');
	let menuCloseBtn = document.querySelector('.nav-links .bx-x');
	
	let navLinks = document.querySelector('.nav-links');
	
	let itensArrow = document.querySelector('.itens-arrow');
	let inimigosArrow = document.querySelector('.inimigos-arrow');
	let guiaArrow = document.querySelector('.guia-arrow');
	
	menuOpenBtn.addEventListener('click', ()=>{
		navLinks.style.left = '0';
	});
	menuCloseBtn.addEventListener('click', ()=>{
		navLinks.style.left = '-100%';
	});
	
	itensArrow.addEventListener('click', ()=>{
		navLinks.classList.toggle('show1');
	});
	inimigosArrow.addEventListener('click', ()=>{
		navLinks.classList.toggle('show2');
	});
	guiaArrow.addEventListener('click', ()=>{
		navLinks.classList.toggle('show3');
	});

	return;
}