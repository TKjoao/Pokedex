const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPokemonId = 1;

async function searchPokemon() {
    const name = document.getElementById("pokemonName").value.toLowerCase();
    if (name) {
        fetchPokemon(apiUrl + name);
    } else {
        alert("Por favor, insira o nome de um Pokémon");
    }
}

async function getRandomPokemon() {
    currentPokemonId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(apiUrl + currentPokemonId);
}

async function fetchPokemon(url) {
    try {
        const response = await fetch(url);  
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");                   
        } 
        const pokemon = await response.json();
        currentPokemonId = pokemon.id; 
        displayPokemon(pokemon);
    } catch (error) {
        alert(error.message);
    }
}

function displayPokemon(pokemon) {
    const pokemonNameDisplay = document.getElementById("pokemonNameDisplay");
    const pokemonImage = document.getElementById("pokemonImage");
    const pokemonInfo = document.getElementById("pokemonInfo");

    pokemonNameDisplay.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonInfo.innerText = `ID: ${pokemon.id} | Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;
}

function previousPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(apiUrl + currentPokemonId);
    }
}

function nextPokemon() {
    if (currentPokemonId < 898) {
        currentPokemonId++;
        fetchPokemon(apiUrl + currentPokemonId);
    }
}
