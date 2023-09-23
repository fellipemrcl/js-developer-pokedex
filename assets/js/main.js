const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonDetails = document.getElementById("pokemonDetails");
const backToPokemonList = document.getElementById("backToPokemonList");
const pokemonDetailContent = document.getElementById("pokemonDetailContent");

const maxRecords = 151;
const limit = 10;
let offset = 0;

pokemonList.addEventListener("click", (event) => {
  const clickedPokemon = event.target.closest("li.pokemon");
  if (clickedPokemon) {
    const pokemonId = clickedPokemon
      .querySelector(".number")
      .textContent.slice(1);
    const selectedPokemon = pokemons.find(
      (pokemon) => pokemon.number === pokemonId
    );

    if (selectedPokemon) {
      pokemonDetailContent.innerHTML = `
                <p>Número: ${selectedPokemon.number}</p>
                <p>Nome: ${selectedPokemon.name}</p>
                <p>Tipo: ${selectedPokemon.types.join(", ")}</p>
                <img src="${selectedPokemon.photo}" alt="${
        selectedPokemon.name
      }">
            `;

      pokemonDetails.style.display = "block";
      pokemonList.style.display = "none";
    }
  }
});

backToPokemonList.addEventListener("click", () => {
  pokemonDetails.style.display = "none";
  pokemonList.style.display = "block";
});

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
