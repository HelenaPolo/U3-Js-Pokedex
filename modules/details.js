let params = new URLSearchParams(window.location.search);
const pokeId = params.get('pokeId')
let pokemonContainer = document.getElementById("pokemon-container");
let tipus = [];

//Costruim el pokemon a traves dela seva id a la API i el pintem a l'HTML
const getPokemon =(pokeId) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
    .then(response => response.json())
    .then((pokeCharacter)=> {
        const pokemon = {
            name: pokeCharacter.name,
            frontImg: pokeCharacter.sprites.front_default,
            backImg: pokeCharacter.sprites.back_default,
            atac: pokeCharacter.stats[1].base_stat,
            defensa: pokeCharacter.stats[2].base_stat,
            types: pokeCharacter.types.map((data)=>{
                tipus.push(" " + data.type.name);         
            }),
        }
    pokemonContainer.innerHTML = 
        `<div class="pokemons-card" id="pokemons-card"> 
            <h1 id="pokemon-name">${pokemon.name}</h1>
            <img src="${pokemon.frontImg}" alt="${pokemon.name}" width="100px">
            <img src="${pokemon.backImg}" alt="${pokemon.name}" width="100px">
            <div class="detalls"> 
                <ul>
                    <li>Atac: ${pokemon.atac}</li>
                    <li>Defensa: ${pokemon.defensa}</li>
                    <li>Tipus: ${tipus}</li>
                </ul>  
            </div>  
        </div>`   
    })
}
getPokemon(pokeId);
