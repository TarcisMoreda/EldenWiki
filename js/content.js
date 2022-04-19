async function changePage(){
	let content = document.querySelector('.content');
	content.innerHTML = await fetch(`./html/content.html`).then(res => res.text());
	return;
}

export async function loadContent(file){
	let cardsJson = await fetch(`./json/${file}.json`).then(res => res.json());
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

				let tempHTML = '';
				tempHTML += "<ul>";
				for(let j=0; j<jsonInfo['locations'].length; j++){
					let location = jsonInfo['locations'][j];
					tempHTML += `<li>${location}</li>`;
				}
				tempHTML += "</ul>";
				locations.innerHTML = tempHTML;

				tempHTML = '';
				tempHTML += "<ul>";
				if(jsonInfo['references'].length > 0){
					for(let j=0; j<jsonInfo['references'].length; j++){
						let reference = jsonInfo['references'][j];
						tempHTML += `<li>${reference}</li>`;
					}
				}
				else{
					tempHTML += '<li>Nenhum item referenciado.</li>';
				}
				tempHTML += "</ul>";
				references.innerHTML = tempHTML;
				card_image.style.backgroundImage = `url(./${jsonInfo['img']})`;

				if(cardsJson['type'] == 'Itens:'){
					let card_title = document.querySelector('.card-title');
					card_title.style.margin = '0 0 0 0';
				}
				else if(cardsJson['type'] == 'Armaduras:'){
					let card_info = document.querySelector('.card-info');
					card_info = card_info.querySelector('.text-medium');
					

					let dmgNegation = `
						<div class="dmg-negation">
							<span class="inner-title">Negação de Dano:</span><br>
							<ul>
								<li>Físico: ${jsonInfo['dmg-negation']['physical']}</li>
									<li>Concussão: ${jsonInfo['dmg-negation']['strike']}</li>
									<li>Corte: ${jsonInfo['dmg-negation']['slash']}</li>
									<li>Perfuração: ${jsonInfo['dmg-negation']['pierce']}</li>
								<li>Mágico: ${jsonInfo['dmg-negation']['magic']}</li>
								<li>Fogo: ${jsonInfo['dmg-negation']['fire']}</li>
								<li>Raio: ${jsonInfo['dmg-negation']['lightning']}</li>
								<li>Sagrados: ${jsonInfo['dmg-negation']['holy']}</li>
							</ul>
						</div>
					`
					let resistances = `
						<div class="resistances">
							<span class="inner-title">Resistências:</span><br>
							<ul>
								<li>Imunidade: ${jsonInfo['resistance']['immunity']}</li>
								<li>Robustês: ${jsonInfo['resistance']['robustness']}</li>
								<li>Foco: ${jsonInfo['resistance']['focus']}</li>
								<li>Vitalidade: ${jsonInfo['resistance']['vitality']}</li>
								<li>Estabilidade: ${jsonInfo['resistance']['poise']}</li>
							</ul><br>
						</div>
					`;
					let peso = `
						<span class="inner-title">Peso:</span> ${jsonInfo['weight']}
					`;

					let finalDescription = `
						${dmgNegation}
						${resistances}
						${peso}
					`;
					card_info.innerHTML = finalDescription;
				}
				else if(cardsJson['type'] == 'Armas'){
					description.innerHTML += `<br><br>Material de upgrade: ${jsonInfo['upgrade']}`;

					let card_info = document.querySelector('.card-info');
					card_info = card_info.querySelector('.text-medium');

					let attack = `
						<div class="attack">
							<span class="inner-title">Dano:</span><br>
							<ul>
								<li>Físico: ${jsonInfo['attack']['physical']}</li>
								<li>Mágico: ${jsonInfo['attack']['magic']}</li>
								<li>Fogo: ${jsonInfo['attack']['fire']}</li>
								<li>Raio: ${jsonInfo['attack']['lightning']}</li>
								<li>Sagrado: ${jsonInfo['attack']['holy']}</li>
							</ul>
						</div>
					`;
					let spell = `
						<div class="spell">
							<span class="inner-title">Magia:</span><br>
							<ul>
								<li>Feitiço: ${jsonInfo['attack']['sorcery']}</li>
								<li>Encantamento: ${jsonInfo['attack']['incantation']}</li>
							</ul>
						</div>
					`;
					let passive = `
						<div class="passive">
							<span class="inner-title">Passiva:</span><br>
							<ul>
								<li>Sangramento: ${jsonInfo['passive']['bleed']}</li>
								<li>Veneno: ${jsonInfo['passive']['poison']}</li>
								<li>Gelo: ${jsonInfo['passive']['ice']}</li>
								<li>Loucura: ${jsonInfo['passive']['madness']}</li>
							</ul>
						</div>
					`;
					let guard = `
						<div class="guard">
							<span class="inner-title">Bloqueio:</span><br>
							<ul>
								<li>Físico: ${jsonInfo['guard']['physical']}</li>
								<li>Mágico: ${jsonInfo['guard']['magic']}</li>
								<li>Fogo: ${jsonInfo['guard']['fire']}</li>
								<li>Raio: ${jsonInfo['guard']['lightning']}</li>
								<li>Sagrado: ${jsonInfo['guard']['holy']}</li>
								<li>Bônus: ${jsonInfo['guard']['boost']}</li>
							</ul>
						</div>
					`;
					let scaling = `
						<div class="scaling">
							<span class="inner-title">Escala:</span><br>
							<ul>
								<li>Força: ${jsonInfo['scaling']['strength']}</li>
								<li>Destreza: ${jsonInfo['scaling']['dexterity']}</li>
								<li>Inteligência: ${jsonInfo['scaling']['intelligence']}</li>
								<li>Fé: ${jsonInfo['scaling']['faith']}</li>
								<li>Arcano: ${jsonInfo['scaling']['arcane']}</li>
							</ul>
						</div>
					`;
					let requirements = `
						<div class="requirements">
							<span class="inner-title">Requisitos:</span><br>
							<ul>
								<li>Força: ${jsonInfo['requirements']['strength']}</li>
								<li>Destreza: ${jsonInfo['requirements']['dexterity']}</li>
								<li>Inteligência: ${jsonInfo['requirements']['intelligence']}</li>
								<li>Fé: ${jsonInfo['requirements']['faith']}</li>
								<li>Arcano: ${jsonInfo['requirements']['arcane']}</li>
							</ul>
						</div>
					`;
					let dmgType = `
						<span class="inner-title">Tipo de dano:</span>${jsonInfo['dmg-type']}<br>
					`;
					let ash = `
						<span class="inner-title">Habilidade:</span>${jsonInfo['ash']}<br>
					`;
					let weight = `
						<span class="inner-title">Peso:</span>${jsonInfo['weight']}<br>
					`;

					let finalDescription = `
						${attack}
						${spell}
						${passive}
						${guard}
						${scaling}
						${requirements}
						${dmgType}
						${ash}
						${weight}
					`;
					card_info.innerHTML = finalDescription;
				}
				else if(cardsJson['type'] == 'Magias'){
					let card_info = document.querySelector('.card-info');
					card_info = card_info.querySelector('.text-medium');

					let effect = `
						<div class="effect">
							<span class="inner-title">Efeito:</span><br>
							${jsonInfo['effect']}
						</div>
					`;
					let costSlots = `
						<div class="cost-slots">
							<span class="inner-title">Custo:</span>${jsonInfo['cost']}<br>
							<span class="inner-title">Espaços nescessários:</span>${jsonInfo['slots']}<br>
						</div>
					`;
					let requirements = `
						<div class="requirements">
							<span class="inner-title">Requisitos:</span><br>
							<ul>
								<li>Inteligência: ${jsonInfo['requirements']['intelligence']}</li>
								<li>Fé: ${jsonInfo['requirements']['faith']}</li>
								<li>Arcano: ${jsonInfo['requirements']['arcane']}</li>
							</ul>
						</div>
					`;
					
					let finalDescription = `
						${requirements}
						${effect}
						${costSlots}
					`;
					card_info.innerHTML = finalDescription;
				}
			});
		});
	}

	return;
}