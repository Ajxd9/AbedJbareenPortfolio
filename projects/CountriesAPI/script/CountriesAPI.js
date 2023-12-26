function fetchCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((response) =>
    response.json()
  );
}

function displayCountries(countries) {
  const countriesContainer = document.getElementById("countriesContainer");
  countriesContainer.innerHTML = ""; // Clear previous content

  countries.forEach((country) => {
    const countryName = country.name.common;
    const countryFlagURL = country.flags.png;

    const countryCard = document.createElement("div");
    countryCard.className = "country-card";
    countryCard.innerHTML = `
        <img src="${countryFlagURL}" alt="${countryName} Flag" class="country-flag">
        <div class="overlay">${countryName}</div>
      `;
    countriesContainer.appendChild(countryCard);
  });

  // Add a single event listener to the parent container
  countriesContainer.addEventListener("click", (event) => {
    const countryCard = event.target.closest(".country-card");
    if (countryCard) {
      const countryIndex = Array.from(countriesContainer.children).indexOf(
        countryCard
      );
      openModal(countries[countryIndex]);
    }
  });
}

function openModal(country) {
  const modal = document.getElementById("modal");
  const modalCountryName = document.getElementById("modalCountryName");
  const modalCountryFlag = document.getElementById("modalCountryFlag");
  const modalCountryInfo = document.getElementById("modalCountryInfo");

  modalCountryName.textContent = country.name.common;
  modalCountryFlag.src = country.flags.png;
  modalCountryFlag.alt = `${country.name.common} Flag`;

  const languages = Array.isArray(country.languages)
    ? country.languages.join(", ")
    : typeof country.languages === "object"
    ? Object.values(country.languages).join(", ")
    : country.languages || "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((curr) => `${curr.name} (${curr.symbol})`)
        .join(", ")
    : "N/A";

  const info = `
    <p>Capital: ${country.capital || "N/A"}</p>
    <p>Population: ${country.population || "N/A"}</p>
    <p>Region: ${country.region || "N/A"}</p>
    <p>Area: ${country.area || "N/A"} square kilometers</p>
    <p>Languages: ${languages}</p>
    <p>Currencies: ${currencies}</p>
  `;

  modalCountryInfo.innerHTML = info;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function filterCountries() {
  const searchInput = document.getElementById("searchInput");
  const filter = searchInput.value.toUpperCase();
  const countriesContainer = document.getElementById("countriesContainer");
  const countryCards =
    countriesContainer.getElementsByClassName("country-card");

  for (let i = 0; i < countryCards.length; i++) {
    const countryName = countryCards[i].textContent.toUpperCase();
    if (countryName.indexOf(filter) > -1) {
      countryCards[i].style.display = "";
    } else {
      countryCards[i].style.display = "none";
    }
  }
}

// Initial fetch and display
fetchCountries()
  .then((countries) => displayCountries(countries))
  .catch((error) => console.error("Error fetching countries:", error));
