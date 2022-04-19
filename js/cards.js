export async function loadCards(file){
	let cards = await fetch(`./json/${file}.json`).then(res => res.json());
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

	let cardHTML = [];
	for (let category in cards['categories']){
		cardHTML[cards['categories'][category]] = `
		<div class="item-type">${cards['categories'][category]}:</div>
		<section class="cards">`;
	}


	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let htmlTemp = cardTemplate;

		htmlTemp = htmlTemp.replace('class="card"', `class="card card-${i}"`);
		htmlTemp = htmlTemp.replace('Name', card['name']);
		htmlTemp = htmlTemp.replace('ig-description', card['ig-description'].split('<br>')[0]);
		htmlTemp = htmlTemp.replace('class="card-image"', `class="card-image card-image-${i}"`);
	
		cardHTML[card['type']] += htmlTemp;
	}

	let content = document.querySelector('.content');
	for (let html in cardHTML){
		cardHTML[html] += '</section>';
		content.innerHTML += cardHTML[html];
	}

	for(let i=0; i<cards['itens'].length; i++){
		let card = cards['itens'][i];
		let cardImage = document.querySelector(`.card-image-${i}`);
		cardImage.style.backgroundImage = `url(./${card['img']})`;
	}

	return;
}