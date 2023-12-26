document.addEventListener("DOMContentLoaded", function () {
  const panel1 = document.getElementById("panel1");
  const panel2 = document.getElementById("panel2");

  const projects = [
    {
      projectName: "Weather Clothes",
      image: "WeatherClothes.jpg",
    },
    {
      projectName: "Countries",
      image: "countries.png",
    },
    {
      projectName: "Pokedex",
      image: "pokedex.png",
    },
    {
      projectName: "TicTacToe",
      image: "TicTacToe.png",
    },
    {
      projectName: "Connect4",
      image: "Connect4.png",
    },
    {
      projectName: "Memmory Game",
      image: "MemmoryGame.png",
    },
    {
      projectName: "landing Page 1",
      image: "landingPage1.jpg",
    },
    {
      projectName: "landing Page 2",
      image: "landingPage2.jpg",
    },
    {
      projectName: "landing Page 3",
      image: "landingPage3.jpg",
    },
    {
      projectName: "landing Page 4",
      image: "landingPage4.png",
    },
    {
      projectName: "landing Page 5",
      image: "landingPage5.png",
    },
    {
      projectName: "landing Page 6",
      image: "landingPage6.png",
    },
    // Add more projects as needed
  ];

  // Function to create a card element
  function createCard(project) {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = "images/projects/" + project.image;
    image.alt = project.projectName;

    const info = document.createElement("div");
    info.className = "card-content";
    const title = document.createElement("h2");
    title.textContent = project.projectName;
    const description = document.createElement("p");
    description.textContent = "Project description here.";

    info.appendChild(title);
    info.appendChild(description);

    card.appendChild(image);
    card.appendChild(info);

    card.addEventListener("click", () => {
      // Navigate to projectPage.html with card name as a parameter
      window.location.href = `./projectPage.html?projectName=${encodeURIComponent(
        project.projectName
      )}`;
    });

    return card;
  }

  // Function to add cards to a panel
  function addCards(panel, projects) {
    for (let i = 0; i < 6; i++) {
      const card = createCard(projects[i]);
      panel.appendChild(card);
    }
  }

  // Add cards to each panel
  addCards(panel1, projects.slice(0, 6));
  addCards(panel2, projects.slice(6, 12));

  // Function to hide all cards
  function hideAllCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => card.classList.remove("visible"));
  }

  // Function to toggle visibility of cards
  function toggleCards(panel) {
    hideAllCards();
    const cards = panel.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("visible");
    }
  }

  panel1.addEventListener("click", () => {
    panel1.classList.add("active");
    panel2.classList.remove("active");
    panel1.style.width = "90vw";
    panel2.style.width = "10vw";
    toggleCards(panel1);
  });

  panel2.addEventListener("click", () => {
    panel1.classList.remove("active");
    panel2.classList.add("active");
    panel1.style.width = "10vw";
    panel2.style.width = "90vw";
    toggleCards(panel2);
  });
});
