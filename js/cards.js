let cardTemplate = `
<div class="card">
	<div class="card-image-container">
		<div class="card-image"></div>
	</div>
	<div class="card-content">
		<p class="card-title text-medium">
			Name
		</p>
		<div class="card-info">
			<p class="text-medium">
				ig-description
			</p>
		</div>
	</div>
</div>
`;

async function loadCardsInternal(file){
	let cards = await fetch(`json/${file}.json`).then(res => res.json());
	let cardsHTML = '';

	document.querySelector('.item-type').innerHTML = cards['type'];

	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let cardHTML = cardTemplate;

		cardHTML = cardHTML.replace('class="card"', `class="card card-${i}"`);
		cardHTML = cardHTML.replace('Name', card['name']);
		cardHTML = cardHTML.replace('ig-description', card['ig-description'].split('<br>')[0]);
		cardHTML = cardHTML.replace('class="card-image"', `class="card-image card-image-${i}"`);
		cardsHTML += cardHTML;
	}
 
	document.querySelector('.cards').innerHTML = cardsHTML;

	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let cardImage = document.querySelector(`.card-image-${i}`);
		
		cardImage.style.backgroundImage = `url(${card['img']})`;
	}

	return;
}

async function changePage(){
	document.querySelector('.content').innerHTML = await fetch(`html/content.html`).then(res => res.text());
	return;
}

export async function loadCards(file){
	await loadCardsInternal(file);
	let cards = document.querySelectorAll('.card');
	let cardsJson = await fetch(`json/${file}.json`).then(res => res.json());
	
	for(let i=0; i<cards.length; i++){
		let card = cards[i];
		let jsonInfo = cardsJson['itens'][i];
		
		card.addEventListener('click', () => {
			changePage().then(() => {
				document.querySelector('.card-title').innerHTML = jsonInfo['name'];
				document.querySelector('.description').innerHTML = jsonInfo['description'];
				document.querySelector('.ig-description').innerHTML = jsonInfo['ig-description'];

				document.querySelector('.locations').innerHTML += "<ul>";
				for(let j=0; j<jsonInfo['locations'].length; j++){
					let location = jsonInfo['locations'][j];
					document.querySelector('.locations').innerHTML += `<li>${location}</li>`;
				}
				document.querySelector('.locations').innerHTML += "</ul>";
				
				document.querySelector('.references').innerHTML += "<ul>";
				if(jsonInfo['references'].length > 0){
					for(let j=0; j<jsonInfo['references'].length; j++){
						let reference = jsonInfo['references'][j];
						document.querySelector('.references').innerHTML += `<li>${reference}</li>`;
					}
				}
				else{
					document.querySelector('.references').innerHTML += '<li>Nenhum item referenciado.</li>';
				}
				document.querySelector('.references').innerHTML += "</ul>";
				document.querySelector('.card-image').style.backgroundImage = `url(${jsonInfo['img']})`;

				if(cardsJson['type'] == 'Consumíveis/Chaves:'){
					document.querySelector('.card-info').style.display = 'none';
					document.querySelector('.card-title').style.marginBottom = '0px';
				}
			});
		});
	}

	return;
}