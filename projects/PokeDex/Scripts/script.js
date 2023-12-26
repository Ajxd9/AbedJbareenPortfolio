function filterPokemons(searchTerm) {
  const pokemonCards = document.querySelectorAll(".pokemon-card");

  pokemonCards.forEach((card) => {
    const pokemonName = card
      .querySelector(".pokemon-name")
      .textContent.toLowerCase();
    const pokemonType = card
      .querySelector(".pokemon-type")
      .textContent.toLowerCase();

    if (pokemonName.includes(searchTerm) || pokemonType.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    filterPokemons(searchTerm);
  });
function openModal(pokemonData) {
  const modal = document.getElementById("pokemonModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  modalTitle.textContent = pokemonData.name;
  modalContent.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${
    pokemonData.name
  }">
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <p>Types: ${pokemonData.types
                  .map((type) => type.type.name)
                  .join(", ")}</p>
                <p>Abilities: ${pokemonData.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}</p>
            `;

  modal.style.display = "flex";

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}

function closeModal() {
  const modal = document.getElementById("pokemonModal");
  modal.style.display = "none";
}

document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchTerm = event.target.value.toLowerCase();
    filterPokemons(searchTerm);
  });

fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
  .then((response) => response.json())
  .then((data) => {
    const pokedexDiv = document.getElementById("pokedex");

    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          const pokemonDiv = document.createElement("div");
          pokemonDiv.classList.add("pokemon-card");
          pokemonDiv.addEventListener("click", () => openModal(pokemonData));
          pokemonDiv.innerHTML = `
                                <div class="pokemon-image">
                                    <img src="${
                                      pokemonData.sprites.front_default
                                    }" alt="${pokemon.name}">
                                </div>
                                <div class="pokemon-name">${pokemon.name}</div>
                                <div class="pokemon-type">${pokemonData.types
                                  .map((type) => type.type.name)
                                  .join(", ")}</div>
                            `;
          pokedexDiv.appendChild(pokemonDiv);
        })
        .catch((error) => console.error("Error fetching Pokemon data:", error));
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
