const pokedex = document.getElementById('pokedex');

function fetchPokemon() {
    const promises = [];
    for (let i = 1; i <= 1024; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const promise = new Promise((resolve, reject) => {
            const miLlamada = new XMLHttpRequest();
            miLlamada.open('GET', url);
            miLlamada.onreadystatechange = function() {
                if (miLlamada.readyState === 4) {
                    if (miLlamada.status === 200) {
                        resolve(JSON.parse(miLlamada.responseText));
                    } else {
                        reject(miLlamada.statusText);
                    }
                }
            };
            miLlamada.send();
        });
        promises.push(promise);
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_shiny'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    }).catch(error => console.error('Error:', error));
}

function displayPokemon(pokemon) {
    const pokemonHTMLString = pokemon.map(
        (pokeman) => `
        <li class="card" style="padding: 2%;margin: 2%;list-style-type: none;">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title"> ${pokeman.name}</h2>
            <p class="card-subtitle">Tipo: ${pokeman.type}</p>
        </li>
    `
    ).join('');
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();
