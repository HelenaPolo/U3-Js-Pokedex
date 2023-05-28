window.addEventListener('DOMContentLoaded', async () => {  
    
    let pokemonContainer = document.getElementById("pokemons-container");
    let pokemonArray = [];

    //Agafem ids aleatòries (12 perquè per maquetar queden millor que 10 XD )
    const getRandomId = (min, max) =>{
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const RandomId = () => {
            let randomId = Array.from({length: 12},() => getRandomId(1, 248));
                randomId.forEach(id => {
                localStorage.setItem("pokemonId", JSON.stringify(randomId));
            getPokemon(id);
            });
    }

    //Costruim el pokemon a traves dela seva id a la API
    const getPokemon = (id) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then((data) => {
            let nom = data.name;
            let image = data.sprites.other['official-artwork'].front_default;
            if(nom && image && id){
                createPokemon(nom, image, id);
                pokemonArray.push(nom);
                searchFilter(pokemonArray);
            }
        });
    }
    
    //Creem el pokemon amb les dades del fetch i el pintem a l'HTML
    const createPokemon = (nom, image, id) => {
        let template = `<div class='pokemon-block card-container pokemon_card' id=${nom}>
                            <img src="${image}" alt='${nom}'>
                            <br>
                            <label for="name" class="name">
                                ${nom}
                            </label>
                            <br>
                            <button class="btn">
                                <a href="details.html?pokeId=${id}">
                                Detall
                                </a>
                            </button>
                        </div>`;
        pokemonContainer.innerHTML += template;
    }
    //Comprovem si ja hi ha llistat de ids
    const pokemon = JSON.parse(localStorage.getItem("pokemonId"));
    if (pokemon != null) {
    pokemon.forEach(id => {
        getPokemon(id);
    })   
    }
    else{
        RandomId();
    }

    //Botó per canviar les ids aleatòries
    document.getElementById("surprise").onclick = function() {Surprise()};
  
    const Surprise = () => {
        $(".pokemon-block").remove();
        RandomId();
    }

    //Filtre de búsqueda
    const searchFilter = (pokemonArray) => {
        const cards = document.querySelectorAll(".pokemon_card");
        document.getElementById("searchInput").addEventListener("keyup", (event) => {
            const val = event.target.value.toLowerCase();
            cards.forEach((card) =>{
                if (card.id.toLowerCase().includes(val)){
                    card.style.display = "block";
                }else{
                    card.style.display = "none";
                }
            })
        })
    }
})










