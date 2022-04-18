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

async function loadCardsInternal(cards){
	let cardsHTML = '';

	let item_type = document.querySelector('.item-type');
	item_type.innerHTML = cards['type'];

	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let cardHTML = cardTemplate;

		cardHTML = cardHTML.replace('class="card"', `class="card card-${i}"`);
		cardHTML = cardHTML.replace('Name', card['name']);
		cardHTML = cardHTML.replace('ig-description', card['ig-description'].split('<br>')[0]);
		cardHTML = cardHTML.replace('class="card-image"', `class="card-image card-image-${i}"`);
		cardsHTML += cardHTML;
	}

	let cardsContainer = document.querySelector('.cards');
	cardsContainer.innerHTML = cardsHTML;

	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let cardImage = document.querySelector(`.card-image-${i}`);
		cardImage.style.backgroundImage = `url(${card['img']})`;
	}

	return;
}

async function changePage(){
	let content = document.querySelector('.content');
	content.innerHTML = await fetch(`EldenWiki/html/content.html`).then(res => res.text());
	return;
}

export async function loadCards(file){
	let cardsJson = await fetch(`EldenWiki/json/${file}.json`).then(res => res.json());
	await loadCardsInternal(cardsJson);
	let cards = document.querySelectorAll('.card');
	
	for(let i=0; i<cards.length; i++){
		let card = cards[i];
		let jsonInfo = cardsJson['itens'][i];
		
		card.addEventListener('click', () => {
			changePage().then(() => {
				let card_title = document.querySelector('.card-title');
				let description = document.querySelector('.description');
				let ig_description = document.querySelector('.ig-description');
				let locations = document.querySelector('.locations');
				let references = document.querySelector('.references');
				let card_image = document.querySelector('.card-image');

				card_title.innerHTML = jsonInfo['name'];
				description.innerHTML = jsonInfo['description'];
				ig_description.innerHTML = jsonInfo['ig-description'];

				locations.innerHTML += "<ul>";
				for(let j=0; j<jsonInfo['locations'].length; j++){
					let location = jsonInfo['locations'][j];
					locations.innerHTML += `<li>${location}</li>`;
				}
				locations.innerHTML += "</ul>";
				
				references.innerHTML += "<ul>";
				if(jsonInfo['references'].length > 0){
					for(let j=0; j<jsonInfo['references'].length; j++){
						let reference = jsonInfo['references'][j];
						references.innerHTML += `<li>${reference}</li>`;
					}
				}
				else{
					references.innerHTML += '<li>Nenhum item referenciado.</li>';
				}
				references.innerHTML += "</ul>";
				card_image.style.backgroundImage = `url(${jsonInfo['img']})`;

				if(cardsJson['type'] == 'Consumíveis/Chaves:'){
					let card_title = document.querySelector('.card-title');
					card_title.style.marginBottom = '0px';
				}
				else if(cardsJson['type'] == 'Armaduras:'){
					let card_info = document.querySelector('.card-info');
					card_info = card_info.querySelector('.text-medium');
					
					let descriptionTemplate = `
					<span class="inner-title">Negação de Dano:</span><br><br>
					<ul>
						<li>Físico: ${jsonInfo['dmg-negation']['physical']}</li>
							<li>Concussão: ${jsonInfo['dmg-negation']['strike']}</li>
							<li>Corte: ${jsonInfo['dmg-negation']['slash']}</li>
							<li>Perfuração: ${jsonInfo['dmg-negation']['pierce']}</li>
						<li>Mágico: ${jsonInfo['dmg-negation']['magic']}</li>
						<li>Fogo: ${jsonInfo['dmg-negation']['fire']}</li>
						<li>Raio: ${jsonInfo['dmg-negation']['lightning']}</li>
						<li>Sagrados: ${jsonInfo['dmg-negation']['holy']}</li>
					</ul><br>
					<span class="inner-title">Resistências:</span><br><br>
					<ul>
						<li>Imunidade: ${jsonInfo['resistance']['immunity']}</li>
						<li>Robustês: ${jsonInfo['resistance']['robustness']}</li>
						<li>Foco: ${jsonInfo['resistance']['focus']}</li>
						<li>Vitalidade: ${jsonInfo['resistance']['vitality']}</li>
						<li>Estabilidade: ${jsonInfo['resistance']['poise']}</li>
					</ul><br>
					<span class="inner-title">Peso: ${jsonInfo['weight']}</span>
					`;

					card_info.innerHTML = descriptionTemplate;
				}
			});
		});
	}

	return;
}